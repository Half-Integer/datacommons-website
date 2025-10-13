/**
 * Copyright 2023 Google LLC
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
 * Component for rendering a column in a disaster type block.
 */
/** @jsxImportSource @emotion/react */

import { css, useTheme } from "@emotion/react";
import React, { useRef } from "react";

import { NL_NUM_TILES_SHOWN } from "../../constants/app/explore_constants";
import {
  HIDE_COLUMN_CLASS,
  HIDE_TILE_CLASS,
} from "../../constants/subject_page_constants";
import { ColumnConfig } from "../../types/subject_page_proto_types";
import { isNlInterface } from "../../utils/explore_utils";
import { Button } from "../elements/button/button";
import { KeyboardArrowDown } from "../elements/icons/keyboard_arrow_down";

export interface ColumnPropType {
  // id for the column
  id: string;
  tilesCount: number;
  // config for the column
  config: ColumnConfig;
  // width of the column
  width: string;
  // tiles to render within the column
  tiles: JSX.Element;
  shouldHideColumn?: boolean;
}

export function Column(props: ColumnPropType): JSX.Element {
  const expandoRef = useRef(null);
  const tileSectionRef = useRef(null);
  const theme = useTheme();

  return (
    <div
      key={props.id}
      className={`${props.shouldHideColumn ? HIDE_COLUMN_CLASS : ""}`}
      ref={tileSectionRef}
      css={css`
        && {
          width: 100%;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          flex-wrap: wrap;
          gap: ${theme.spacing.md}px;
          align-items: flex-start;
        }
      `}
    >
      <div
        css={css`
          width: 100%;
          display: grid;
          grid-template-columns: repeat(${props.tilesCount}, 1fr);
          gap: ${theme.spacing.xl}px;
          & .chart-container {
            margin: 0;
          }
          & .svg-container > * div,
          & .svg-container > * svg {
            width: 100%;
          }
          @media (max-width: ${theme.breakpoints.md}px) {
            grid-template-columns: 1fr;
            gap: ${theme.spacing.md}px;
          }
        `}
      >
        {props.tiles}
      </div>

      {isNlInterface() && props.config.tiles.length > NL_NUM_TILES_SHOWN && (
        <Button
          ref={expandoRef}
          variant="naked"
          size="sm"
          endIcon={<KeyboardArrowDown />}
          onClick={(e: { preventDefault: () => void }): void => {
            onShowMore();
            e.preventDefault();
          }}
          css={css`
            && {
              ${theme.typography.family.text}
              ${theme.typography.text.sm}
              gap: ${theme.spacing.xs}px;
              & .button-end-icon > svg {
                width: ${theme.spacing.md}px;
                height: ${theme.spacing.md}px;
              }
            }
          `}
        >
          Show More
        </Button>
      )}
    </div>
  );

  // Removes HIDE_TILE_CLASS from all tiles in the column and hides the show
  // more button.
  function onShowMore(): void {
    const tiles = tileSectionRef.current.getElementsByClassName(
      HIDE_TILE_CLASS
    ) as HTMLCollectionOf<HTMLElement>;
    Array.from(tiles).forEach((tile) => {
      tile.classList.remove(HIDE_TILE_CLASS);
    });
    expandoRef.current.hidden = true;
  }
}
