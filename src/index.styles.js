import { css } from 'lit-element';

export default css`
  .header-title {
    margin-left: 24px;
    margin-right: 18px;
    font-family: Roboto, Source Sans Pro, sans-serif;
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

  main {
    padding: 16px;
  }

  header {
    background: var(--color-background);
    color: var(--color-text-primary);
    box-shadow: 0 4px 8px #888888;
  }

  @media screen and (max-width: 860px) {
    vaadin-tabs {
      flex-wrap: wrap;
    }
  }

  vaadin-tabs {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100%;
  }

  vaadin-tabs paper-input {
    position: absolute;
    display: flex;
    right: 32px;
    top: 10%;
    color: white;
  }

  vaadin-tab {
    color: var(--color-text-primary);
  }

  vaadin-app-layout {
    --vaadin-app-layout-navbar-background: var(--color-background);
  }

  .content {
    margin-left: 24px;
  }

  a.menu-tab {
    text-decoration: none;
  }

  #menu-drawer {
    height: 100%;
    overflow: scroll;
  }

  vaadin-drawer-toggle {
    margin-right: 0;
    color: #2a3443;
  }
`;
