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

  .list-view-list__item {
    display: flex;
  }

  .list-view-list__item-content {
    padding: 12px;
    margin: 6px;
    background-color: var(--color-light-grey);
    overflow-wrap: break-word;
  }

  .list-view-list__item-content--segment {
    margin-left: 0;
    flex: 1;
  }

  .list-view-list__item-header {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    color: var(--color-text-secondary);
  }

  .list-view-list__segment-id {
    color: var(--color-text-secondary);
    font-size: 14px;
    margin-right: 16px;
  }

  .list-view-list__parallel-details {
    display: flex;
    font-size: 16px;
    flex-wrap: wrap;
  }

  .list-view-list__parallel-details .list-view-list__parallel-details-badge {
    margin-right: 16px;
  }

  .list-view-list__text {
    font-size: 18px;
    margin-top: 8px;
    margin-bottom: 8px;
    -ms-word-break: break-all;
    word-break: break-all;
    word-break: break-word;
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
