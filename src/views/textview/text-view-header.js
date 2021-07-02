import { customElement, html, LitElement, css, property } from 'lit-element';
import '@vaadin/vaadin-button/theme/material/vaadin-button';
import '@vaadin/vaadin-dialog/theme/material/vaadin-dialog';
import '@vaadin/vaadin-icons/vaadin-icons.js';

import '../utility/formatted-segment';
import '../utility/source-link';
import { getLanguageFromFilename } from '../utility/views-common';
import TextViewInfoModalContent from './text-view-modal-content';

import sharedDataViewStyles from '../data/data-view-shared.styles';

function TextViewHeaderRightColumn({
  clickedNewTabButton,
  isInfoDialogRightOpen,
  setIsInfoDialogRightOpen,
  openDialogRight,
  rightFileName,
}) {
  //prettier-ignore
  return html`
    <div class="text-view-header-right">
      <vaadin-button
        class="swap-button"
        title="Display this text in a new tab"
        @click="${clickedNewTabButton}">
        <iron-icon
          class="swap-icon"
          icon="vaadin:external-browser"
          slot="prefix">
        </iron-icon>
      </vaadin-button>

      <vaadin-dialog
        id="info-text-view-right"
        aria-label="simple"
        .opened="${isInfoDialogRightOpen}"
        @opened-changed="${setIsInfoDialogRightOpen}">
        <template>
          <div>
            The currently selected match as well as other matches that have been
            detected between the Inquiry and the Hit Texts are coloured. The
            selected match is highlighted. When clicking on a coloured passage
            in the Hit Text, the corresponding parallel will be displayed in the
            middle column. Upon clicking on it, the Inquiry Text is
            automatically scrolled to the corresponding position in the Inquiry
            Text. For the identity of the Hit Text place the cursor on its
            catalogue number.
          </div>
        </template>
      </vaadin-dialog>

      <vaadin-button class="info-button" @click="${openDialogRight}">
        <iron-icon class="info-icon" icon="vaadin:info-circle-o"></iron-icon>
      </vaadin-button>
      <span class="text-name-label">Hit Text: </span>
      <formatted-filename .filename="${rightFileName}" .rightside="${'right'}"></formatted-filename>
    </div>
  `;
}

function TextViewHeaderLeftColumn({
  handleScrollUpButtonClicked,
  handleNewTabButtonClicked,
  isInfoDialogLeftOpen,
  setIsInfoDialogLeftOpen,
  openDialogLeft,
  language,
}) {
  //prettier-ignore
  return html`
    <vaadin-dialog
      id="info-text-view-left"
      aria-label="simple"
      .opened="${isInfoDialogLeftOpen}"
      @opened-changed="${setIsInfoDialogLeftOpen}">
      <template>
        ${TextViewInfoModalContent(language)}
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

    <vaadin-button
      class="up-button"
      title="Display this text in a new tab"
      @click="${handleNewTabButtonClicked}">
      <iron-icon
        class="swap-icon"
        icon="vaadin:external-browser"
        slot="prefix">
      </iron-icon>
    </vaadin-button>
  `;
}

@customElement('text-view-header')
export class TextViewHeader extends LitElement {
  @property({ type: String }) fileName;
  @property({ type: String }) lang;

  @property({ type: String }) rightFileName;
  @property({ type: Object }) rightSegmentName;
  @property({ type: Number }) renderSwitchButton;
  @property({ type: Boolean }) isInfoDialogRightOpen = false;
  @property({ type: Boolean }) isInfoDialogLeftOpen = false;
  @property({ type: Boolean }) renderMiddleTextLabel = false;

  static get styles() {
    return [
      sharedDataViewStyles,
      css`
        #text-view-header {
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
          #text-view-header {
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

  handleNewTabButtonClicked() {
    window.open(`./${this.fileName}`, '_blank').focus();
  }

  handleRightTextNewTabButtonClicked() {
    const win = window.open(
      // This is a hack because dots in the segmentnumber are not accepted in the routing.
      //prettier-ignore
      `../../${getLanguageFromFilename(this.rightFileName)}/text/${this.rightFileName}/${this.rightSegmentName.replace(/\./g, '@')}`,
      '_blank'
    );
    win.focus();
  }

  openDialogRight = () => (this.isInfoDialogRightOpen = true);

  openDialogLeft = () => (this.isInfoDialogLeftOpen = true);

  setIsInfoDialogRightOpen = e => (this.isInfoDialogRightOpen = e.detail.value);

  setIsInfoDialogLeftOpen = e => (this.isInfoDialogLeftOpen = e.detail.value);

  render() {
    const renderSwitchButton =
      this.renderSwitchButton && this.rightFileName !== '';

    //prettier-ignore
    return html`
      <div id="text-view-header">
        <div id="text-view-header-left">
          <span class="text-name-label">Inquiry Text: </span>
          <formatted-filename .filename="${this.fileName}" .rightside="${'left'}"></formatted-filename>
          ${TextViewHeaderLeftColumn({
            handleScrollUpButtonClicked: this.handleScrollUpButtonClicked,
            handleNewTabButtonClicked: this.handleNewTabButtonClicked,
            isInfoDialogLeftOpen: this.isInfoDialogLeftOpen,
            setIsInfoDialogLeftOpen: this.setIsInfoDialogLeftOpen,
            openDialogLeft: this.openDialogLeft,
            language: this.lang,
          })}
          <source-link .filename="${this.fileName}"></source-link>
        </div>

        ${this.renderMiddleTextLabel
          ? html`
              <div>Approximate matches</div>
            `
          : null}
        ${renderSwitchButton
          ? TextViewHeaderRightColumn({
              clickedNewTabButton: this.handleRightTextNewTabButtonClicked,
              isInfoDialogRightOpen: this.isInfoDialogRightOpen,
              openDialogRight: this.openDialogRight,
              setIsInfoDialogRightOpen: this.setIsInfoDialogRightOpen,
              rightFileName: this.rightFileName,
            })
          : null}
      </div>
    `;
  }
}
