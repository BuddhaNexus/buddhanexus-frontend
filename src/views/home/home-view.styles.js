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

  .head {
    background: #fff !important;
  }

  #home {
    display: block;
    background-image: url('src/assets/img/background_wellcome.jpg');
    background-size: cover;
    background-attachment: fixed;
  }

  .mainborder {
    margin: 80px 90px;
    padding-top: 120px;
    padding-bottom: 50px;
  }
  .maincontent {
    background-color: #fff;
    padding: 14px 40px;
  }

  @media screen and (max-width: 600px) {
    #home {
      margin: 0; /* 48px 24px; */
    }

    .mainborder {
      margin: 60px 6px;
      padding-top: 80px;
      padding-bottom: 50px;
    }
    .maincontent {
      background-color: #fff;
      padding: 14px 30px;
    }
  }
`;
