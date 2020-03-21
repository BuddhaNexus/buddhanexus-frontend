import { customElement, html, css, LitElement, property } from 'lit-element';

@customElement('side-sheet')
export class SideSheet extends LitElement {
  @property({ type: String }) title = null;
  @property({ type: Boolean }) isOpen = false;
  @property({ type: Function }) handleClose;

  static get styles() {
    return [
      css`
        .side-sheet {
          display: flex;
          flex-direction: column;
          z-index: 15;
          flex: 1;
          height: inherit;
          border-left: 2px var(--color-light-grey) solid;
          background-color: white;
        }

        .side-sheet__content {
          height: 100%;

          overflow-y: scroll;
          padding-left: 16px;
          padding-right: 16px;
          padding-top: 20px;
        }

        .side-sheet__title {
          height: 24px;
          font-weight: 500;
        }

        .side-sheet__header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .side-sheet__close-icon {
          padding: 12px;
          margin-right: 6px;
          cursor: pointer;
        }
      `,
    ];
  }

  render() {
    return html`
      <aside class="side-sheet">
        <div class="side-sheet__content">
          <div class="side-sheet__header">
            <div class="side-sheet__title">${this.title}</div>
            <!--            <div >-->
            <iron-icon
              @click="${this.handleClose}"
              class="side-sheet__close-icon"
              icon="vaadin:close-small"
            ></iron-icon>
            <!--            </div>-->
          </div>
          <slot></slot>
        </div>
      </aside>
    `;
  }
}
