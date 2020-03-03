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
    height: calc(100vh - 200px);
    font-size: 14px;
    margin-top: 8px;
    min-height: 300px;
  }

  td,
  th {
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
    z-index: 1;
  }

  .segment-number {
    color: rgba(0, 0, 0, 0.54);
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
    color: white;
    opacity: 0.9;
    font-size: 14px;
    padding: 4px 8px;
    position: absolute;
    z-index: 99;
    font-weight: bold;
  }
`;
