import { css, customElement, html, LitElement, property } from 'lit-element';

import DharmaWheelIcon from '../../assets/icons/dharma-wheel.svg';

@customElement('bn-loading-spinner')
export default class LoadingSpinner extends LitElement {
  @property({ type: Boolean }) visible = true;
  @property({ type: Boolean }) relative = false;

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
          -webkit-animation: rotating 3s linear infinite;
          -moz-animation: rotating 3s linear infinite;
          -ms-animation: rotating 3s linear infinite;
          -o-animation: rotating 3s linear infinite;
          animation: rotating 3s linear infinite;
          user-select: none;
        }

        .bn-loading-spinner--hidden {
          display: none;
        }

        .bn-loading-spinner--relative {
          position: relative;
        }

        @keyframes rotating {
          from {
            transform: translate(-50%, -50%) rotate(0deg);
          }
          to {
            transform: translate(-50%, -50%) rotate(360deg);
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
        class="bn-loading-spinner ${!this.visible &&
          'bn-loading-spinner--hidden'} ${this.relative &&
          'bn-loading-spinner--relative'}"
      />
    `;
  }
}
