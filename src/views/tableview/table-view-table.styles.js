import { css } from 'lit-element';

export default css`
  .table-container {
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow: scroll;
    margin-bottom: 2.25em;
  }

  .table-view-table__row {
    display: flex;
  }

  .table-view-table__cell {
    padding: 12px;
    margin: 6px;
    background-color: var(--color-light-grey);
    overflow-wrap: break-word;
  }

  .table-view-table__cell-segment {
    margin-left: 0;
    flex: 1;
  }

  .table-view-table__cell-parallel {
    margin-right: 0;
    flex: 2;
  }

  .table-view-table__cell-header {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    color: var(--color-text-secondary);
  }

  .table-view-table__segment-id {
    color: var(--color-text-secondary);
    font-size: 0.875em;
    margin-right: 1em;
  }

  .table-view-table__parallel-details {
    display: flex;
    font-size: 1em;
    flex-wrap: wrap;
  }

  .table-view-table__parallel-details
    .table-view-table__parallel-details-badge {
    margin-right: 1em;
  }

  .table-view-table__text {
    font-size: 1em;
    line-height: 1.4em;
    margin-top: 0.5em;
    margin-bottom: 0.5em;
    word-break: break-word;
  }

  .open-link-icon {
    float: right;
    width: 18px;
  }
`;
