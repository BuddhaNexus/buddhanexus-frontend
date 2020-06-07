import { customElement, html, css, LitElement, property } from 'lit-element';

@customElement('bn-card')
export class Card extends LitElement {
  @property({ type: Boolean }) small;
  @property({ type: Boolean }) header;
  @property({ type: Boolean }) light;

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

        .card--header {
          padding: 16px 64px 16px 48px;
          border-radius: 0;
          display: flex;
          flex-wrap: wrap;
        }

        @media screen and (max-width: 900px) {
          .card--header {
            padding: 12px 16px;
            font-size: 0.8em;
            position: sticky;
          }
        }

        .card--light {
          background-color: var(--color-background-lighter);
        }
      `,
    ];
  }

  render() {
    return html`
      <div
        class="card ${this.small ? 'card--small' : ''} ${this.header
          ? 'card--header'
          : ''}${this.light ? 'card--light' : ''}"
      >
        <slot></slot>
      </div>
    `;
  }
}
