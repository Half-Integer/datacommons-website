/**
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * A container for blocks of all types.
 */

/** @jsxImportSource @emotion/react */

import { css, useTheme } from "@emotion/react";
import React, { ReactElement, useContext } from "react";
import ReactMarkdown from "react-markdown";

import { Item, ItemList } from "../../apps/explore/item_list";
import { ExploreContext } from "../../shared/context";
import { NamedTypedPlace, StatVarSpec } from "../../shared/types";
import { formatString, ReplacementStrings } from "../../utils/tile_utils";
import { getUpdatedHash } from "../../utils/url_utils";
import { MetadataSummary } from "./metadata_summary";

const DELIM = "___";

function camelCaseToWords(camelCaseString: string): string {
  const words = camelCaseString
    .replace(/([a-z])([A-Z])/g, "$1 $2") // Insert space before uppercase letters
    .split(/[\s_-]+/) // Split by spaces, underscores, and hyphens
    .filter((word) => word.length > 0) // Remove empty words
    .map((word) => word.toLowerCase()); // Convert to lowercase

  const capitalizedWords = words.map((word) => {
    const firstLetter = word.charAt(0).toUpperCase();
    const restOfWord = word.slice(1).toLowerCase();
    return firstLetter + restOfWord;
  });

  return capitalizedWords.join(" ");
}

export interface BlockContainerPropType {
  id: string;
  title?: string;
  description: string;
  children?: React.ReactNode;
  footnote?: string;
  place?: NamedTypedPlace;
  commonSVSpec?: StatVarSpec[];
  infoMessage?: string;
  disableExploreMore?: boolean;
  // Metadata loading state: true (loading), false (loaded), undefined (no metadata)
  metadataLoadingState?: boolean;
  // The metadata summary (based on the citation)
  metadataSummary?: string;
}

export function BlockContainer(props: BlockContainerPropType): ReactElement {
  const exploreData = useContext(ExploreContext);
  const theme = useTheme();

  let footnote: string;
  if (props.footnote) {
    footnote = props.footnote
      .split("\n\n")
      .map((f, i) => {
        f = f.trim();
        return f ? `${i + 1}. ${f}` : "";
      })
      .join("\n");
  }
  const rs: ReplacementStrings = {
    placeName: props.place ? props.place.name : "",
    placeDcid: props.place ? props.place.dcid : "",
  };
  const title = props.title ? formatString(props.title, rs) : "";
  const description = props.description
    ? formatString(props.description, rs)
    : "";

  const exploreSVSpec: StatVarSpec[] = [];
  if (exploreData.exploreMore && props.commonSVSpec) {
    for (const spec of props.commonSVSpec) {
      for (const sv in exploreData.exploreMore) {
        if (spec.statVar == sv) {
          exploreSVSpec.push(spec);
        }
      }
    }
    exploreSVSpec.sort((a, b) => {
      return (
        Object.keys(exploreData.exploreMore[b.statVar]).length -
        Object.keys(exploreData.exploreMore[a.statVar]).length
      );
    });
  }

  const buildExploreItems = (
    svExtendedMap: Record<string, string[]>
  ): Item[] => {
    const result: Item[] = [];
    for (const prop in svExtendedMap) {
      const urlSv = svExtendedMap[prop].join(DELIM);
      const url = `/explore/#${getUpdatedHash({
        t: urlSv,
        p: exploreData.place,
        q: "",
        em: "1",
      })}`;
      result.push({
        url,
        text: camelCaseToWords(prop),
      });
    }
    return result;
  };

  return (
    <section
      id={props.id}
      css={css`
        display: flex;
        flex-direction: column;
        gap: ${theme.spacing.md}px;
      `}
    >
      {props.infoMessage && (
        <div className="block-msg">
          <mark className="block-msg-txt">{props.infoMessage}</mark>
        </div>
      )}
      <header
        css={css`
          display: flex;
          flex-direction: column;
          gap: ${theme.spacing.xs}px;
        `}
      >
        {title && (
          <h3
            css={css`
              && {
                ${theme.typography.family.heading}
                ${theme.typography.heading.xs}
                margin: 0;
                padding: 0;
              }
            `}
          >
            {title}
          </h3>
        )}
        {description && (
          <p
            css={css`
              && {
                ${theme.typography.family.text}
                ${theme.typography.text.md}
                margin: 0;
                padding: 0;
              }
            `}
          >
            {description}
          </p>
        )}
        <MetadataSummary
          metadataSummary={props.metadataSummary}
          metadataLoadingState={props.metadataLoadingState}
        />
      </header>
      {props.children}
      {footnote && (
        <footer className="block-footer">
          <ReactMarkdown>{footnote}</ReactMarkdown>
        </footer>
      )}
      {!props.disableExploreMore && exploreSVSpec.length > 0 && (
        <div
          css={css`
            ${theme.typography.family.text}
            ${theme.typography.text.sm}
            ${theme.radius.quaternary}
            font-weight: 500;
            margin-top: ${theme.spacing.md}px;
            padding: ${theme.spacing.lg}px;
            border: 1px solid ${theme.colors.border.secondary.base};
            display: flex;
            gap: ${theme.spacing.sm}px;
            align-items: center;

            // Next part should be refactored inside the Itemlist component
            & > .item-list-container {
              & > .item-list-inner,
              & > .item-list-item {
                display: flex;
                gap: ${theme.spacing.xs}px;
                align-items: center;
              }
              & > .item-list-text {
                ${theme.typography.family.text}
                ${theme.typography.text.sm}
                font-weight: 500;
                margin: 0;
                padding: 0;
                text-indent: 0;
              }
            }
          `}
        >
          {exploreSVSpec.slice(0, 1).map((spec) => {
            // Only show 1 explore section now.
            return (
              <>
                <p
                  css={css`
                    && {
                      margin: 0;
                      padding: 0;
                    }
                  `}
                >
                  Explore {spec.name.toLowerCase()} by:
                </p>
                <ItemList
                  items={buildExploreItems(
                    exploreData.exploreMore[spec.statVar]
                  )}
                ></ItemList>
              </>
            );
          })}
        </div>
      )}
    </section>
  );
}
