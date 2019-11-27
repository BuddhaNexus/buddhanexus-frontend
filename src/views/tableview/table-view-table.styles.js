import { css } from 'lit-element';

export default css`
  .table-container {
    display: flex;
    flex-direction: column;
    flex: 1;
    // @todo: leave header in place when scrolling
    overflow: scroll;
    margin-bottom: 36px;
  }

  .table-view-table__row {
    display: flex;
  }

  .table-view-table__cell {
    cursor: pointer;
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
    font-size: 14px;
    margin-right: 16px;
  }

  .table-view-table__parallel-details {
    display: flex;
    font-size: 16px;
    flex-wrap: wrap;
  }

  .table-view-table__parallel-details
    .table-view-table__parallel-details-badge {
    margin-right: 16px;
  }

  .table-view-table__text {
    font-size: 18px;
    margin-top: 8px;
    margin-bottom: 8px;
  }

  .horizontal-divider {
    height: 1px;
    width: 100%;
    background-color: var(--color-divider);
    margin-top: 4px;
    margin-bottom: 4px;
  }

  .open-link-icon {
    float: right;
    width: 18px;
  }
`;
