import { css } from 'lit-element';

export default css`
  :host {
    display: inline-flex;
    align-items: baseline;
    margin-top: 16px;
    flex-wrap: wrap;
    flex-direction: column;
    padding-bottom: 36px;
  }

  vaadin-radio-button,
  vaadin-select,
  vaadin-combo-box,
  multiselect-combo-box,
  vaadin-checkbox,
  vaadin-text-field {
    --material-primary-color: var(--bn-dark-red);
    --material-primary-text-color: var(--bn-dark-red);
  }

  .input-field {
    padding-left: 16px;
    padding-right: 16px;
    width: calc(100% - 32px);
  }

  #search-icon {
    margin-right: 24px;
  }

  multiselect-combo-box::part(combo-box) {
    max-width: 280px;
    overflow: hidden;
  }

  .filter-group {
    margin-bottom: 16px;
  }

  .info-button {
    background-color: transparent;
    cursor: help;
  }

  .info-icon {
    color: var(--bn-dark-red);
    padding: 0;
  }
`;
