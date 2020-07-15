import { customElement, html, LitElement, css, property } from 'lit-element';
import '@vaadin/vaadin-button/theme/material/vaadin-button';
import '@vaadin/vaadin-dialog/theme/material/vaadin-dialog';
import '@vaadin/vaadin-icons/vaadin-icons.js';

import sharedDataViewStyles from '../data/data-view-shared.styles';
import { FormattedFileName } from '../utility/common-components';
import TextViewInfoModalContent from './text-view-modal-content';

function TextViewHeaderRightColumn({
  clickedNewTabButton,
  isInfoDialogRightOpen,
  setIsInfoDialogRightOpen,
  openDialogRight,
  rightFileName,
}) {
  return html`
    <div class="text-view-header-right">
      <vaadin-button
        class="swap-button"
        title="Display this text in a new tab"
        @click="${clickedNewTabButton}"
      >
        <iron-icon
          class="swap-icon"
          icon="vaadin:plus-circle-o"
          slot="prefix"
        ></iron-icon>
      </vaadin-button>

      <vaadin-dialog
        id="info-text-view-right"
        aria-label="simple"
        .opened="${isInfoDialogRightOpen}"
        @opened-changed="${setIsInfoDialogRightOpen}"
      >
        <template>
          <div>
            The currently selected parallel as well as other possible parallels
            that have been detected between the text in the left and the text in
            the right column are highlighted. When clicking on a highlighted
            passage on the right hand side, the corresponding parallel is
            displayed in the middle column and the main text on the left side is
            automatically scrolled to the corresponding position.
          </div>
        </template>
      </vaadin-dialog>

      <vaadin-button class="info-button" @click="${openDialogRight}">
        <iron-icon class="info-icon" icon="vaadin:info-circle-o"></iron-icon>
      </vaadin-button>
      Hit Text ${FormattedFileName({ fileName: rightFileName })}
    </div>
  `;
}

function TextViewHeaderLeftColumn({
  handleScrollUpButtonClicked,
  handleNewTabButtonClicked,
  isInfoDialogLeftOpen,
  setIsInfoDialogLeftOpen,
  openDialogLeft,
}) {
  return html`
    <vaadin-dialog
      id="info-text-view-left"
      aria-label="simple"
      .opened="${isInfoDialogLeftOpen}"
      @opened-changed="${setIsInfoDialogLeftOpen}"
    >
      <template>
        ${TextViewInfoModalContent()}
      </template>
    </vaadin-dialog>

    <vaadin-button class="info-button" @click="${openDialogLeft}">
      <iron-icon class="info-icon" icon="vaadin:info-circle-o"></iron-icon>
    </vaadin-button>

    <vaadin-button
      class="up-button"
      title="Go back to the beginning of the Inquiry Text"
      @click="${handleScrollUpButtonClicked}"
    >
      <iron-icon
        class="swap-icon"
        icon="vaadin:arrow-circle-up-o"
        slot="prefix"
      ></iron-icon>
    </vaadin-button>

    <vaadin-button
      class="up-button"
      title="Display this text in a new tab"
      @click="${handleNewTabButtonClicked}"
    >
      <iron-icon
        class="swap-icon"
        icon="vaadin:plus-circle-o"
        slot="prefix"
      ></iron-icon>
    </vaadin-button>
  `;
}

@customElement('text-view-header')
export class TextViewHeader extends LitElement {
  @property({ type: String }) fileName;
  @property({ type: Array }) limitCollection;
  @property({ type: Number }) quoteLength;
  @property({ type: Number }) cooccurance;
  @property({ type: Number }) score;

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

        .formatted-file-name {
          font-size: 1.05em;
          margin-left: 8px;
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
      `./${this.rightFileName}/${this.rightSegmentName}`,
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

    return html`
      <div id="text-view-header">
        <div id="text-view-header-left">
          <span class="text-name-label">Inquiry Text: </span>
          ${FormattedFileName({ fileName: this.fileName, displayType: 'full' })}
          ${TextViewHeaderLeftColumn({
            handleScrollUpButtonClicked: this.handleScrollUpButtonClicked,
            handleNewTabButtonClicked: this.handleNewTabButtonClicked,
            isInfoDialogLeftOpen: this.isInfoDialogLeftOpen,
            setIsInfoDialogLeftOpen: this.setIsInfoDialogLeftOpen,
            openDialogLeft: this.openDialogLeft,
          })}
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
