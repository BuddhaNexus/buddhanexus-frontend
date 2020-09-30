import { css } from 'lit-element';

export default css`
  vaadin-split-layout {
    --_material-split-layout-splitter-background-color: var(--bn-dark-red);
    height: calc(100vh - 410px);
  }

  vaadin-split-layout.no-header {
    height: calc(100vh - 260px);
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

  .result-text {
    margin-bottom: 0;
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
    border-radius: 10px;
    cursor: pointer;
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
  .right-segment {
    display: inline;
  }

  .segment-number[show-number='false'] {
    display: none;
  }

  .segment-number {
    color: var(--color-text-secondary);
    font-size: 10px;
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
