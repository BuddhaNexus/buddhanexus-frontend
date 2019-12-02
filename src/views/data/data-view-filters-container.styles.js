import { css } from 'lit-element';

export default css`
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

  multiselect-combo-box,
  vaadin-combo-box {
    margin-left: 12px;
    margin-right: 12px;
  }

  #filter-parameters {
    float: left;
    width: 30%;
  }

  #filter-filename {
    width: 210px;
  }

  #filter-collection,
  #filter-target-collection {
    width: 300px;
  }

  vaadin-radio-group {
    margin-left: 24px;
  }

  .filter-group,
  .search-group {
    display: flex;
    flex-wrap: wrap;
    flex: 1;
    padding-top: 8px;
    align-items: baseline;
  }

  .search-group {
    margin-top: 12px;
    margin-right: 12px;
  }

  .filter-group {
    display: inline-block;
  }

  #search-icon {
    margin-right: 24px;
  }

  #search-box {
    width: 100%;
  }

  .file-categories-filters {
    float: left;
    width: 70%;
  }

  #filters-box {
    width: 900px;
    height: 150px;
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
