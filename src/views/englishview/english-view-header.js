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
    <div class="english-view-header-right">
      <vaadin-dialog
        id="info-english-view-right"
        aria-label="simple"
        .opened="${isInfoDialogRightOpen}"
        @opened-changed="${setIsInfoDialogRightOpen}">
        <template>
          <div>
            <p>The human translations in the right column are sourced from SuttaCentral.net Bilara translation system.</p>
            <p>Translators are Bhikkhu Sujato (Suttas) and Bhikkhu Bhahmali (Vinaya).</p>
          </div>
        </template>
      </vaadin-dialog>

      <vaadin-button class="info-button" @click="${openDialogRight}">
        <iron-icon class="info-icon" icon="vaadin:info-circle-o"></iron-icon>
      </vaadin-button>
      <div style="display: inline-flex">Human Translation</div>
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
            This view shows the original Pali text in the left column and the english translations.
            The right column shows the text by our artificial intelligence neural network computer.
          </p><p>
            In the settings menu there is an option to show the human english translation by
            Bhikkhu Sujato (Suttas) or Bhikkhu Bhahmali (Vinaya) if these exist.
          </p><p>
            Click on any segment to show the matching segment in the other language.
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
  @property({ type: Boolean }) showSCEnglish;

  @property({ type: Boolean }) isInfoDialogRightOpen = false;
  @property({ type: Boolean }) isInfoDialogLeftOpen = false;

  static get styles() {
    return [
      sharedDataViewStyles,
      css`
        #english-view-header {
          padding-bottom: 16px;
          font-weight: bold;
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          text-transform: none;
        }

        .info-icon {
          color: var(--color-text-secondary);
        }

        .text-name-label {
          color: var(--color-text-secondary);
          font-weight: 500;
          font-size: 0.8em;
        }

        vaadin-button {
          background-color: transparent;
          color: var(--color-menu-items);
          font-weight: bold;
          height: 32px;
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

        <div>Artificial Intelligence Translation</div>

        ${this.showSCEnglish
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
