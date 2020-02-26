import { css } from 'lit-element';

export default css`
  .selection-box {
    display: flex;
    flex-direction: column;
    margin: 16px 16px 0 16px;
  }

  .visual-view-options-card {
    padding: 12px 24px 24px 24px;
    background-color: var(--color-light-grey);
    border-radius: 4px;
    box-shadow: var(--material-card-shadow);
  }

  vaadin-combo-box {
    display: flex-start;
    margin: 0 12px;
  }

  #visual-back-button {
    display: inline-flex;
    height: 32px;
    cursor: pointer;
    color: #0031ca;
    font-weight: bold;
    margin-left: 12px;
  }

  #visual-back-icon {
    color: #0031ca;
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
    background-color: #f4f3f2;
  }

  #color-scheme-dropdown {
    width: 150px;
  }
`;
