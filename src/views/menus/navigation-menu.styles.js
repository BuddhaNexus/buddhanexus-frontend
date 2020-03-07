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
    cursor: pointer;
  }

  vaadin-details {
    box-shadow: none;
    margin: 0;
  }

  .category-name {
    font-size: 12px;
  }

  .category-display {
    margin-left: -12px;
  }

  .collection-list {
    font-size: 18px;
    font-family: Roboto;
  }

  .file-list {
    line-height: 1rem;
  }

  vaadin-details::part(summary),
  vaadin-details::part(content),
  vaadin-details::part(toggle) {
    background: var(--color-sidebar-menu);
    color: var(--color-menu-items);
  }
`;
