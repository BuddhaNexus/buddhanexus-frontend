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
    max-height: 100vh;
    overflow: auto;
    flex: 1;
  }

  data-view-router {
    padding: 12px 48px 48px;
  }

  .data-view__main-container bn-card {
    margin-right: auto;
  }

  data-view-header {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    position: sticky;
    top: 0;
    z-index: 1;
    width: 100%;
    transition: width var(--vaadin-app-layout-transition);
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
`;
