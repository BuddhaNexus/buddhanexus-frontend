import { css } from 'lit-element';

export default css`
  body {
    background: #e9ddc2;
  }

  .construction {
    text-align: center;
    color: blue;
    font-weight: bold;
  }

  .construction-sub {
    text-align: center;
    color: blue;
  }

  html body .logo-container {
    height: 400px;
    background-image: url('src/assets/img/background_wellcome.jpg');
    background-color: #6d5f47;
  }

  .logo-buddhanexus {
    display: none;
  }

  h1.header-title {
    display: none;
  }

  #home {
    display: block;
    background-image: url('src/assets/img/background_wellcome.jpg');
    background-size: cover;
    background-attachment: fixed;
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

  .main-border {
    margin: 0px 180px 0px 180px;
    padding-top: 70px;
    padding-bottom: 50px;
  }
  .main-content {
    background-color: #fff;
    padding: 14px 40px;
    border-top: 8px solid #221f19;
  }

  .more {
    cursor: pointer;
  }

  #home a.link {
    color: #fff;
    text-decoration: none;
  }

  #home a.link:hover {
    color: #ccc;
    text-decoration: underline;
  }

  #home a.link span.link-description {
    padding-top: 0.4em;
  }

  .popup {
    display: none;
    width: 80%;
    min-height: 20%;
    position: absolute;
    margin: 10%;
    background: #efefef;
    box-shadow: 0.3em 0.3em 0.9em rgba(0, 0, 0, 0.4);
    border-top: 8px solid #221f19;
    z-index: 100;
  }

  .popup-close {
    font-size: 1.4em;
    float: right;
    cursor: pointer;
  }

  .popup-head {
    padding: 1.3em;
    height: 2em;
  }

  .popup-content {
    padding: 1.3em;
  }

  .popup-footer {
  }

  .box-languages {
    background-color: #221f19;
    width: 100%;
    margin-top: 30px;
    margin-bottom: 100px;
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
      top: 80px;
    }

    .navbar-fixed {
      position: fixed;
      top: 80px;
    }
    a active {
      background-color: rgba(204, 17, 0, 30%);
    }
  }

  @media screen and (max-width: 600px) {
    #home {
      margin: 0; /* 48px 24px; */
    }

    .main-border {
      margin: 0 60px;
      padding-top: 80px;
      padding-bottom: 50px;
    }
    .main-content {
      background-color: #fff;
      padding: 14px 30px;
    }
  }
`;
