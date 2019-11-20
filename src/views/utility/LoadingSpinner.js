import { css, customElement, html, LitElement, property } from 'lit-element';

import DharmaWheelIcon from '../../assets/icons/dharma-wheel.svg';

@customElement('bn-loading-spinner')
class LoadingSpinner extends LitElement {
  @property({ type: String }) marginAdjust = '0px';
  @property({ type: Boolean }) visible = true;

  static get styles() {
    return [
      css`
        .bn-loading-spinner {
          width: 48px;
          height: 48px;
          z-index: 3;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          -webkit-animation: rotating 2s linear infinite;
          -moz-animation: rotating 2s linear infinite;
          -ms-animation: rotating 2s linear infinite;
          -o-animation: rotating 2s linear infinite;
          animation: rotating 2s linear infinite;
        }

        .bn-loading-spinner--hidden {
          display: none;
        }

        @-webkit-keyframes rotating {
          from {
            -webkit-transform: rotate(0deg);
            -o-transform: rotate(0deg);
            transform: rotate(0deg);
          }
          to {
            -webkit-transform: rotate(360deg);
            -o-transform: rotate(360deg);
            transform: rotate(360deg);
          }
        }

        @keyframes rotating {
          from {
            -ms-transform: rotate(0deg);
            -moz-transform: rotate(0deg);
            -webkit-transform: rotate(0deg);
            -o-transform: rotate(0deg);
            transform: rotate(0deg);
          }
          to {
            -ms-transform: rotate(360deg);
            -moz-transform: rotate(360deg);
            -webkit-transform: rotate(360deg);
            -o-transform: rotate(360deg);
            transform: rotate(360deg);
          }
        }
      `,
    ];
  }

  render() {
    return html`
      <img
        src="${DharmaWheelIcon}"
        alt="loading spinner"
        style="margin-top:${this.marginAdjust}"
        class="bn-loading-spinner ${!this.visible &&
          'bn-loading-spinner--hidden'}"
      />
    `;
  }
}

export default LoadingSpinner;
