import { css } from 'lit-element';

export default css`
  :host {
    display: inline-flex;
    align-items: baseline;
    margin-top: 16px;
    flex-wrap: wrap;
    flex-direction: column;
  }

  #filter-options-dropdown {
    background-color: white;
  }

  vaadin-radio-button,
  vaadin-select,
  vaadin-combo-box,
  multiselect-combo-box {
    --material-primary-color: var(--bn-dark-red);
    --material-primary-text-color: var(--bn-dark-red);
  }

  multiselect-combo-box {
    margin-top: 16px;
  }

  vaadin-select {
    width: 300px;
  }

  multiselect-combo-box,
  vaadin-combo-box {
    margin-left: 12px;
    margin-right: 12px;
  }

  #filter-parameters {
    display: flex;
    flex: 1;
    margin-right: 32px;
    margin-bottom: 32px;
  }

  #filter-filename,
  #exclude-filename {
    width: 210px;
  }

  #filter-collection,
  #exclude-collection,
  #filter-target-collection {
    width: 300px;
  }

  #filter-collection {
    margin-top: -20px;
  }

  vaadin-radio-group {
    margin-left: 24px;
  }

  .filter-group,
  .search-group {
    display: flex;
    flex-wrap: wrap;
    padding-top: 8px;
    align-items: baseline;
    margin-top: 12px;
  }

  .search-group {
    min-width: 400px;
    flex: 1;
  }

  .filter-group {
    display: flex;
  }

  #search-icon {
    margin-right: 24px;
  }

  #search-box {
    width: 100%;
  }

  .file-categories-filters {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    flex: 2;
    margin-right: 16px;
  }

  #filters-box {
    margin-top: 16px;
    display: flex;
    flex-wrap: wrap;
    width: 100%;
  }

  multiselect-combo-box[label],
  vaadin-combo-box[label] {
    font-size: 16px;
    --material-primary-color: var(--bn-dark-red);
    --material-primary-text-color: var(--bn-dark-red);
  }

  paper-slider {
    --paper-slider-height: 4px;
    --paper-slider-container-color: var(--bn-dark-red);
    --paper-slider-active-color: var(--bn-dark-red);
    --paper-slider-knob-color: var(--bn-dark-red);

    width: 100%;
    flex: 1;
  }

  #slider-label {
    color: rgb(115, 115, 115);
    font-size: 12px;
    padding-left: 18px;
  }

  #slider-container {
    flex-wrap: wrap;
    position: relative;
    min-width: 400px;
  }

  #slider-container[name]:hover:after,
  .segment-header:hover:after {
    content: attr(name);
    background-color: #002080;
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
