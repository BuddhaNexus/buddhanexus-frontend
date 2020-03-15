import { css } from 'lit-element';

export default css`
  :host {
    display: inline-flex;
    align-items: baseline;
    margin-top: 16px;
    flex-wrap: wrap;
    flex-direction: column;
  }

  vaadin-radio-button,
  vaadin-select,
  vaadin-combo-box,
  multiselect-combo-box,
  vaadin-text-field {
    --material-primary-color: var(--bn-dark-red);
    --material-primary-text-color: var(--bn-dark-red);
  }

  vaadin-select {
    width: 300px;
  }

  multiselect-combo-box,
  vaadin-combo-box {
    margin-top: 8px;
    margin-left: 12px;
    margin-right: 12px;
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

  #filter-collection,
  #exclude-collection {
    margin-top: -20px;
  }

  vaadin-radio-group {
    margin-left: 24px;
  }

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

  multiselect-combo-box[label],
  vaadin-combo-box[label] {
    font-size: 16px;
    --material-primary-color: var(--bn-dark-red);
    --material-primary-text-color: var(--bn-dark-red);
  }

  .filter-group {
    margin-top: 16px;
    margin-bottom: 16px;
  }
`;
