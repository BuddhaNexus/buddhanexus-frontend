import { css } from 'lit-element';

export default css`
  main {
    margin-top: 164px;
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

  vaadin-tabs paper-input {
    position: absolute;
    display: flex;
    right: 32px;
    top: 10%;
    color: white;
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
    margin-left: 150px;
    --material-primary-text-color: var(--color-footer-bar);
  }

  .logo-buddhanexus {
    position: absolute;
    top: -65px;
    left: 15px;
    width: 150px;
    height: 150px;
  }

  .menu-tab vaadin-tab {
    color: #fff;
  }

  #menu-drawer {
    height: 100%;
    overflow: scroll;
    padding-top: 100px;
    background: #a79570;
  }
`;
