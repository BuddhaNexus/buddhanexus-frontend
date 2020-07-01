import { css } from 'lit-element';

export default css`
  .selection-box {
    display: flex;
    flex-direction: column;
    margin: 16px 16px 0 16px;
  }

  vaadin-button {
    --material-primary-color: var(--bn-dark-red);
    --material-primary-text-color: var(--bn-dark-red);
  }

  vaadin-combo-box {
    display: flex-start;
    margin: 0 12px;
  }

  #visual-back-button {
    color: var(--bn-dark-red);
    display: inline-flex;
    height: 32px;
    cursor: pointer;
    font-weight: bold;
    margin-left: 12px;
    background-color: transparent;
  }

  #visual-back-icon {
    color: var(--bn-dark-red);
    margin-left: 0px;
  }

  #target-visual-view-dropdown {
    display: flex-end;
    margin: 0 12px;
    width: 400px;
  }

  .info-button {
    padding: 0;
    min-width: 24px;
    height: 24px;
    cursor: pointer;
    color: rgba(0, 0, 0, 0.54);
    font-weight: bold;
    background-color: transparent;
  }

  #color-scheme-dropdown {
    width: 200px;
  }
`;
