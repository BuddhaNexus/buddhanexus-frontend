import { css } from 'lit-element';

export default css`
  .side-sheet {
    display: flex;
    flex-direction: column;
    //position: fixed;
    right: 0;
    height: 100%;
    width: 360px;
    //background-color: var(--color-background-light);
    background-color: white;
    position: fixed;
    overflow-y: scroll;
    overflow-x: hidden;
    transform: translate3d(0, 0, 0);
    box-shadow: var(--material-shadow-elevation-2dp);
    padding-bottom: 160px;
  }

  .side-sheet__content {
    padding-left: 16px;
    padding-right: 16px;
    padding-top: 20px;
  }

  .side-sheet__title {
    height: 24px;
    font-weight: 500;
  }
`;
