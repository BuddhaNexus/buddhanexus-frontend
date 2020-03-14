import { css } from 'lit-element';

export default css`
  #menu-container {
    margin-top: 24px;
    border-bottom: var(--material-nav-left-lines);
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
    margin-left: 0px;
    color: var(--material-nav-left-color);
  }

  .file-list ul li {
    color: var(--material-nav-left-color);
    font-family: var(--material-font-family);
    font-size: var(--material-button-font-size);
  }

  .collection-list {
    font-family: var(--material-font-family);
    font-size: var(--material-button-font-size);
    color: var(--material-nav-left-color);
  }

  .file-list {
    line-height: 1rem;
  }

  vaadin-details::part(summary),
  vaadin-details::part(content),
  vaadin-details::part(toggle) {
    background: var(--color-sidebar-menu);
    color: var(--color-menu-items);
    border-right: none;
    border-bottom: none;
    border-left: none;
    font-family: var(--material-font-family);
    font-size: var(--material-button-font-size);
  }

  vaadin-details::part(summary) {
    border-top: 1px solid rgba(255, 255, 255, 0.4);
  }

  .file-list ul {
    padding: 0 0 0 36px;
    border-top: 1px solid rgba(255, 255, 255, 0.25);
    background: var(--color-sidebar-submenu);
    min-height: 40px;
  }
`;
