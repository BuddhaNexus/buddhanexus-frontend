import { css } from 'lit-element';

const SIDE_SHEET_WIDTH = 360;

export default css`
  .data-view {
    position: relative;
    display: flex;
    justify-content: space-between;
    height: 100%;
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
    min-width: ${SIDE_SHEET_WIDTH}px;
    width: ${SIDE_SHEET_WIDTH}px;
  }

  side-sheet.side-sheet--closed {
    min-width: 0;
    width: 0;
  }
`;
