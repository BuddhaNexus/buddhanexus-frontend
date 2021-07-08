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
  externalLinkCode,
  transMethod,
}) =>
  //prettier-ignore
  html`
    <div class="table-view-table__row">
      <div class="table-view-table__cell table-view-table__cell-segment material-card">
        <header class="table-view-table__cell-header">
          <span class="table-view-table__segment-id">
            <formatted-segment
              .segmentnr="${rootSegmentId}"
              .lang="${getLanguageFromFilename(rootSegmentId[0])}"
              .rootUrl="${rootUrl}"
              .externalLinkCode="${externalLinkCode}">
            </formatted-segment>
          </span>
          <div class="table-view-table__parallel-details">
            <span class="table-view-table__parallel-details-badge ${parLength ? 'show-length' : 'no-show-length'}">Length: <b>${rootLength}</b></span>
          </div>
        </header>
        <div class="horizontal-divider"></div>
        <div class="table-view-table__text" lang="${getLanguageFromFilename(rootSegmentId[0])}"
          trans="${transMethod}">${rootSegmentText}</div>
      </div>
      <div class="table-view-table__cell table-view-table__cell-parallel material-card">
        <header class="table-view-table__cell-header">
          <span class="table-view-table__segment-id">
            <formatted-segment
              .segmentnr="${parallelSegmentId}"
              .lang="${getLanguageFromFilename(parallelSegmentId[0])}"
              .rootUrl="${parUrl}"
              .externalLinkCode="${externalLinkCode}">
            </formatted-segment>
          </span>
          <div class="table-view-table__parallel-details">
            <span class="table-view-table__parallel-details-badge">Score: <b>${score}%</b></span>
            <span class="table-view-table__parallel-details-badge ${parLength ? 'show-length' : 'no-show-length'}">Length: <b>${parLength}</b></span>
          </div>
        </header>
        <div class="horizontal-divider"></div>
        <div class="table-view-table__text" lang="${getLanguageFromFilename(parallelSegmentId[0])}"
          trans="${transMethod}">${parallelSegmentText}</div>
      </div>
    </div>
  `;
