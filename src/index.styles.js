import { css } from 'lit-element';

export default css`
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

  vaadin-tab {
    color: var(--color-text-primary);
  }

  vaadin-app-layout {
    width: 100%;
    --vaadin-app-layout-navbar-background: var(--color-background);
    background-color: var(--color-background-light);
  }

  .content {
    margin-left: 24px;
  }

  a.menu-tab {
    text-decoration: none;
  }

  vaadin-drawer-toggle {
    margin-right: 0;
    color: #2a3443;
    z-index: 99;
    margin-left: 150px;
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
    background: var(--color-background-light);
  }
`;
