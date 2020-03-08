import { css } from 'lit-element';

const SIDE_SHEET_WIDTH = 360;

export default css`
  .data-view {
    position: relative;
    display: flex;
    height: 100%;

    padding-right: ${SIDE_SHEET_WIDTH}px;
  }

  .data-view__main-container {
    display: flex;
    flex-direction: column;
    padding: 48px;
  }

  .data-view__main-container bn-card {
    margin-right: auto;
  }
`;
