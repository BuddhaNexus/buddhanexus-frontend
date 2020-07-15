import { css } from 'lit-element';

export default css`
  #parallels-chart {
    font: 13px sans-serif;
    padding: 30px;
    width: 93%;
  }

  #pages-display {
    text-align: center;
  }

  #inner-pages {
    padding-top: 12px;
  }

  .element {
    cursor: pointer;
    color: black;
    float: left;
    padding: 8px 16px;
  }

  .active {
    background-color: var(--color-background);
    color: black;
  }

  .element:hover:not(.active) {
    background-color: var(--color-dark-grey);
  }
`;
