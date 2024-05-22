# Copyright 2023 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the 'License');
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#      http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an 'AS IS' BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

import os
from pathlib import Path
import tempfile
import unittest

from sentence_transformers import SentenceTransformer

from tools.nl.embeddings import utils
from tools.nl.embeddings.build_custom_dc_embeddings import \
    EMBEDDINGS_CSV_FILENAME_PREFIX
from tools.nl.embeddings.build_custom_dc_embeddings import \
    EMBEDDINGS_YAML_FILE_NAME
import tools.nl.embeddings.build_custom_dc_embeddings as builder
from tools.nl.embeddings.file_util import create_file_handler

MODEL_NAME = "all-MiniLM-L6-v2"

INPUT_DIR = Path(__file__).parent / "testdata/custom_dc/input"
EXPECTED_DIR = Path(__file__).parent / "testdata/custom_dc/expected"


def _compare_files(test: unittest.TestCase, output_path, expected_path):
  with open(output_path) as gotf:
    got = gotf.read()
    with open(expected_path) as wantf:
      want = wantf.read()
      test.assertEqual(got, want)


class TestEndToEnd(unittest.TestCase):

  def test_build_embeddings_dataframe(self):
    self.maxDiff = None

    model = SentenceTransformer(MODEL_NAME)

    input_dcids_sentences_csv_path = os.path.join(INPUT_DIR,
                                                  "dcids_sentences.csv")
    expected_dcids_sentences_csv_path = os.path.join(
        EXPECTED_DIR, "final_dcids_sentences.csv")

    with tempfile.TemporaryDirectory() as temp_dir:
      actual_dcids_sentences_csv_path = os.path.join(
          temp_dir, "final_dcids_sentences.csv")

      embeddings_df = builder._build_embeddings_dataframe(
          model, create_file_handler(input_dcids_sentences_csv_path))

      embeddings_df[['dcid',
                     'sentence']].to_csv(actual_dcids_sentences_csv_path,
                                         index=False)

      _compare_files(self, actual_dcids_sentences_csv_path,
                     expected_dcids_sentences_csv_path)

  def test_build_embeddings_dataframe_and_validate(self):
    model = SentenceTransformer(MODEL_NAME)

    input_dcids_sentences_csv_path = os.path.join(INPUT_DIR,
                                                  "dcids_sentences.csv")

    embeddings_df = builder._build_embeddings_dataframe(
        model, create_file_handler(input_dcids_sentences_csv_path))

    # Test success == no failures during validation
    utils.validate_embeddings(embeddings_df, input_dcids_sentences_csv_path)

  def test_generate_yaml(self):
    expected_embeddings_yaml_path = os.path.join(EXPECTED_DIR,
                                                 EMBEDDINGS_YAML_FILE_NAME)
    fake_embeddings_csv_path = f"/fake/path/to/{EMBEDDINGS_CSV_FILENAME_PREFIX}.csv"

    with tempfile.TemporaryDirectory() as temp_dir:
      actual_embeddings_yaml_path = os.path.join(temp_dir,
                                                 EMBEDDINGS_YAML_FILE_NAME)

      model_info = utils.ModelConfig(name='FooModel',
                                     info={
                                         'type': 'LOCAL',
                                         'gcs_folder': 'fooModelFolder',
                                         'usage': 'EMBEDDINGS',
                                         'score_threshold': 0.5,
                                     })
      builder.generate_embeddings_yaml(
          model_info, create_file_handler(fake_embeddings_csv_path),
          create_file_handler(actual_embeddings_yaml_path))

      _compare_files(self, actual_embeddings_yaml_path,
                     expected_embeddings_yaml_path)
