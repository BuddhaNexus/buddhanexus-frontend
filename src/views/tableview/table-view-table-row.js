import { html } from 'lit-element';

export const TableViewTableRow = ({
  rootSegmentId,
  rootSegmentText,
  parallelSegmentText,
  parallelSegmentId,
  score,
  parLength,
  rootUrl,
  parUrl,
}) =>
  html`
    <div class="table-view-table__row">
      <div
        onclick="window.open('${rootUrl}','_blank');"
        class="table-view-table__cell table-view-table__cell-segment material-card"
      >
        <header class="table-view-table__segment-id">
          ${rootSegmentId}
        </header>
        <div class="horizontal-divider"></div>
        <div class="table-view-table__text">
          ${rootSegmentText}
        </div>
      </div>
      <div
        onclick="window.open('${parUrl}','_blank');"
        class="table-view-table__cell table-view-table__cell-parallel material-card"
      >
        <header class="table-view-table__cell-header">
          <span class="table-view-table__segment-id">
            ${parallelSegmentId}
          </span>
          <div class="table-view-table__parallel-details">
            <span class="table-view-table__parallel-details-badge"
              >Score: <b>${score}%</b></span
            >
            <span class="table-view-table__parallel-details-badge"
              >Length: <b>${parLength}</b></span
            >
          </div>
        </header>
        <div class="horizontal-divider"></div>
        <div class="table-view-table__text">
          ${parallelSegmentText}
        </div>
      </div>
    </div>
  `;
