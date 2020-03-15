import { css } from 'lit-element';

export default css`
  .side-sheet {
    display: flex;
    flex-direction: column;
    z-index: 15;
    flex: 1;
    height: inherit;
    border-left: 2px var(--color-light-grey) solid;
    background-color: white;
  }

  .side-sheet__content {
    height: 100%;

    overflow-y: scroll;
    padding-left: 16px;
    padding-right: 16px;
    padding-top: 20px;
  }

  .side-sheet__title {
    height: 24px;
    font-weight: 500;
  }
`;
