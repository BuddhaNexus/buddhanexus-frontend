import { css } from 'lit-element';

export default css`
  vaadin-split-layout {
    --_material-split-layout-splitter-background-color: #6d5f47;
    height: calc(100vh - 410px);
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
    color: rgba(0, 0, 0, 0.54);
    font-size: 14px;
    white-space: nowrap;
    text-decoration: none;
  }

  .result-text {
    margin-bottom: 0;
  }

  .result-segment {
    background-color: rgb(244, 243, 242);
    margin-top: 0;
    margin-bottom: 8px;
    padding: 10px;
    border-radius: 10px;
    cursor: pointer;
  }

  .segment--highlighted {
    background-color: #d3d3d3;
  }

  .segment--selected {
    background-color: #d3d3d3;
  }

  .highlight-parallel {
    color: #0031ca;
    cursor: pointer;
  }

  .left-segment,
  .right-segment {
    display: inline;
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
  }

  .middle-text-column {
    padding: 0 12px;
  }

  .right-text-column {
    overflow-wrap: break-word;
    padding-left: 12px;
    width: 30%;
  }

  #text-view-right {
    display: block;
    position: relative;
    height: 100%;
    width: 100%;
  }
`;
