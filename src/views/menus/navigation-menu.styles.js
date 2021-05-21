import { css } from 'lit-element';

export default css`
  #menu-container {
    margin-top: 44px;
    margin-bottom: 180px;
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-bottom-color: var(--material-nav-left-lines);
  }

  ul {
    list-style-type: none;
    padding-left: 0;
    margin: 0 0px 0 -12px;
  }

  .multifiles {
    padding-left: 28px;
  }

  li {
    padding-bottom: 6px;
    padding-top: 12px;
  }

  .filename {
    font-size: 14px;
    font-family: var(--system-font-stack);
    cursor: pointer;
  }

  vaadin-details {
    box-shadow: none;
    margin: 0;
    border-top-width: 1px;
    border-top-style: solid;
    border-top-color: var(--material-nav-left-lines);
    padding: 0 0 0 0;
  }

  vaadin-details::part(content) {
    padding: 0 0 0 0;
  }

  .category-name {
    font-size: 12px;
  }

  .category-display {
    margin-left: 0;
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
    padding: 0 0 12px 28px;
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
    line-height: 1.5;
    padding-bottom: 0;
    display: block;
    display: -webkit-box;
    max-width: 200px;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
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
    border-top: 1px solid var(--material-nav-left-lines);
  }
`;
