import { css } from 'lit-element';

export default css`
  #histogram-title {
    font-weight: bold;
    margin-bottom: 12px;
  }

  #pie-wrapper,
  #histogram-wrapper {
    margin-bottom: 24px;
  }

  .info-button {
    padding: 0;
    min-width: 24px;
    height: 24px;
    margin-left: 12px;
    background-color: white;
    cursor: pointer;
  }

  vaadin-button {
    background-color: #0031ca;
    color: rgba(0, 0, 0, 0.54);
    font-weight: bold;
    height: 32px;
  }
`;
