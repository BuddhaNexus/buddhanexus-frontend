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

  vaadin-combo-box,
  multiselect-combo-box {
    --material-primary-color: var(--bn-dark-red);
    --material-primary-text-color: var(--bn-dark-red);
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

  bn-card {
    background-color: var(--color-light-chartbar);
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
    cursor: help;
  }

  .info-icon {
    color: var(--color-text-secondary);
  }

  .nav-bar-toggle-icon {
    cursor: row-resize;
    min-height: 22px;
    min-width: 22px;
    pointer-events: auto;
    opacity: 1;
    transition: opacity var(--vaadin-app-layout-transition);
    color: var(--material-secondary-text-color);
  }

  vaadin-button {
    background-color: transparent;
    color: var(--color-menu-items);
    font-weight: bold;
    min-width: 24px;
  }

  #color-scheme-dropdown {
    width: 200px;
  }
`;
