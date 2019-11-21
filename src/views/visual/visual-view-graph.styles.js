import { css } from 'lit-element';

export default css`
  #parallels-chart {
    font: 13px sans-serif;
    padding: 30px;
    width: 93vw;
  }
  #pages-display {
    margin: 0 auto;
    text-align: center;
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
