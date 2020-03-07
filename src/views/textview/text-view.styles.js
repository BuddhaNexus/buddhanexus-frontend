import { css } from 'lit-element';

export default css`
  vaadin-split-layout {
    --_material-split-layout-splitter-background-color: #6d5f47;
  }

  .top-level-split {
    height: calc(100vh - 140px);
    margin-bottom: 24px;
  }

  .selected-segment {
    background-color: #d3d3d3;
  }

  #text-view-header, #text-view-search-header {
    padding-bottom: 16px;
    padding-top: 16px;
    font-weight: bold;
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    text-transform: none;
  }

  .total-numbers {
    background-color: #d3d3d3;
  }

  .result-segment-nr {
    color: rgba(0, 0, 0, 0.54);
    font-size: 14px;
    white-space: nowrap;
    text-decoration: none;
  }

  .result-text {
    margin-bottom: 0px;
  }

  .result-segment {
    background-color: rgb(244, 243, 242);
    margin-top: 0;
    margin-bottom: 8px;
    padding: 10px;
    border-radius: 10px;
    cursor: pointer;
  }

  .swap-button,
  .info-button {
    padding: 0;
    right: 16px;
    display: inline-flex;
    min-width: 24px;
    height: 24px;
    margin-left: 12px;
    background-color: transparent;
    cursor: pointer;
  }


  .up-button {
    padding: 0;
    left: 10px;
    display: inline-flex;
    min-width: 24px;
    height: 24px;
    margin-left: 12px;
    background-color: transparent;
    cursor: pointer;
  }


  .swap-icon {
    color: var(--bn-dark-red);
    margin: 0;
  }

  .swap-icon:hover {
    color: #0f0;
  }

  .info-icon {
    color: rgba(0, 0, 0, 0.54);
  }

  vaadin-button {
    background-color: transparent;
    color: var(--color-menu-items);
    font-weight: bold;
    height: 32px;
  }

  .highlighted-by-parallel {
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
    overscroll-behavior: none;
    overflow-wrap: break-word;
    width: 50%;
  }

  .middle-text-column {
    height: calc(100vh - 140px);
    padding: 0 12px;
    width: 30%;
  }

  .right-text-column {
    overflow-wrap: break-word;
    padding-left: 12px;
    width: 30%;
    height: calc(100vh - 140px);
`;
