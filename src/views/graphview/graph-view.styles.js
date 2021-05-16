import { css } from 'lit-element';

export default css`
  .graph-container {
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow: hidden;
    margin-bottom: 2.25em;
    font-family: var(--roboto-font-stack);
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
    padding: 24px;
    cursor: help;
  }

  .info-icon {
    color: var(--color-text-secondary);
  }

  vaadin-button {
    background-color: transparent;
    color: var(--color-menu-items);
    font-weight: bold;
    height: 32px;
  }
`;
