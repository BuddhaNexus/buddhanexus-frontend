import { html } from 'lit-element';

import { getLanguageFromFilename } from '../utility/views-common';
import '../utility/formatted-segment';

export const TableViewTableRow = ({
  rootSegmentId,
  rootSegmentText,
  parallelSegmentText,
  parallelSegmentId,
  score,
  parLength,
  rootLength,
  rootUrl,
  parUrl,
}) =>
  //prettier-ignore
  html`
    <div class="table-view-table__row">
      <div class="table-view-table__cell table-view-table__cell-segment material-card">
        <header class="table-view-table__cell-header">
          <span class="table-view-table__segment-id">
            <formatted-segment
              .segmentnr="${rootSegmentId}"
              .lang="${getLanguageFromFilename(rootSegmentId[0])}">
            </formatted-segment>
          </span>
          <div class="table-view-table__parallel-details">
            <span class="table-view-table__parallel-details-badge ${parLength ? 'show-length' : 'no-show-length'}">Length: <b>${rootLength}</b></span>
          </div>
          <iron-icon
            class="open-link-icon"
            icon="vaadin:external-browser"
            title="Display this text in a new tab"
            onclick="window.open('${rootUrl}','_blank');">
          </iron-icon>
        </header>
        <div class="horizontal-divider"></div>
        <div class="table-view-table__text" lang="${getLanguageFromFilename(rootSegmentId[0])}">${rootSegmentText}</div>
      </div>
      <div class="table-view-table__cell table-view-table__cell-parallel material-card">
        <header class="table-view-table__cell-header">
          <span class="table-view-table__segment-id">
            <formatted-segment
              .segmentnr="${parallelSegmentId}"
              .lang="${getLanguageFromFilename(parallelSegmentId[0])}">
            </formatted-segment>
          </span>
          <div class="table-view-table__parallel-details">
            <span class="table-view-table__parallel-details-badge">Score: <b>${score}%</b></span>
            <span class="table-view-table__parallel-details-badge ${parLength ? 'show-length' : 'no-show-length'}">Length: <b>${parLength}</b></span>
          </div>
          <iron-icon
            class="open-link-icon"
            icon="vaadin:external-browser"
            title="Display this text in a new tab"
            onclick="window.open('${parUrl}','_blank');">
          </iron-icon>
        </header>
        <div class="horizontal-divider"></div>
        <div class="table-view-table__text" lang="${getLanguageFromFilename(parallelSegmentId[0])}">${parallelSegmentText}</div>
      </div>
    </div>
  `;
