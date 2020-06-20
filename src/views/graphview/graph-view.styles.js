import { css } from 'lit-element';

export default css`
  .graph-container {
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow: hidden;
    margin-bottom: 2.25em;
  }

  #histogram-title {
    font-weight: bold;
    margin-bottom: 12px;
  }

  #pie-wrapper,
  #histogram-wrapper {
    display: flex;
  }

  #pie-wrapper {
    margin-bottom: 24px;
  }

  .info-button {
    padding: 0;
    min-width: 24px;
    height: 24px;
    margin-left: 12px;
    background-color: transparent;
    cursor: pointer;
    color: rgba(0, 0, 0, 0.54);
    font-weight: bold;
  }
`;
