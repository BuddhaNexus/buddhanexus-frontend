import { css } from 'lit-element';

export default css`
  .data-view {
    position: relative;
    display: flex;
    height: 100%;
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
