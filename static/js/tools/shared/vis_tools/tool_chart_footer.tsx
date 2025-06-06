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

import _ from "lodash";
import React, { ReactElement } from "react";

import { intl } from "../../../i18n/i18n";
import { messages } from "../../../i18n/i18n_messages";
import { urlToDisplayText } from "../../../shared/util";

interface ToolChartFooterPropType {
  // Sources the chart got its data from.
  sources: Set<string>;
  // Measurement methods of the data of the chart.
  mMethods: Set<string>;
}

const SELECTOR_PREFIX = "chart-footer";
const FEEDBACK_LINK = "/feedback";

export function ToolChartFooter(props: ToolChartFooterPropType): ReactElement {
  const mMethods = !_.isEmpty(props.mMethods)
    ? Array.from(props.mMethods).join(", ")
    : "";

  return (
    <>
      <div className={`${SELECTOR_PREFIX}-container`}>
        <div className={`${SELECTOR_PREFIX}-metadata-section`}>
          {!_.isEmpty(props.sources) && (
            <div className={`${SELECTOR_PREFIX}-metadata`}>
              <span>Data from {getSourcesJsx(props.sources)}</span>
              {globalThis.viaGoogle
                ? " " + intl.formatMessage(messages.viaGoogle)
                : ""}
            </div>
          )}
          {!_.isEmpty(mMethods) && (
            <div className={`${SELECTOR_PREFIX}-metadata`}>
              <span>{`Measurement method${
                props.mMethods.size > 1 ? "s" : ""
              }: ${mMethods}`}</span>
            </div>
          )}
        </div>
      </div>
      <div className="feedback-link">
        <a href={FEEDBACK_LINK}>Feedback</a>
      </div>
    </>
  );
}

function getSourcesJsx(sources: Set<string>): ReactElement[] {
  const sourceList: string[] = Array.from(sources);
  const seenSourceText = new Set();
  return sourceList.map((source, index) => {
    const sourceText = urlToDisplayText(source);
    if (seenSourceText.has(sourceText)) {
      return null;
    }
    seenSourceText.add(sourceText);
    // handle relative url that doesn't contain https or http or www
    const processedUrl = sourceText === source ? "https://" + source : source;
    return (
      <span key={source}>
        {index > 0 ? ", " : ""}
        <a href={processedUrl}>{sourceText}</a>
      </span>
    );
  });
}
