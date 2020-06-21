import { css } from 'lit-element';

export default css`
  data-view-router {
    padding: 0;
  }

  .static-page-container {
    display: block;
    height: 100%;
    background-image: url('/src/assets/img/background_welcome.jpg');
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
`;
