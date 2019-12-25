import { css } from 'lit-element';

export default css`
  #menu-container {
    margin-top: 24px;
  }

  ul {
    list-style-type: none;
    padding-left: 12px;
  }

  li {
    padding-bottom: 12px;
  }

  .collection-menu {
    color: rgb(115, 115, 115);
    padding-top: 12px;
  }

  .filename {
    font-size: 14px;
    font-family: Roboto;
  }

  .hidden {
    display: none;
  }

  .dropdown-icon {
    float: right;
    width: 18px;
    padding-right: 12px;
  }

  vaadin-accordion-panel {
    box-shadow: none;
    margin: 0;
  }
`;
