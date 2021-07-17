import { css } from 'lit-element';

export default css`
  :host {
    display: none;
    align-items: baseline;
    flex-wrap: wrap;
    flex-direction: column;
    padding: 0 0 24px 16px;
  }

  paper-toggle-button {
    --paper-toggle-button-checked-button-color: var(--bn-dark-red);
    --paper-toggle-button-checked-bar-color: var(--bn-dark-red);
  }

  vaadin-radio-button,
  vaadin-radio-group {
    --material-primary-color: var(--bn-dark-red);
    --material-primary-text-color: var(--bn-dark-red);
  }

  .button-font {
    color: var(--color-text-secondary);
    font-size: 14px;
    font-family: var(--system-font-stack);
    font-weight: 400;
  }

  .segment-numbers-sides {
    margin-left: 44px;
  }
`;
