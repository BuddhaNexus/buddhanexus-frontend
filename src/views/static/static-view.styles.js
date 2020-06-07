import { css } from 'lit-element';

export default css`
  .construction {
    text-align: left;
    color: #000;
    font-weight: 300;
  }

  .construction-sub {
    text-align: center;
    color: #000;
  }

  .backgroundpanel {
    display: none;
    position: fixed;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
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
  }

  .main-border {
    margin: 0 25%;
    padding-top: 70px;
    padding-bottom: 50px;
  }

  .main-content {
    background-color: #fff;
    padding: 14px 40px;
    border-top: 8px solid #221f19;
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
    color: #7d6f57;
    text-decoration: none;
  }

  .static-page-container a.content-link:hover {
    color: #4d3f27;
    text-decoration: underline;
  }

  .static-page-container a.link span.link-description {
    padding-top: 0.4em;
  }

  .menu-tab.main button {
    color: #fff;
  }

  table.activity td {
    padding: 0 0.8em 0.6em 0;
    vertical-align: top;
  }

  .box-languages {
    background-color: #221f19;
    width: 100%;
    margin-top: 30px;
    margin-bottom: 100px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }

  .box-languages {
    text-align: center;
    padding: 18px 0 15px 0;
  }

  .box-languages ul {
    margin: 4px;
    padding: 4px;
    text-align: center;
  }

  .box-languages ul li {
    display: inline-block;
  }

  .lang-img {
    width: 120px;
    display: inline-block;
    margin: 0 6px;
  }

  body [part='navbar'] {
    padding: 0.05em 0 0.05em 4.75em;
    box-shadow: var(--material-shadow-elevation-4dp);
    background: #221f19;
    margin: 400px 0 0 0;
  }

  @media (min-width: 700px) {
    [part='navbar'] {
      padding: 0.05em 0 0.05em 4.75em;
      box-shadow: var(--material-shadow-elevation-4dp);
      background: #221f19;
      margin: 400px 0 0 0;
    }

    [part='navbar'].navbar-subsite {
      position: fixed;
      top: 70px;
    }

    a active {
      background-color: rgba(204, 17, 0, 30%);
    }
  }

  @media screen and (max-width: 1100px) {
    .main-border {
      margin: 0px 15%;
    }
  }

  @media screen and (max-width: 600px) {
    .static-page-container {
      margin: 0; /* 48px 24px; */
    }

    .main-border {
      margin: 0px 3%;
      padding-top: 80px;
      padding-bottom: 50px;
    }
    .main-content {
      background-color: #fff;
      padding: 14px 30px;
    }
  }

  @media screen and (min-width: 1000px) {
    .construction-message {
      display: none;
    }
  }
`;
