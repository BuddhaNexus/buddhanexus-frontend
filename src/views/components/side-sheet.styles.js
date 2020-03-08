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
    position: absolute;
    overflow: scroll;
    transform: translate3d(0, 0, 0);
    box-shadow: var(--material-shadow-elevation-2dp);
  }
`;
