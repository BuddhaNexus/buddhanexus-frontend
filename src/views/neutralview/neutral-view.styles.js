import { css } from 'lit-element';

export default css`
  .main-border {
    margin: 0 25%;
    padding-top: 70px;
    padding-bottom: 50px;
  }

  .main-content {
    background-color: var(--material-nav-left-color);
    padding: 14px 40px;
    border-top: 8px solid #221f19;
    font-family: var(--source-serif-font-stack);
  }

  .main-content h1 {
    font-size: 1.6em;
  }

  .main-content h2 {
    font-size: 1.4em;
  }

  .main-content h3 {
    font-size: 1.2em;
    font-weight: bold;
  }

  .copyright {
    font-size: 0.8em;
    font-weight: 200;
  }

  a.content-link {
    color: var(--content-link-color);
    text-decoration: none;
  }

  a.content-link:hover {
    color: var(--hover-link-color);
    text-decoration: underline;
  }
`;
