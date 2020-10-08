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

import React from "react";
import { Ranking, RankInfo } from "./ranking_types";

interface RankingTablePropType {
  ranking: Ranking;
  id: string;
  placeType: string;
  sortAscending: boolean;
  scaling: number;
  unit: string;
  isPerCapita: boolean;
  statVar: string;
}

class RankingTable extends React.Component<RankingTablePropType> {
  info: RankInfo[];
  numFractionDigits: number;

  constructor(props: RankingTablePropType) {
    super(props);
    // Clone and sort the copy since there might be a different sort ordering elsewhere (e.g. histogram)
    this.info = [...this.props.ranking.info];
    this.info.sort((a, b) => {
      if (this.props.sortAscending) {
        return a.rank - b.rank;
      } else {
        return b.rank - a.rank;
      }
    });
    if (
      (this.props.statVar.startsWith("Count_") && !this.props.isPerCapita) ||
      this.props.statVar.startsWith("Median_Income")
    ) {
      this.numFractionDigits = 0;
    } else {
      this.numFractionDigits = 2;
    }
  }

  private renderRankInfo(rankInfo: RankInfo, scaling: number): JSX.Element {
    let value = rankInfo.value ? rankInfo.value : 0;
    value = value * scaling;
    return (
      <tr key={rankInfo.rank} data-dcid={rankInfo.placeDcid}>
        <td>{rankInfo.rank ? rankInfo.rank : 0}</td>
        <td>
          <a href={`/place/${rankInfo.placeDcid}`}>
            {rankInfo.placeName || rankInfo.placeDcid}
          </a>
        </td>
        <td className="text-center">
          <span className="num-value">
            {value.toLocaleString(undefined, {
              maximumFractionDigits: this.numFractionDigits,
              minimumFractionDigits: this.numFractionDigits,
            })}
          </span>
        </td>
      </tr>
    );
  }

  render(): JSX.Element {
    return (
      <table key={this.props.id} className="table mt-3">
        <thead>
          <tr>
            <th scope="col">Rank</th>
            <th scope="col">{this.props.placeType}</th>
            <th scope="col" className="text-center">
              {this.props.unit ? this.props.unit : "Value"}
            </th>
          </tr>
        </thead>
        <tbody>
          {this.info &&
            this.info.map((rankInfo) => {
              return this.renderRankInfo(rankInfo, this.props.scaling);
            })}
        </tbody>
      </table>
    );
  }
}

export { RankingTable };
