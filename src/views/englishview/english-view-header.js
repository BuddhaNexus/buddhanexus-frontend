import { customElement, html, LitElement, css, property } from 'lit-element';
import '@vaadin/vaadin-button/theme/material/vaadin-button';
import '@vaadin/vaadin-dialog/theme/material/vaadin-dialog';
import '@vaadin/vaadin-icons/vaadin-icons.js';

import '../utility/source-link';

import sharedDataViewStyles from '../data/data-view-shared.styles';

function EnglishViewHeaderRightColumn({
  isInfoDialogRightOpen,
  setIsInfoDialogRightOpen,
  openDialogRight,
}) {
  //prettier-ignore
  return html`
    <div id="english-view-header-right">
      <vaadin-dialog
        id="info-english-view-right"
        aria-label="simple"
        .opened="${isInfoDialogRightOpen}"
        @opened-changed="${setIsInfoDialogRightOpen}">
        <template>
          <div>
            <p>The English translation by Bhikkhu Sujato (Suttas) or Bhikkhu Bhahmali (Vinaya)
            is displayed in the right column. These are sourced from the
            SuttaCentral JSON-based segmented texts (Bilara).</p>
          </div>
        </template>
      </vaadin-dialog>

      <vaadin-button class="info-button" @click="${openDialogRight}">
        <iron-icon class="info-icon" icon="vaadin:info-circle-o"></iron-icon>
      </vaadin-button>
      <div style="display: inline-flex">SuttaCentral Translation</div>
    </div>
  `;
}

function EnglishViewHeaderLeftColumn({
  isInfoDialogLeftOpen,
  setIsInfoDialogLeftOpen,
  openDialogLeft,
}) {
  //prettier-ignore
  return html`
    <vaadin-dialog
      id="info-english-view-left"
      aria-label="simple"
      .opened="${isInfoDialogLeftOpen}"
      @opened-changed="${setIsInfoDialogLeftOpen}">
      <template>
        <div>
          <p>
            This view displays the original Pāli text in the left column together with a machine
            translation into English created by the Transformer machine learning model (TML).
          </p><p>Note: This view is experimental and the translations by the TML model cannot be relied
            upon as actual correct translations.
          </p><p>
            Additionally, an English translation by Bhikkhu Sujato (Suttas) or Bhikkhu Bhahmali (Vinaya),
            if this exists, is also offered. See the options in the Settings menu.
          </p><p>
            Click on any segment to show the matching segment in the other columns.
          </p>
        </div>
      </template>
    </vaadin-dialog>

    <vaadin-button class="info-button" @click="${openDialogLeft}">
      <iron-icon class="info-icon" icon="vaadin:info-circle-o"></iron-icon>
    </vaadin-button>
  `;
}

@customElement('english-view-header')
export class EnglishViewHeader extends LitElement {
  @property({ type: String }) fileName;
  @property({ type: Boolean }) displaySCEnglish;

  @property({ type: Boolean }) isInfoDialogRightOpen = false;
  @property({ type: Boolean }) isInfoDialogLeftOpen = false;

  static get styles() {
    return [
      sharedDataViewStyles,
      css`
        #english-view-header {
          padding: 8px 0 16px 0;
          font-weight: bold;
          display: flex;
          align-items: center;
          justify-content: space-between;
          text-transform: none;
        }

        #english-view-header-left,
        #info-english-view-left,
        #english-view-header-right {
          display: inline-flex;
          align-items: center;
        }

        .info-button {
          padding: 0;
          left: 10px;
          min-width: 24px;
          height: 24px;
          margin: 0 24px 0 12px;
          background-color: transparent;
          cursor: help;
        }

        .info-icon {
          color: var(--color-text-secondary);
        }

        .text-name-label {
          display: inline-flex;
          color: var(--color-text-secondary);
          font-weight: 500;
          font-size: 0.8em;
        }

        vaadin-button {
          background-color: transparent;
          color: var(--color-menu-items);
          font-weight: bold;
          height: 32px;
          display: inline-flex;
        }

        @media screen and (max-width: 900px) {
          #english-view-header {
            padding-bottom: 8px;
          }
        }
      `,
    ];
  }

  openDialogRight = () => (this.isInfoDialogRightOpen = true);

  openDialogLeft = () => (this.isInfoDialogLeftOpen = true);

  setIsInfoDialogRightOpen = e => (this.isInfoDialogRightOpen = e.detail.value);

  setIsInfoDialogLeftOpen = e => (this.isInfoDialogLeftOpen = e.detail.value);

  render() {
    //prettier-ignore
    return html`
      <div id="english-view-header">
        <div id="english-view-header-left">
          <span class="text-name-label">Inquiry Text: </span>
          <formatted-filename .filename="${this.fileName}" .rightside="${'left'}"></formatted-filename>
          ${EnglishViewHeaderLeftColumn({
            isInfoDialogLeftOpen: this.isInfoDialogLeftOpen,
            setIsInfoDialogLeftOpen: this.setIsInfoDialogLeftOpen,
            openDialogLeft: this.openDialogLeft
          })}
          <source-link .filename="${this.fileName}"></source-link>
        </div>

        <div>(Beta version) TML Translation</div>

        ${this.displaySCEnglish
          ? EnglishViewHeaderRightColumn({
              isInfoDialogRightOpen: this.isInfoDialogRightOpen,
              openDialogRight: this.openDialogRight,
              setIsInfoDialogRightOpen: this.setIsInfoDialogRightOpen,
              fileName: this.fileName,
            })
          : null}
      </div>
    `;
  }
}
