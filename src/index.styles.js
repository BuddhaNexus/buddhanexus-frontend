import { css } from 'lit-element';

export default css`
  main {
    margin-top: var(--header-height);
    min-height: 500px;
    display: flex;
    justify-content: space-between;
  }

  main > * {
    flex: 1;
  }

  .layout--large-navbar main {
    margin-top: 0;
  }

  .header-title {
    margin: 20px 16px;
    font-family: Roboto, Source Sans Pro, sans-serif;
  }

  @media screen and (max-width: 400px) {
    .header-title {
      font-size: 16px;
    }
  }

  @media screen and (max-width: 860px) {
    .header-title {
      font-size: 24px;
    }
  }

  [hidden] {
    display: none;
  }

  h1,
  nav {
    display: inline-block;
  }

  header,
  nav {
    padding-left: 16px;
    padding-bottom: 8px;
  }

  header {
    background: var(--color-background);
    color: var(--color-text-primary);
    box-shadow: 0 4px 8px #888888;
  }

  vaadin-tabs {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    overflow: hidden;
    --material-primary-color: var(--bn-dark-red);
  }

  vaadin-menu-bar {
    display: flex;    
    justify-content: space-between;
    align-items: center;
    flex: 1;
    overflow: hidden;
    color: var(--color-menu-items);
    --material-primary-color: var(--bn-dark-red);
    --material-primary-text-color: white;

  }

  #search-input {
    margin-left: 16px;
    margin-right: 16px;
    // get rid of the top padding caused by label
    margin-top: -20px;
  }

  #search-input .floated-label-placeholder {
    display: none;
  }

  vaadin-app-layout {
    padding-top: 0;
    width: 100%;
    flex: 1;
    height: 100%;
    --vaadin-app-layout-navbar-background: var(--color-background);
    background-color: var(--color-background-light);
  }

  vaadin-app-layout::part(navbar) {
    z-index: 2;
  }

  .content {
    margin-left: 24px;
  }

  a.menu-tab {
    text-decoration: none;
  }

  vaadin-drawer-toggle {
    margin-right: 0;
    z-index: 99;
    margin-left: 165px;
    --material-primary-text-color: var(--color-menu-items);
  }

  .logo-buddhanexus {
    position: absolute;
    top: -65px;
    left: 15px;
    width: 150px;
    height: 150px;
  }

  .menu-tab vaadin-tab {
    color: var(--color-menu-items);
  }

  .menu-tab.main {
    display: block;

  }

  .menu-tab.lang {
    display: block;
    position: absolute;
    right: 300px;
  }

  #menu-drawer {
    height: 100%;
    overflow: scroll;
    padding-top: 100px;
    background: var(--color-sidebar-menu);
    border-top: #0f0;
  }

  .search-icon-container {
  }

  .search-icon {
    max-width: 12px;
    margin-right: 8px;
    margin-bottom: 2px;
  }

  footer {
    width: 100%;
    z-index: 100;
    background: #777;
  }

  .footer-logo {
    width: 69px;
    margin: 10px 20px 5px 20px;
  }

  .footer-bar {
    background: var(--color-footer-bar);
    text-align: right;
    font-family: var(--material-font-family);
    font-size: var(--material-button-font-size);
  }

  .footer-bar-content {
    color: #fff;
    background: var(--color-footer-bar-content);
    float: right;
    padding: 0 3em 0 1em;
    height: 1.7em;
  }

  .footer-bar-content a,
  .footer-bar-content a:hover,
  .footer-bar-content a:active {
    color: #fff;
    font-family: var(--material-font-family);
    font-size: var(--material-button-font-size);
    text-decoration: none;
    padding: 0 0.6em;
  }

  .footer-color {
    background: var(--color-background-all);
    min-height: 3em;
  }

  .footer-corner {
    content: ' ';
    background: #221f19;
  }

  .footer-right {
    text-align: right;
  }

  .footer-bar {
    background: var(--color-footer-bar);
    text-align: right;
    font-family: var(--material-font-family);
    font-size: var(--material-button-font-size);
  }
`;
