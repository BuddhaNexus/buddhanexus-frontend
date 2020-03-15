import { css } from 'lit-element';

export default css`
  .data-view {
    position: relative;
    display: flex;
    justify-content: space-between;
    height: 100%;
    max-width: 100vw;
    flex: 1;
  }

  .data-view__main-container {
    display: flex;
    flex-direction: column;
    padding: 48px;
    max-height: 100vh;
    overflow: auto;
    flex: 1;
  }

  .data-view__main-container bn-card {
    margin-right: auto;
  }

  .data-view__header-container {
    display: flex;
    justify-content: space-between;
  }

  side-sheet {
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    transition: width var(--vaadin-app-layout-transition),
      min-width var(--vaadin-app-layout-transition);
  }

  side-sheet.side-sheet--open {
    min-width: var(--side-sheet-width);
    width: var(--side-sheet-width);
  }

  side-sheet.side-sheet--closed {
    min-width: 0;
    width: 0;
  }

  .filter-bar-toggle-button {
    position: fixed;
    right: var(--side-sheet-width);
    margin-right: 48px;
    min-height: 48px;
    min-width: 48px;
    transition: right var(--vaadin-app-layout-transition);
    z-index: 100;
  }

  .filter-bar-toggle-button--filter-bar-closed {
    right: 0;
  }

  text-select-combo-box {
    flex-wrap: wrap;
    margin-bottom: 16px;
  }
`;
