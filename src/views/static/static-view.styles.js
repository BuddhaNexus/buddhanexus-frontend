import { css } from 'lit-element';

export default css`
  .construction {
    text-align: left;
    color: var(--color-text-primary);
    font-weight: 300;
  }

  .backgroundpanel {
    display: none;
    position: fixed;
    width: 100%;
    height: 100%;
    background: var(--static-background-panel-color);
    z-index: 10;
    top: 0;
    left: 0;
  }

  .static-page-container {
    display: block;
    height: 100%;
    background-image: url('src/assets/img/background_welcome.jpg');
    background-size: cover;
    background-attachment: fixed;
    height: auto;
  }

  .main-border {
    margin: 0 25%;
    padding-top: 4.375em;
    padding-bottom: 3.125em;
  }

  .main-content {
    background-color: var(--material-nav-left-color);
    padding: 0.875em 2.5em;
    border-top: 0.5em solid var(--color-footer-bar);
  }

  .main-content h1 {
    font-size: 1.6em;
    font-weight: bold;
  }

  .main-content h2 {
    font-size: 1.4em;
    font-weight: bold;
  }

  .main-content h3 {
    font-size: 1.2em;
    font-weight: bold;
  }

  .more {
    cursor: pointer;
  }

  .static-page-container a.content-link {
    color: var(--content-link-color);
    text-decoration: none;
  }

  .static-page-container a.content-link:hover {
    color: var(--hover-link-color);
    text-decoration: underline;
  }

  .static-page-container a.link span.link-description {
    padding-top: 0.4em;
    color: var(--material-nav-left-color);
  }

  .menu-tab.main button {
    color: var(--material-nav-left-color);
  }

  table.activity td {
    padding: 0 0.8em 0.6em 0;
    vertical-align: top;
  }

  .box-languages {
    background-color: var(--color-footer-bar);
    width: 100%;
    margin-top: 1.875em;
    margin-bottom: 6.25em;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }

  .box-languages {
    text-align: center;
    padding: 18px 0 15px 0;
  }

  .box-languages ul {
    margin: 0.25em;
    padding: 0.25em;
    text-align: center;
  }

  .box-languages ul li {
    display: inline-block;
  }

  .partner {
    width: 50%;
    margin: 10px 0 20px 120px;
  }

  .partner img {
    width: 90%;
    text-align: center;
    box-shadow: var(--partner-card-shadow);
    margin: 0 10px 20px 0;
    border: 1px solid var(--material-border-lines);
  }

  .lang-img {
    width: 7.5em;
    display: inline-block;
    margin: 0 0.375em;
  }

  body [part='navbar'] {
    padding: 0.05em 0 0.05em 4.75em;
    box-shadow: var(--material-shadow-elevation-4dp);
    background: var(--color-footer-bar);
    margin: 400px 0 0 0;
  }

  @media (min-width: 700px) {
    [part='navbar'] {
      padding: 0.05em 0 0.05em 4.75em;
      box-shadow: var(--material-shadow-elevation-4dp);
      background: var(--color-footer-bar);
      margin: 25em 0 0 0;
    }

    [part='navbar'].navbar-subsite {
      position: fixed;
      top: 4.375em;
    }

    a active {
      background-color: var(--active-link-color);
    }
  }

  @media screen and (max-width: 1100px) {
    .main-border {
      margin: 0 15%;
    }
  }

  @media screen and (max-width: 600px) {
    .static-page-container {
      margin: 0; /* 48px 24px; */
    }

    .main-border {
      margin: 0 3%;
      padding-top: 5em;
      padding-bottom: 3.125em;
    }

    .main-content {
      background-color: var(--material-nav-left-color);
      padding: 0.875em 1.875em;
    }
  }

  p {
    line-height: 1.4em;
  }

  iron-icon {
    color: var(--bn-dark-red);
    height: 16px;
  }
`;
