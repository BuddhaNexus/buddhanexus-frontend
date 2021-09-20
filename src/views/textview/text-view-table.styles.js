import { css } from 'lit-element';

export default css`
  vaadin-split-layout {
    --_material-split-layout-splitter-background-color: var(--bn-dark-red);
    height: calc(100vh - 380px);
  }

  @media screen and (max-width: 1320px) {
    vaadin-split-layout[lang='tib'],
    vaadin-split-layout[lang='multi'] {
      height: calc(100vh - 440px);
    }
  }

  @media screen and (max-width: 1250px) {
    vaadin-split-layout[lang='chn'] {
      height: calc(100vh - 440px);
    }
  }

  @media screen and (max-width: 1140px) {
    vaadin-split-layout[lang='skt'] {
      height: calc(100vh - 440px);
    }
  }

  @media screen and (max-width: 1060px) {
    vaadin-split-layout[lang='tib'],
    vaadin-split-layout[lang='multi'] {
      height: calc(100vh - 400px);
    }
  }

  @media screen and (max-width: 1040px) {
    vaadin-split-layout[lang='tib'],
    vaadin-split-layout[lang='chn'],
    vaadin-split-layout[lang='pli'],
    vaadin-split-layout[lang='skt'],
    vaadin-split-layout[lang='multi'] {
      height: calc(100vh - 332px);
    }
  }

  vaadin-split-layout.no-header {
    height: calc(100vh - 130px);
  }

  vaadin-split-layout div {
    flex: 1;
  }

  vaadin-split-layout::part(handle) {
    width: 10px;
  }

  #text-view-search-header {
    padding-bottom: 16px;
    padding-top: 16px;
    font-weight: bold;
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    text-transform: none;
  }

  .result-segment-nr {
    color: var(--color-text-secondary);
    font-size: 14px;
    white-space: nowrap;
    text-decoration: none;
  }

  .result-segment-list__item-header {
    color: var(--color-text-secondary);
    font-size: 14px;
  }

  .result-text {
    margin-bottom: 0;
    cursor: pointer;
    margin-top: 8px;
  }

  #return-link {
    display: flex;
    cursor: pointer;
    color: var(--content-link-color);
  }

  #return-link:hover {
    color: var(--hover-link-color);
  }

  #return-link-arrow {
    width: 20px;
    padding-right: 8px;
  }

  .chinese-verse {
    text-align: right;
    max-width: 500px;
  }

  .result-segment {
    background-color: var(--color-light-grey);
    margin-top: 0;
    margin-bottom: 8px;
    padding: 10px;
  }

  .segment--highlighted,
  .segment--selected {
    background-color: var(--color-dark-grey);
  }

  .highlight-parallel {
    color: #0031ca;
    cursor: pointer;
  }

  .left-segment,
  .right-segment,
  .source-segment {
    display: inline;
  }

  .source-segment {
    font-weight: 800;
  }

  .segment-number[show-number='false'] {
    display: none;
  }

  .segment-number {
    color: var(--color-text-secondary);
    font-size: 10px;
    text-decoration: none;
  }

  .segment-number.left {
    float: left;
    padding-right: 12px;
  }

  .segment-number.right {
    float: right;
    padding-left: 12px;
  }

  vaadin-split-layout p {
    overflow-wrap: break-word;
  }

  .left-text-column {
    // TODO: uncomment if there's issues with scrolling
    // overscroll-behavior: none;
    overflow-wrap: break-word;
    font-size: 1.1em;
    line-height: 1.5em;
    padding-right: 12px;
  }

  .middle-text-column {
    padding: 0 12px;
  }

  .right-text-column {
    overflow-wrap: break-word;
    padding-left: 12px;
    padding-right: 12px;
    width: 30%;
  }

  #text-view-right {
    display: block;
    position: relative;
    height: 100%;
    width: 100%;
  }
`;
