import { css } from 'lit-element';

export default css`
  :host {
    display: inline-flex;
    align-items: baseline;
    margin-top: 16px;
    flex-wrap: wrap;
    flex-direction: column;
    padding-bottom: 48px;
  }

  vaadin-radio-button,
  vaadin-select,
  vaadin-combo-box,
  multiselect-combo-box,
  vaadin-text-field {
    --material-primary-color: var(--bn-dark-red);
    --material-primary-text-color: var(--bn-dark-red);
  }

  .input-field {
    padding-left: 16px;
    padding-right: 16px;
    width: calc(100% - 32px);
  }

  .search-box {
    padding-top: 24px;
  }

  #search-icon {
    margin-right: 24px;
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
