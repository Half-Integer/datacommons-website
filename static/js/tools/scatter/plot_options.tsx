/**
 * Copyright 2020 Google LLC
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
 * Plot options for log scale, per capita, swapping axes, and
 * lower and upper bounds for populations.
 */
/** @jsxImportSource @emotion/react */

import { css, useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import React, { useContext, useState } from "react";
import { Button } from "reactstrap";

import {
  GA_EVENT_TOOL_CHART_OPTION_CLICK,
  GA_PARAM_TOOL_CHART_OPTION,
  GA_VALUE_TOOL_CHART_OPTION_FILTER_BY_POPULATION,
  GA_VALUE_TOOL_CHART_OPTION_LOG_SCALE,
  GA_VALUE_TOOL_CHART_OPTION_PER_CAPITA,
  GA_VALUE_TOOL_CHART_OPTION_SHOW_DENSITY,
  GA_VALUE_TOOL_CHART_OPTION_SHOW_LABELS,
  GA_VALUE_TOOL_CHART_OPTION_SHOW_POPULATION_LINEAR,
  GA_VALUE_TOOL_CHART_OPTION_SHOW_POPULATION_LOG,
  GA_VALUE_TOOL_CHART_OPTION_SHOW_POPULATION_OFF,
  GA_VALUE_TOOL_CHART_OPTION_SHOW_QUADRANTS,
  GA_VALUE_TOOL_CHART_OPTION_SWAP,
  triggerGAEvent,
} from "../../shared/ga_events";
import {
  AxisWrapper,
  Context,
  DisplayOptionsWrapper,
  PlaceInfoWrapper,
  SHOW_POPULATION_LINEAR,
  SHOW_POPULATION_LOG,
  SHOW_POPULATION_OFF,
} from "./context";
import { ScatterChartType } from "./util";

const MIN_WIDTH_LABEL_LENGTH = 20;
const MAX_WIDTH_LABEL_LENGTH = 40;

/**
 * Swaps the axes.
 * @param x
 * @param y
 */
function swapAxes(x: AxisWrapper, y: AxisWrapper): void {
  const [xValue, yValue] = [x.value, y.value];
  x.set(yValue);
  y.set(xValue);
}

/**
 * Toggles whether to plot an axis on log scale.
 * @param axis
 * @param event
 */
function checkLog(
  axis: AxisWrapper,
  event: React.ChangeEvent<HTMLInputElement>
): void {
  axis.setLog(event.target.checked);
}

/**
 * Toggles whether to show quadrant lines.
 */
function checkQuadrants(
  display: DisplayOptionsWrapper,
  event: React.ChangeEvent<HTMLInputElement>
): void {
  display.setQuadrants(event.target.checked);
}

/**
 * Toggles whether to show text labels for every dot.
 */
function checkLabels(
  display: DisplayOptionsWrapper,
  event: React.ChangeEvent<HTMLInputElement>
): void {
  display.setLabels(event.target.checked);
}

/**
 * Toggles whether to color dots by density of dots in that area.
 */
function checkDensity(
  display: DisplayOptionsWrapper,
  event: React.ChangeEvent<HTMLInputElement>
): void {
  display.setDensity(event.target.checked);
}

/**
 * Selects whether to size dots by place population using a log or linear scale
 */
function selectShowPopulation(
  display: DisplayOptionsWrapper,
  event: React.ChangeEvent<HTMLInputElement>
): void {
  if (event.target.value === SHOW_POPULATION_LINEAR) {
    display.setPopulation(SHOW_POPULATION_LINEAR);
  } else if (event.target.value === SHOW_POPULATION_LOG) {
    display.setPopulation(SHOW_POPULATION_LOG);
  } else {
    display.setPopulation(SHOW_POPULATION_OFF);
  }
}

/**
 * Sets the lower bound for populations.
 * @param place
 * @param event
 */
function selectLowerBound(
  place: PlaceInfoWrapper,
  event: React.ChangeEvent<HTMLInputElement>,
  setLowerBound: (lowerBound: string) => void
): void {
  if (event.target.value) {
    place.setLowerBound(parseInt(event.target.value));
  }
  setLowerBound(event.target.value);
}

/**
 * Sets the upper bound for populations.
 * @param place
 * @param event
 */
function selectUpperBound(
  place: PlaceInfoWrapper,
  event: React.ChangeEvent<HTMLInputElement>,
  setUpperBound: (upperBound: string) => void
): void {
  if (event.target.value) {
    place.setUpperBound(parseInt(event.target.value));
  }
  setUpperBound(event.target.value);
}

// TODO: Add a new API that given a statvar, a parent place, and a child type,
// returns the available dates for the statvar. Then, fill the datapicker with
// the dates.
function PlotOptions(): JSX.Element {
  const theme = useTheme();

  const StyledLabel = styled.label`
    display: flex;
    align-items: center;
    gap: ${theme.spacing.xs}px;
    flex-shrink: 3;
    flex-wrap: wrap;
    margin: 0;
    padding: 0;
    && {
      input {
        position: inherit;
        margin: 0;
        padding: 0;
      }
  `;

  const StyledSection = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-shrink: 3;
    align-items: center;
    padding: ${theme.spacing.sm}px ${theme.spacing.md}px;
    gap: ${theme.spacing.sm}px;
    background: ${theme.colors.box.tooltip.pill};
    ${theme.typography.family.text}
    ${theme.typography.text.sm}
  `;

  const StyledSectionTitle = styled.p`
    margin: 0;
    font-weight: 900;
  `;

  const { place, x, y, display } = useContext(Context);
  const [lowerBound, setLowerBound] = useState(
    place.value.lowerBound.toString()
  );
  const [upperBound, setUpperBound] = useState(
    place.value.upperBound.toString()
  );
  const yAxisLabel =
    display.chartType === ScatterChartType.SCATTER
      ? "Y-axis"
      : y.value.statVarInfo.title || y.value.statVarDcid;
  const xAxisLabel =
    display.chartType === ScatterChartType.SCATTER
      ? "X-axis"
      : x.value.statVarInfo.title || x.value.statVarDcid;
  const axisLabelStyle = {};
  if (
    yAxisLabel.length > MIN_WIDTH_LABEL_LENGTH ||
    xAxisLabel.length > MIN_WIDTH_LABEL_LENGTH
  ) {
    axisLabelStyle["width"] =
      Math.min(
        MAX_WIDTH_LABEL_LENGTH,
        Math.max(xAxisLabel.length, yAxisLabel.length)
      ) /
        2 +
      "rem";
  }

  return (
    <div
      css={css`
        display: flex;
        flex-shrink: 3;
        flex-wrap: wrap;
        gap: ${theme.spacing.md}px;
        align-items: center;
      `}
    >
      <StyledSection>
        <StyledSectionTitle>{yAxisLabel}:</StyledSectionTitle>

        <StyledLabel>
          <input
            id="per-capita-y"
            type="checkbox"
            checked={y.value.perCapita}
            onChange={(e): void => {
              y.setPerCapita(e.target.checked);
              if (!y.value.perCapita) {
                triggerGAEvent(GA_EVENT_TOOL_CHART_OPTION_CLICK, {
                  [GA_PARAM_TOOL_CHART_OPTION]:
                    GA_VALUE_TOOL_CHART_OPTION_PER_CAPITA,
                });
              }
            }}
          />
          Per Capita
        </StyledLabel>

        <StyledLabel>
          <input
            id="log-y"
            type="checkbox"
            checked={y.value.log}
            onChange={(e): void => {
              checkLog(y, e);
              if (!y.value.log) {
                triggerGAEvent(GA_EVENT_TOOL_CHART_OPTION_CLICK, {
                  [GA_PARAM_TOOL_CHART_OPTION]:
                    GA_VALUE_TOOL_CHART_OPTION_LOG_SCALE,
                });
              }
            }}
          />
          Log scale
        </StyledLabel>
      </StyledSection>

      <StyledSection>
        <StyledSectionTitle>{xAxisLabel}:</StyledSectionTitle>

        <StyledLabel>
          <input
            id="per-capita-x"
            type="checkbox"
            checked={x.value.perCapita}
            onChange={(e): void => {
              x.setPerCapita(e.target.checked);
              if (!x.value.perCapita) {
                triggerGAEvent(GA_EVENT_TOOL_CHART_OPTION_CLICK, {
                  [GA_PARAM_TOOL_CHART_OPTION]:
                    GA_VALUE_TOOL_CHART_OPTION_PER_CAPITA,
                });
              }
            }}
          />
          Per Capita
        </StyledLabel>

        <StyledLabel>
          <input
            id="log-x"
            type="checkbox"
            checked={x.value.log}
            onChange={(e): void => {
              checkLog(x, e);
              if (!x.value.log) {
                triggerGAEvent(GA_EVENT_TOOL_CHART_OPTION_CLICK, {
                  [GA_PARAM_TOOL_CHART_OPTION]:
                    GA_VALUE_TOOL_CHART_OPTION_LOG_SCALE,
                });
              }
            }}
          />
          Log scale
        </StyledLabel>
      </StyledSection>

      {display.chartType === ScatterChartType.SCATTER && (
        <>
          <StyledSection>
            <StyledSectionTitle>Display:</StyledSectionTitle>

            <Button
              id="swap-axes"
              size="sm"
              color="light"
              onClick={(): void => {
                swapAxes(x, y);
                triggerGAEvent(GA_EVENT_TOOL_CHART_OPTION_CLICK, {
                  [GA_PARAM_TOOL_CHART_OPTION]: GA_VALUE_TOOL_CHART_OPTION_SWAP,
                });
              }}
            >
              Swap X and Y axes
            </Button>

            <StyledLabel>
              <input
                id="quadrants"
                type="checkbox"
                checked={display.showQuadrants}
                onChange={(e): void => {
                  checkQuadrants(display, e);
                  if (!display.showQuadrants) {
                    triggerGAEvent(GA_EVENT_TOOL_CHART_OPTION_CLICK, {
                      [GA_PARAM_TOOL_CHART_OPTION]:
                        GA_VALUE_TOOL_CHART_OPTION_SHOW_QUADRANTS,
                    });
                  }
                }}
              />
              Show quadrants
            </StyledLabel>

            <StyledLabel>
              <input
                id="quadrants"
                type="checkbox"
                checked={display.showLabels}
                onChange={(e): void => {
                  checkLabels(display, e);
                  if (!display.showLabels) {
                    triggerGAEvent(GA_EVENT_TOOL_CHART_OPTION_CLICK, {
                      [GA_PARAM_TOOL_CHART_OPTION]:
                        GA_VALUE_TOOL_CHART_OPTION_SHOW_LABELS,
                    });
                  }
                }}
              />
              Show labels
            </StyledLabel>

            <StyledLabel>
              <input
                id="density"
                type="checkbox"
                checked={display.showDensity}
                onChange={(e): void => {
                  checkDensity(display, e);
                  if (!display.showDensity) {
                    triggerGAEvent(GA_EVENT_TOOL_CHART_OPTION_CLICK, {
                      [GA_PARAM_TOOL_CHART_OPTION]:
                        GA_VALUE_TOOL_CHART_OPTION_SHOW_DENSITY,
                    });
                  }
                }}
              />
              Show density
            </StyledLabel>
          </StyledSection>

          <StyledSection>
            <StyledSectionTitle>Scale points by population:</StyledSectionTitle>

            <div>
              <StyledLabel>
                <input
                  checked={display.showPopulation === SHOW_POPULATION_OFF}
                  id="show-population-off"
                  onChange={(e): void => {
                    selectShowPopulation(display, e);
                    if (display.showPopulation !== SHOW_POPULATION_OFF) {
                      triggerGAEvent(GA_EVENT_TOOL_CHART_OPTION_CLICK, {
                        [GA_PARAM_TOOL_CHART_OPTION]:
                          GA_VALUE_TOOL_CHART_OPTION_SHOW_POPULATION_OFF,
                      });
                    }
                  }}
                  type="radio"
                  value={SHOW_POPULATION_OFF}
                />
                Off
              </StyledLabel>
              <StyledLabel>
                <input
                  checked={display.showPopulation === SHOW_POPULATION_LINEAR}
                  id="show-population-linear"
                  onChange={(e): void => {
                    selectShowPopulation(display, e);
                    if (display.showPopulation !== SHOW_POPULATION_LINEAR) {
                      triggerGAEvent(GA_EVENT_TOOL_CHART_OPTION_CLICK, {
                        [GA_PARAM_TOOL_CHART_OPTION]:
                          GA_VALUE_TOOL_CHART_OPTION_SHOW_POPULATION_LINEAR,
                      });
                    }
                  }}
                  type="radio"
                  value={SHOW_POPULATION_LINEAR}
                />
                Linear scale
              </StyledLabel>
              <StyledLabel>
                <input
                  checked={display.showPopulation === SHOW_POPULATION_LOG}
                  id="show-population-log"
                  onChange={(e): void => {
                    selectShowPopulation(display, e);
                    if (display.showPopulation !== SHOW_POPULATION_LOG) {
                      triggerGAEvent(GA_EVENT_TOOL_CHART_OPTION_CLICK, {
                        [GA_PARAM_TOOL_CHART_OPTION]:
                          GA_VALUE_TOOL_CHART_OPTION_SHOW_POPULATION_LOG,
                      });
                    }
                  }}
                  type="radio"
                  value={SHOW_POPULATION_LOG}
                />
                Log scale
              </StyledLabel>
            </div>
          </StyledSection>

          <StyledSection>
            <StyledSectionTitle>Filter by population:</StyledSectionTitle>

            <div>
              <input
                className="pop-filter-input"
                type="number"
                onChange={(e): void =>
                  selectLowerBound(place, e, setLowerBound)
                }
                value={lowerBound}
                onBlur={(): void => {
                  setLowerBound(place.value.lowerBound.toString());
                  triggerGAEvent(GA_EVENT_TOOL_CHART_OPTION_CLICK, {
                    [GA_PARAM_TOOL_CHART_OPTION]:
                      GA_VALUE_TOOL_CHART_OPTION_FILTER_BY_POPULATION,
                  });
                }}
              />
              <p>to</p>
              <input
                className="pop-filter-input"
                type="number"
                onChange={(e): void =>
                  selectUpperBound(place, e, setUpperBound)
                }
                value={upperBound}
                onBlur={(): void => {
                  setUpperBound(place.value.upperBound.toString());
                  triggerGAEvent(GA_EVENT_TOOL_CHART_OPTION_CLICK, {
                    [GA_PARAM_TOOL_CHART_OPTION]:
                      GA_VALUE_TOOL_CHART_OPTION_FILTER_BY_POPULATION,
                  });
                }}
              />
            </div>
          </StyledSection>
        </>
      )}
    </div>
  );
}

export { PlotOptions };
