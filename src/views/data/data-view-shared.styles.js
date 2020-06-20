import { css } from 'lit-element';

export default css`
  [lang='en'] {
    text-transform: none;
    font-family: var(--system-font-stack);
  }

  [lang='tib'] {
    text-transform: uppercase;
    font-family: var(--system-font-stack);
  }

  [lang='tib'],
  [lang='skt'],
  [lang='pli'],
  [lang='en'] {
    font-family: var(--system-font-stack);
    line-height: 1.4em;
    font-size: 1em;
  }

  [lang='chn'] {
    font-family: var(--alt-font-stack);
    -webkit-font-smoothing: antialiased;
  }

  .segment-link {
    text-decoration: none;
    color: rgba(0, 0, 0, 0.54);
  }

  .segment-header {
    font-weight: bold;
  }

  .segment-header:hover:after {
    left: 0;
    top: 100%;
  }

  .chn-gatha {
    margin: 0;
    text-align: end;
  }

  .score,
  .segment-length,
  .co-occurance {
    font-size: 14px;
    padding-right: 12px;
    color: #404040;
    text-transform: none;
  }

  .selected-parallel {
    background-color: rgb(244, 243, 242);
    margin-top: 0;
    z-index: 5;
    font-size: 1em;
    line-height: 1.4em;
    margin-bottom: 8px;
    padding: 10px;
    border-radius: 10px;
    cursor: pointer;
  }

  .selected-parallel-nr {
    color: rgba(0, 0, 0, 0.54);
    font-size: 14px;
    white-space: nowrap;
    text-decoration: none;
  }

  .parallels-text {
    margin: 0;
  }

  vaadin-item[name]:hover:after,
  .segment-header:hover:after {
    content: attr(name);
    background-color: #002080;
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

  .material-card {
    box-shadow: var(--material-card-shadow-inset);
    border: 1px solid #e0e0e0;
    border-radius: 4px;
  }

  .horizontal-divider {
    height: 1px;
    width: 100%;
    background-color: var(--color-divider);
    margin-top: 4px;
    margin-bottom: 4px;
  }
`;
