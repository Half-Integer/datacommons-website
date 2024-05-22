# Copyright 2023 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#      http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
"""Common Utility functions for Embeddings."""

from dataclasses import dataclass
import itertools
import logging
from pathlib import Path
from typing import Dict, List, Tuple

from google.cloud import aiplatform
import pandas as pd
from sentence_transformers import SentenceTransformer
import yaml

from shared.lib import gcs
from tools.nl.embeddings.file_util import create_file_handler

# Col names in the input files/sheets.
DCID_COL = 'dcid'
NAME_COL = 'Name'
DESCRIPTION_COL = 'Description'
CURATED_ALTERNATIVES_COL = 'Curated_Alternatives'
OVERRIDE_COL = 'Override_Alternatives'
ALTERNATIVES_COL = 'Alternatives'

DEFAULT_MODELS_BUCKET = 'datcom-nl-models'

# Col names in the concatenated dataframe.
COL_ALTERNATIVES = 'sentence'

_EMBEDDINGS_YAML_PATH = (Path(__file__).parent /
                         "../../../deploy/nl/embeddings.yaml")
_DEFAULT_EMBEDDINGS_INDEX_TYPE = "medium_ft"

_CHUNK_SIZE = 100

_MODEL_ENDPOINT_RETRIES = 3


@dataclass
class ModelConfig:
  name: str
  # the model info as it would come from embeddings.yaml
  info: Dict[str, str]


@dataclass
# The info for a single embeddings index
class EmbeddingConfig:
  # the index info as it would come from embeddings.yaml
  index_config: Dict[str, str]
  model_config: ModelConfig


def chunk_list(data, chunk_size):
  it = iter(data)
  return iter(lambda: tuple(itertools.islice(it, chunk_size)), ())


def get_local_alternatives(local_filename: str,
                           local_col_names: List[str]) -> pd.DataFrame:
  df = pd.read_csv(local_filename).fillna("")
  df = df[local_col_names]
  return df


def merge_dataframes(df_1: pd.DataFrame, df_2: pd.DataFrame) -> pd.DataFrame:
  # In case there is a column (besides DCID_COL) which is common, the merged copy
  # will contain two columns (one with a postfix _x and one with a postfix _y.
  # Concatenate the two to produce a final version.
  df_1 = df_1.merge(df_2, how='left', on=DCID_COL,
                    suffixes=("_x", "_y")).fillna("")

  # Determine the columns which were common.
  common_cols = set()
  for col in df_1.columns:
    if col.endswith("_x") or col.endswith("_y"):
      common_cols.add(col.replace("_x", "").replace("_y", ""))

  # Replace the common columns with their concatenation.
  for col in common_cols:
    df_1[col] = df_1[f"{col}_x"].str.cat(df_1[f"{col}_y"], sep=";")
    df_1[col] = df_1[col].replace(to_replace="^;", value="", regex=True)
    df_1 = df_1.drop(columns=[f"{col}_x", f"{col}_y"])

  return df_1


def concat_alternatives(alternatives: List[str],
                        max_alternatives,
                        delimiter=";") -> str:
  alts = set(alternatives[0:max_alternatives])
  return f"{delimiter}".join(sorted(alts))


def split_alt_string(alt_string: str) -> List[str]:
  alts = []
  for alt in alt_string.split(";"):
    if alt:
      alts.append(alt.strip())
  return alts


def add_sv(name: str, sv: str, text2sv: Dict[str, str],
           dup_svs: List[List[str]]) -> None:
  osv = text2sv.get(name)
  if not osv or osv == sv:
    text2sv[name] = sv
    return

  # This is a case of duplicate SV.  Prefer the non sdg, human-curated, shorter SV.
  # Track it.
  pref, drop = sv, osv
  if sv.startswith('dc/topic/sdg'):
    # sv is an sdg topic. Prefer osv if osv is not an sdg topic. Otherwise, go
    # by dcid len.
    if not osv.startswith('dc/topic/sdg') or len(osv) <= len(sv):
      pref, drop = osv, sv
  elif ((osv.startswith('dc/') and sv.startswith('dc/')) or
        (not osv.startswith('dc/') and not sv.startswith('dc/'))):
    # Both SVs are autogen or both aren't. Go by dcid len.
    if len(osv) <= len(sv):
      pref, drop = osv, sv
  elif sv.startswith('dc/'):
    # sv is autogen, prefer osv.
    pref, drop = osv, sv

  text2sv[name] = pref
  dup_svs.append([pref, drop, name])


def dedup_texts(df: pd.DataFrame) -> Tuple[Dict[str, str], List[List[str]]]:
  """Dedup multiple texts mapped to the same DCID and return a list."""
  text2sv_dict = {}
  dup_sv_rows = [['PreferredSV', 'DroppedSV', 'DuplicateName']]
  for _, row in df.iterrows():
    sv = row[DCID_COL].strip()

    # All alternative sentences are retrieved from COL_ALTERNATIVES, which
    # are expected to be delimited by ";" (semi-colon).
    if COL_ALTERNATIVES in row:
      alternatives = row[COL_ALTERNATIVES].split(';')
      alternatives = [a.strip() for a in alternatives if a.strip()]
      for alt in alternatives:
        add_sv(alt, sv, text2sv_dict, dup_sv_rows)

  return (text2sv_dict, dup_sv_rows)


def build_embeddings(
    text2sv: Dict[str, str],
    model: SentenceTransformer = None,
    model_endpoint: aiplatform.Endpoint = None) -> pd.DataFrame:
  """Builds the embeddings dataframe.

  The output dataframe contains the embeddings columns (typically 384) + dcid + sentence.
  """
  texts = sorted(list(text2sv.keys()))

  if model:
    embeddings = model.encode(texts, show_progress_bar=True)
  else:
    embeddings = []
    for i, chuck in enumerate(chunk_list(texts, _CHUNK_SIZE)):
      logging.info('texts %d to %d', i * _CHUNK_SIZE, (i + 1) * _CHUNK_SIZE - 1)
      for i in range(_MODEL_ENDPOINT_RETRIES):
        try:
          resp = model_endpoint.predict(instances=chuck,
                                        timeout=600).predictions
          embeddings.extend(resp)
          break
        except Exception as e:
          logging.info('Exception %s', e)
  embeddings = pd.DataFrame(embeddings)
  embeddings[DCID_COL] = [text2sv[t] for t in texts]
  embeddings[COL_ALTERNATIVES] = texts
  return embeddings


def get_ft_model_from_gcs(model_version: str) -> SentenceTransformer:
  model_path = gcs.maybe_download(
      gcs.make_path(DEFAULT_MODELS_BUCKET, model_version))
  return SentenceTransformer(model_path)


def _get_default_ft_model(embeddings_yaml_file_path: str) -> ModelConfig:
  """Gets the default index's model version from embeddings.yaml.
  """
  return _get_default_ft_embeddings_info(embeddings_yaml_file_path).model_config


def get_default_ft_model() -> ModelConfig:
  """Gets the default index's model version from embeddings.yaml.
  """
  return _get_default_ft_model(_EMBEDDINGS_YAML_PATH)


def get_default_ft_embeddings_info() -> EmbeddingConfig:
  return _get_default_ft_embeddings_info(_EMBEDDINGS_YAML_PATH)


def _get_default_ft_embeddings_info(
    embeddings_yaml_file_path: str) -> EmbeddingConfig:
  with open(embeddings_yaml_file_path, "r") as f:
    data = yaml.full_load(f)
    if _DEFAULT_EMBEDDINGS_INDEX_TYPE not in data['indexes']:
      raise ValueError(f"{_DEFAULT_EMBEDDINGS_INDEX_TYPE} not found.")
    index_info = data['indexes'][_DEFAULT_EMBEDDINGS_INDEX_TYPE]
    model_name = index_info['model']
    model_info = ModelConfig(name=model_name, info=data['models'][model_name])
    return EmbeddingConfig(index_config=index_info, model_config=model_info)


def save_embeddings_yaml_with_only_default_ft_embeddings(
    embeddings_yaml_file_path: str,
    default_ft_embeddings_info: EmbeddingConfig):
  model_info = default_ft_embeddings_info.model_config
  data = {
      'version': 1,
      'indexes': {
          _DEFAULT_EMBEDDINGS_INDEX_TYPE:
              default_ft_embeddings_info.index_config
      },
      'models': {
          model_info.name: model_info.info
      }
  }
  with open(embeddings_yaml_file_path, "w") as f:
    yaml.dump(data, f)


def validate_embeddings(embeddings_df: pd.DataFrame,
                        output_dcid_sentences_filepath: str) -> None:
  # Verify that embeddings were created for all DCIDs and Sentences.
  dcid_sentence_df = pd.read_csv(
      create_file_handler(
          output_dcid_sentences_filepath).read_string_io()).fillna("")
  sentences = set()
  for alts in dcid_sentence_df["sentence"].values:
    for s in alts.split(";"):
      s = s.strip()
      if not s:
        continue
      sentences.add(s)

  # Verify that each of the texts in the embeddings_df is in the sentences set
  # and that all the sentences in the set are in the embeddings_df. Finally, also
  # verify that embeddings_df has no duplicate sentences.
  embeddings_sentences = embeddings_df['sentence'].values
  embeddings_sentences_unique = set()
  for s in embeddings_sentences:
    assert s in sentences, f"Embeddings sentence not found in processed output file. Sentence: {s}"
    assert s not in embeddings_sentences_unique, f"Found multiple instances of sentence in embeddings. Sentence: {s}."
    embeddings_sentences_unique.add(s)

  for s in sentences:
    assert s in embeddings_sentences_unique, f"Output File sentence not found in Embeddings. Sentence: {s}"

  # Verify that the number of columns = length of the embeddings vector + one each for the
  # dcid and sentence columns.
  assert len(embeddings_df.columns), 384 + 2
