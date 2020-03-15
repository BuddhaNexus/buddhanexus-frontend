import { css } from 'lit-element';

export default css`
  .side-sheet {
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    background-color: white;
    z-index: 15;
    flex: 1;
    height: inherit;
    border-left: 2px var(--color-light-grey) solid;
  }

  .side-sheet__content {
    position: fixed;
    height: 100%;
    overflow-y: scroll;
    padding-left: 16px;
    padding-right: 16px;
    padding-top: 20px;
    margin-bottom: var(--footer-height);
  }

  .side-sheet__title {
    height: 24px;
    font-weight: 500;
  }
`;
