import { css } from 'lit-element';

export default css`
  [lang='en'] {
    text-transform: none;
  }

  [lang='tib'] {
    text-transform: uppercase;
  }

  [lang='tib'],
  [lang='skt'],
  [lang='pli'],
  [lang='en'] {
    font-family: Roboto, sans-serif;
    line-height: 1.3;
  }

  [lang='chn'] {
    font-family: 'Noto Sans CJK TC', 'Noto Sans', sans-serif;
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
  #slider-container[name]:hover:after,
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
`;
