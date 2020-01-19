import { css } from 'lit-element';

export default css`
  :host {
    display: inline-flex;
    align-items: baseline;
    margin-top: 16px;
    flex-wrap: wrap;
  }

  .visibility-filters {
    margin-left: 0;
  }

  .visibility-filters vaadin-radio-button {
    text-transform: capitalize;
  }

  #filter-options-dropdown {
    background-color: white;
  }

  vaadin-radio-button,
  vaadin-select,
  vaadin-combo-box,
  multiselect-combo-box {
    --material-primary-color: #0031ca;
    --material-primary-text-color: rgba(33, 33, 33);
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

  vaadin-radio-group {
    margin-left: 24px;
  }

  .filter-group {
    margin-left: 32px;
    margin-right: 32px;
  }

  .filter-group,
  .search-group {
    display: flex;
    flex-wrap: wrap;
    padding-top: 8px;
    align-items: baseline;
  }

  .search-group {
    margin-top: 12px;
    margin-right: 12px;
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
  }

  #filters-box {
    margin-top: 16px;
    display: flex;
    width: 100%;
  }

  multiselect-combo-box[label],
  vaadin-combo-box[label] {
    font-size: 16px;
  }

  paper-slider {
    --paper-slider-height: 4px;
    height: 26px;
    width: 250px;
  }

  #slider-label {
    color: rgb(115, 115, 115);
    font-size: 12px;
    padding-left: 18px;
  }

  #slider-container {
    flex-wrap: wrap;
    width: 250px;
    position: relative;
    bottom: 23px;
  }

  #slider-container[name]:hover:after {
    left: 0;
    top: -120%;
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
