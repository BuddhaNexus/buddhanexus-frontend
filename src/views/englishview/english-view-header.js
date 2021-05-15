import { customElement, html, LitElement, css, property } from 'lit-element';
import '@vaadin/vaadin-button/theme/material/vaadin-button';
import '@vaadin/vaadin-dialog/theme/material/vaadin-dialog';
import '@vaadin/vaadin-icons/vaadin-icons.js';

import '../utility/source-link';

import sharedDataViewStyles from '../data/data-view-shared.styles';

function EnglishViewHeaderRightColumn({
  isInfoDialogRightOpen,
  setIsInfoDialogRightOpen,
  openDialogRight
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
            Right side SC English.
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
  handleScrollUpButtonClicked,
  isInfoDialogLeftOpen,
  setIsInfoDialogLeftOpen,
  openDialogLeft
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
            Modal content for English View.
          </p>
        </div>
      </template>
    </vaadin-dialog>

    <vaadin-button class="info-button" @click="${openDialogLeft}">
      <iron-icon class="info-icon" icon="vaadin:info-circle-o"></iron-icon>
    </vaadin-button>

    <vaadin-button
      class="up-button"
      title="Go back to the beginning of the Inquiry Text"
      @click="${handleScrollUpButtonClicked}">
      <iron-icon
        class="swap-icon"
        icon="vaadin:arrow-circle-up-o"
        slot="prefix">
      </iron-icon>
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

        .up-button {
          padding: 0;
          left: 10px;
          display: inline-flex;
          min-width: 24px;
          height: 24px;
          margin-left: 12px;
          background-color: transparent;
          cursor: pointer;
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

        .swap-icon {
          color: var(--bn-dark-red);
          margin: 0;
        }

        .swap-button {
          padding: 0;
          right: 16px;
          display: inline-flex;
          min-width: 24px;
          height: 24px;
          totmargin-left: 12px;
          background-color: transparent;
          cursor: pointer;
        }

        @media screen and (max-width: 900px) {
          #english-view-header {
            padding-bottom: 8px;
          }
        }
      `,
    ];
  }

  handleScrollUpButtonClicked() {
    this.dispatchEvent(
      new CustomEvent('reset-left-text', { bubbles: true, composed: true })
    );
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
            handleScrollUpButtonClicked: this.handleScrollUpButtonClicked,
            isInfoDialogLeftOpen: this.isInfoDialogLeftOpen,
            setIsInfoDialogLeftOpen: this.setIsInfoDialogLeftOpen,
            openDialogLeft: this.openDialogLeft
          })}
          <source-link .filename="${this.fileName}"></source-link>
        </div>

        <div>Artifical Intelligence English</div>

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
