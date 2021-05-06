import { css } from 'lit-element';

export default css`
  [lang='en'] {
    text-transform: none;
    font-family: var(--system-font-stack);
  }

  [lang='tib'] {
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

  [lang='tib'][trans='uni'] {
    font-family: var(--tibetan-font-stack);
    -webkit-font-smoothing: antialiased;
  }

  .segment-link {
    text-decoration: none;
    color: var(--color-text-secondary);
  }

  .segment-header {
    font-weight: bold;
  }

  .segment-header:hover:after {
    left: 0;
    top: 100%;
  }

  .score,
  .segment-length,
  .co-occurance {
    font-size: 14px;
    padding-right: 12px;
    color: var(--color-text-secondary);
    text-transform: none;
  }

  .trans-message {
    font-size: 14px;
    padding-left: 12px;
    color: var(--bn-dark-red);
    text-transform: uppercase;
  }

  .selected-parallel {
    background-color: var(--color-light-grey);
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
    color: var(--color-text-secondary);
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

  .material-card {
    box-shadow: var(--material-card-shadow-inset);
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    overflow-wrap: break-word;
  }

  .horizontal-divider {
    height: 1px;
    width: 100%;
    background-color: var(--color-divider);
    margin-top: 4px;
    margin-bottom: 4px;
  }

  .info-button {
    padding: 24px;
    cursor: help;
  }

  .no-show-length {
    display: none;
  }
`;
