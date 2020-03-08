import { customElement, html, css, LitElement, property } from 'lit-element';

@customElement('bn-card')
export class Card extends LitElement {
  @property({ type: Boolean }) small;

  static get styles() {
    return [
      css`
        .card {
          padding: 12px 24px 24px 24px;
          border-radius: 4px;
          background-color: var(--color-light-grey);
          box-shadow: var(--material-card-shadow);
        }

        .card--small {
          padding: 2px;
        }
      `,
    ];
  }

  render() {
    return html`
      <div class="card ${this.small ? 'card--small' : ''}"><slot></slot></div>
    `;
  }
}
