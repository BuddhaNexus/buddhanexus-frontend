import { css } from 'lit-element';

export default css`
  #menu-container {
    margin-top: 34px;
    margin-bottom: 180px;
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-bottom-color: var(--material-nav-left-lines);
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
    border-top-width: 1px;
    border-top-style: solid;
    border-top-color: var(--material-nav-left-lines);
    padding: 0px 0px 0px 0px;
  }
  vaadin-details::part(content) {
    padding: 0px 0px 0px 0px;
  }

  .category-name {
    font-size: 12px;
  }

  .category-display {
    margin-left: 0px;
    color: var(--material-nav-left-color);
  }

  .file-list {
    line-height: 1rem;
    border-top-width: 1px;
    border-top-style: solid;
    border-top-color: var(--material-nav-left-lines);
    background: var(--color-sidebar-submenu);
  }

  .file-list ul {
    margin: 0;
    padding: 0 0 0 23px;
    border-top-width: 1px;
    border-top-style: solid;
    border-top-color: var(--material-nav-left-lines);
    background: var(--color-sidebar-subsubmenu);
    min-height: 40px;
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
`;
