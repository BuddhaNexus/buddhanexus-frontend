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
  }

  .data-view__main-container bn-card {
    margin-right: auto;
  }

  side-sheet {
    //flex-basis: 0;
    //flex-grow: 1;
    min-width: ${SIDE_SHEET_WIDTH}px;
    height: 100%;
    overflow-y: auto;
    //position: relative;
    //flex: 1;
  }
`;
