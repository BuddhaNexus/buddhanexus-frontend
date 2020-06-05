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

  .static-page-container a.link {
    color: #fff;
    text-decoration: none;
  }

  .static-page-container a.link:hover {
    color: #ccc;
    text-decoration: underline;
  }

  .static-page-container a.link span.link-description {
    padding-top: 0.4em;
  }

  .popup {
    display: none;
    position: fixed;
    top: 0px;
    width: 80%;
    min-height: 20%;
    margin: 10%;
    background: var(--material-popup-back);
    box-shadow: 0.3em 0.3em 0.9em rgba(0, 0, 0, 0.4);
    border-top: 8px solid #221f19;
    z-index: 100;
    overflow: hidden;
  }

  .popup-close {
    font-size: 2em;
    float: right;
    cursor: pointer;
    color: var(--material-popup-close-x);
    line-height: 0.2em;
  }

  .popup-head {
    padding: 0.8em;
    height: 0.8em;
    position: absolute;
    right: 0;
    background: var(--material-popup-close);
  }

  .popup-content {
    padding: 1.3em 2.5em 1em 1.5em;
    overflow-y: scroll;
    height: 300px;
  }

  .popup-footer {
    height: 10px;
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
