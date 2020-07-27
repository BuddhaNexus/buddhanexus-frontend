import { css, customElement, html, LitElement, property } from 'lit-element';

import '@vaadin/vaadin-button/vaadin-button.js';
import '@vaadin/vaadin-button/theme/material/vaadin-button';
import '@vaadin/vaadin-dialog/theme/material/vaadin-dialog';
import '@vaadin/vaadin-icons/vaadin-icons.js';

import '../utility/formatted-segment';

import { LANGUAGE_CODES } from '../utility/constants';

@customElement('data-view-subheader')
class DataViewSubheader extends LitElement {
  @property({ type: String }) fileName;
  @property({ type: String }) infoModalContent;
  @property({ type: String }) language;

  @property({ type: Boolean }) isDialogOpen = false;

  static get styles() {
    return [
      css`
        .data-view-subheader {
          display: flex;
          align-items: baseline;
          font-weight: bold;
        }

        .info-button {
          padding: 24px;
          cursor: help;
        }

        .info-icon {
          color: var(--color-text-secondary);
        }

        .formatted-file-name {
          font-size: 1.05em;
          margin-left: 8px;
        }

        @media screen and (max-width: 900px) {
          .info-button {
            padding: 12px;
          }
        }

        vaadin-button {
          background-color: transparent;
          color: var(--color-menu-items);
          font-weight: bold;
          height: 32px;
        }

        .text-name-label {
          color: var(--color-text-secondary);
          font-weight: 500;
          font-size: 0.8em;
          display: inline-flex;
        }
      `,
    ];
  }

  openDialog = () => (this.isDialogOpen = true);

  setIsDialogOpen = e => (this.isDialogOpen = e.detail.value);

  render() {
    if (!this.fileName) {
      return html`
        <div class="data-view-subheader">
          Please select a file or input a search query to continue.
        </div>
      `;
    }
    return html`
      <div class="data-view-subheader">
        <div class="text-name-label">Inquiry Text:</div>
        &nbsp;<formatted-filename
          .filename="${this.fileName}"
        ></formatted-filename>
        <vaadin-dialog
          id="info-number-view"
          aria-label="simple"
          .opened="${this.isDialogOpen}"
          @opened-changed="${this.setIsDialogOpen}"
        >
          <template>
            ${this.infoModalContent}
            ${this.language === LANGUAGE_CODES.PALI
              ? html`
                  <p>
                    <strong>NOTE</strong>: For technical reasons, the
                    co-occurances for Pāḷi texts are limited to maximum 50.
                  </p>
                `
              : ''}
          </template>
        </vaadin-dialog>

        <vaadin-button class="info-button" @click="${this.openDialog}">
          <iron-icon class="info-icon" icon="vaadin:info-circle-o"></iron-icon>
        </vaadin-button>
      </div>
    `;
  }
}

export default DataViewSubheader;
