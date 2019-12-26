import { css } from 'lit-element';

export default css`
  #menu-container {
    margin-top: 24px;
  }

  ul {
    list-style-type: none;
    padding-left: 0px;
    margin: 0 0 0 -12px;
  }

  li {
    padding-bottom: 6px;
    padding-top: 12px;
  }

  .filename {
    font-size: 14px;
    font-family: Roboto;
    color: #595959;
  }

  vaadin-details {
    box-shadow: none;
    margin: 0;
  }

  .category-name {
    font-size: 12px;
    color: #737373;
  }

  .category-display {
    margin-left: -12px;
  }

  .collection-list {
    font-size: 18px;
    font-family: Roboto;
    color: #737373;
  }

  .file-list {
    background-color: #f2f2f2;
    line-height: 1rem;
  }
`;
