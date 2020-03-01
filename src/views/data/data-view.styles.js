import { css } from 'lit-element';

export default css`
  .data-view-container {
    display: flex;
    flex-direction: column;
    height: 100%;
    margin: 216px 51px;
  }

  .data-view-options-card {
    flex-direction: column;
    padding: 24px;
    background-color: var(--color-light-grey);
    border-radius: 4px;
    box-shadow: var(--material-card-shadow);
  }
`;
