import { css } from 'lit-element';

export default css`
  #parallels-chart {
    font: 13px sans-serif;
    padding: 30px;
    width: 93vw;
  }
  #pages-display {
    position: relative;
    top: 50%;
    transform: perspective(1px) translateY(-50%);
  }
  .element {
    cursor: pointer;
    color: black;
    float: left;
    padding: 8px 16px;
  }
  .active {
    background-color: #db960a;
    color: black;
  }
  .element:hover:not(.active) {
    background-color: #ddd;
  }
`;
