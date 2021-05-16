import { css } from 'lit-element';

export default css`
  .numbers-view-table {
    width: 100%;
    height: 100%;
  }

  .table-wrapper {
    display: block;
    overflow: scroll;
    position: relative;
    height: calc(100vh - 260px);
    font-size: 14px;
    margin-top: 8px;
    min-height: 300px;
    font-family: var(--roboto-font-stack);
  }

  .table-wrapper.no-header {
    height: calc(100vh - 190px);
  }

  td,
  th {
    z-index: 1;
    vertical-align: top;
    padding: 10px;
    border: 3px solid white;
    border-radius: 4px;
    background-color: var(--color-light-grey);
  }

  thead th,
  thead td {
    position: -webkit-sticky; /* for Safari */
    position: sticky;
    top: 0;
  }

  th {
    position: -webkit-sticky; /* for Safari */
    position: sticky;
    left: 0;
  }

  thead th {
    z-index: 2;
  }

  .segment-number {
    color: var(--color-text-secondary);
    font-size: 14px;
    white-space: nowrap;
  }

  vaadin-item[name]:hover:after {
    left: 150px;
  }

  vaadin-item[name]:hover:after,
  .segment-header:hover:after {
    content: attr(name);
    background-color: var(--bn-dark-red);
    border-radius: 4px;
    box-shadow: 0 4px 8px #888888;
    color: var(--color-menu-items);
    opacity: 0.9;
    font-size: 14px;
    padding: 4px 8px;
    position: absolute;
    z-index: 99;
    font-weight: bold;
  }

  .open-link-icon {
    color: var(--color-text-secondary);
    width: 10px;
    cursor: pointer;
  }
`;
