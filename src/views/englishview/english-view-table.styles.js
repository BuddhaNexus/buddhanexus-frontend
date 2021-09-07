import { css } from 'lit-element';

export default css`
  vaadin-split-layout {
    --_material-split-layout-splitter-background-color: var(--bn-dark-red);
    height: calc(100vh - 380px);
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

  .segment--highlighted {
    background-color: var(--color-background-light);
  }

  .segment {
    display: inline;
    cursor: pointer;
    font-size: 16px;
    line-height: 24px;
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

  #english-view-right {
    display: block;
    position: relative;
    height: 100%;
    width: 100%;
  }
`;
