import { css, customElement, html, LitElement, property } from 'lit-element';

import '@vaadin/vaadin-button/vaadin-button.js';
import '@vaadin/vaadin-button/theme/material/vaadin-button';
import '@vaadin/vaadin-dialog/theme/material/vaadin-dialog';
import '@vaadin/vaadin-icons/vaadin-icons.js';

import '../utility/total-numbers';

@customElement('data-view-header')
class DataViewHeader extends LitElement {
  @property({ type: String }) fileName;
  @property({ type: Array }) limitCollection;
  @property({ type: Number }) quoteLength;
  @property({ type: Number }) cooccurance;
  @property({ type: Number }) score;
  @property({ type: String }) infoModalContent;
  @property({ type: String }) language;

  @property({ type: Boolean }) isDialogOpen = false;

  static get styles() {
    return [
      css`
        .data-view-header {
          margin-top: 16px;
          margin-bottom: 16px;
          display: flex;
          align-items: baseline;
        }

        .info-button {
          padding: 0;
          min-width: 24px;
          height: 24px;
          margin-left: 12px;
          background-color: white;
          cursor: pointer;
        }

        vaadin-button {
          background-color: #0031ca;
          color: rgba(0, 0, 0, 0.54);
          font-weight: bold;
          height: 32px;
        }
      `,
    ];
  }

  openDialog = () => (this.isDialogOpen = true);

  setIsDialogOpen = e => (this.isDialogOpen = e.detail.value);

  render() {
    if (!this.fileName) {
      return html`
        <div class="data-view-header">Please select a file to view.</div>
      `;
    }
    return html`
      <div class="data-view-header">
        <show-total-numbers
          id="total-numbers"
          .fileName="${this.fileName}"
          .score="${this.score}"
          .limitCollection="${this.limitCollection}"
          .quoteLength="${this.quoteLength}"
          .cooccurance="${this.cooccurance}"
        ></show-total-numbers>
        <vaadin-dialog
          id="info-number-view"
          aria-label="simple"
          .opened="${this.isDialogOpen}"
          @opened-changed="${this.setIsDialogOpen}"
        >
          <template>
            ${this.infoModalContent}
            ${this.language === 'pli'
              ? html`
                  <p>
                    <strong>NOTE</strong>: For technical reasons, the
                    co-occurances for Pāḷi texts are limited to maximum 50.
                  </p>
                `
              : ``}
          </template>
        </vaadin-dialog>
        <vaadin-button class="info-button" @click="${this.openDialog}">
          <iron-icon class="info-icon" icon="vaadin:info-circle-o"></iron-icon>
        </vaadin-button>
      </div>
    `;
  }
}

export default DataViewHeader;
