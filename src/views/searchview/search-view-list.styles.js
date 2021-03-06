import { css } from 'lit-element';

export default css`
  .list-container {
    display: flex;
    flex-direction: column;
    flex: 1;
    // @todo: leave header in place when scrolling
    overflow: scroll;
    margin-bottom: 36px;
  }

  .search-view-list__item {
    display: flex;
  }

  .search-view-list__item-content {
    padding: 12px;
    margin: 6px;
    background-color: var(--color-light-grey);
    overflow-wrap: break-word;
  }

  .search-view-list__item-content--segment {
    margin-left: 0;
    flex: 1;
  }

  .search-view-list__item-header {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    color: var(--color-text-secondary);
    font-size: 14px;
  }

  .search-view-list__segment-id {
    margin-right: 16px;
  }

  .search-view-list__parallel-details {
    display: flex;
    font-size: 16px;
    flex-wrap: wrap;
  }

  .search-view-list__parallel-details
    .search-view-list__parallel-details-badge {
    margin-right: 16px;
  }

  .search-view-list__text {
    font-size: 18px;
    margin-top: 8px;
    -ms-word-break: break-all;
    word-break: break-all;
    word-break: break-word;
    cursor: pointer;
  }
`;
