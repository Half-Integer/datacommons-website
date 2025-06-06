/**
 * Copyright 2022 Google LLC
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
 * Footer for charts created by the different tools
 */

import React, { ReactElement } from "react";
import { FormGroup, Input, Label } from "reactstrap";

import {
  FacetSelector,
  FacetSelectorFacetInfo,
} from "../../../shared/facet_selector";
import {
  GA_EVENT_TOOL_CHART_OPTION_CLICK,
  GA_PARAM_TOOL_CHART_OPTION,
  GA_VALUE_TOOL_CHART_OPTION_EDIT_SOURCES,
  GA_VALUE_TOOL_CHART_OPTION_PER_CAPITA,
  triggerGAEvent,
} from "../../../shared/ga_events";

interface ToolChartHeaderProps {
  // Id of the chart this footer is being added to.
  chartId: string;
  // Map of stat var to facet id of the selected source for that variable.
  svFacetId: Record<string, string>;
  // Source selector information for a list of stat vars.
  facetList: FacetSelectorFacetInfo[];
  // callback when mapping of stat var dcid to facet id is updated.
  onSvFacetIdUpdated: (svFacetId: Record<string, string>) => void;
  // Whether to hide isRatio option.
  hideIsRatio: boolean;
  // Whether or not the chart is showing per capita calculation.
  isPerCapita?: boolean;
  // Callback when isRatio is updated. Used when hideIsRatio is false.
  onIsPerCapitaUpdated?: (isPerCapita: boolean) => void;
  // children components
  children?: React.ReactNode;
}

const SELECTOR_PREFIX = "chart-header";

export function ToolChartHeader(props: ToolChartHeaderProps): ReactElement {
  const ratioCheckboxId = props.chartId + "-ratio";

  return (
    <>
      <div className={`${SELECTOR_PREFIX}-options-section`}>
        {!props.hideIsRatio && (
          <span className="chart-option">
            <FormGroup check>
              <Label check>
                <Input
                  id={ratioCheckboxId}
                  type="checkbox"
                  checked={props.isPerCapita}
                  onChange={(): void => {
                    props.onIsPerCapitaUpdated(!props.isPerCapita);
                    if (!props.isPerCapita) {
                      triggerGAEvent(GA_EVENT_TOOL_CHART_OPTION_CLICK, {
                        [GA_PARAM_TOOL_CHART_OPTION]:
                          GA_VALUE_TOOL_CHART_OPTION_PER_CAPITA,
                      });
                    }
                  }}
                />
                Per Capita
              </Label>
            </FormGroup>
          </span>
        )}
        {props.children}
        <FacetSelector
          svFacetId={props.svFacetId}
          facetListPromise={Promise.resolve(props.facetList)}
          onSvFacetIdUpdated={(svFacetId): void => {
            props.onSvFacetIdUpdated(svFacetId);
            triggerGAEvent(GA_EVENT_TOOL_CHART_OPTION_CLICK, {
              [GA_PARAM_TOOL_CHART_OPTION]:
                GA_VALUE_TOOL_CHART_OPTION_EDIT_SOURCES,
            });
          }}
        />
      </div>
    </>
  );
}
