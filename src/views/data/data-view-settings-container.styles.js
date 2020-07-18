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

  paper-toggle-button {
    --paper-toggle-button-checked-button-color: var(--bn-dark-red);
    --paper-toggle-button-checked-bar-color: var(--bn-dark-red);
  }

  #show-segment-number {
    color: var(--color-text-secondary);
    font-size: 14px;
    font-family: var(--system-font-stack);
    font-weight: 400;
  }
`;
