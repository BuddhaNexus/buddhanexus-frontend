import { css } from 'lit-element';

export default css`
  .data-view-container {
    display: flex;
    flex-direction: column;
    height: 100%;
    margin: 216px 51px;
  }

  .data-view-options-card {
    padding: 24px;
    background-color: var(--color-light-grey);
    border-radius: 4px;
    box-shadow: var(--material-card-shadow);
  }

  .head {
    background: url('./src/assets/img/background_skt.jpg');
  }
`;
