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

  html body .head {
    background: #f00; /*#6d5f47; */
    height: 400px;
  }

  .buddhanexus {
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
    margin: 80px 180px 20px 180px;
    padding-top: 120px;
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
    height: 150px;
    width: 100%;
    margin-top: 30px;
    margin-bottom: 100px;
  }

  .box-languages {
    text-align: center;
    padding: 15px 0 0 0;
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

  @media screen and (max-width: 600px) {
    #home {
      margin: 0; /* 48px 24px; */
    }

    .main-border {
      margin: 60px 6px;
      padding-top: 80px;
      padding-bottom: 50px;
    }
    .main-content {
      background-color: #fff;
      padding: 14px 30px;
    }
  }
`;
