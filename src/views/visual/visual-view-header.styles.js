import { css } from 'lit-element';

export default css`
  .selection-box {
    display: flex;
    align-items: baseline;
    margin-left: 12px;
  }

  #visual-view-dropdown {
    display: flex-start;
    margin: 0 24px;
  }

  #visual-back-button {
    display: inline-flex;
    height: 32px;
    background-color: white;
    cursor: pointer;
  }

  #visual-back-icon {
    color: #0031ca;
    margin: 0px;
  }

  #target-visual-view-dropdown {
    display: flex-end;
    margin: 0 24px;
    width: 400px;
  }

  p.explanation-text {
    text-align: center;
  }

  #visual-back-button[name]:hover:after {
    content: attr(name);
    background-color: #002080;
    border-radius: 4px;
    box-shadow: 0 4px 8px #888888;
    color: white;
    opacity: 0.9;
    font-size: 14px;
    padding: 4px 8px;
    position: absolute;
    z-index: 99;
    font-weight: bold;
  }
`;
