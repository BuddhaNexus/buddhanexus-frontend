import { customElement, html, LitElement, css, property } from 'lit-element';
import '@vaadin/vaadin-button/theme/material/vaadin-button';
import '@vaadin/vaadin-dialog/theme/material/vaadin-dialog';
import '@vaadin/vaadin-icons/vaadin-icons.js';

import '../utility/source-link';

import sharedDataViewStyles from '../data/data-view-shared.styles';

function MultiViewHeaderRightColumn({
  isInfoDialogRightOpen,
  setIsInfoDialogRightOpen,
  openDialogRight,
}) {
  //prettier-ignore
  return html`
    <div class="multi-view-header-right">
      <vaadin-dialog
        id="info-multi-view-right"
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

function MultiViewHeaderLeftColumn({
  isInfoDialogLeftOpen,
  setIsInfoDialogLeftOpen,
  openDialogLeft,
}) {
  //prettier-ignore
  return html`
    <vaadin-dialog
      id="info-multi-view-left"
      aria-label="simple"
      .opened="${isInfoDialogLeftOpen}"
      @opened-changed="${setIsInfoDialogLeftOpen}">
      <template>
        <div>
          <p>
            This view shows the original Pāli text in the left column and the english translations.
            The right column shows the translation by our artificial intelligence neural network computer.
            Note: This view is experimental and the translations by the neural network cannot be relied
            upon as actual correct translations.
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

@customElement('multi-view-header')
export class MultiViewHeader extends LitElement {
  @property({ type: String }) fileName;
  @property({ type: Boolean }) displaySCMulti;

  @property({ type: Boolean }) isInfoDialogRightOpen = false;
  @property({ type: Boolean }) isInfoDialogLeftOpen = false;

  static get styles() {
    return [
      sharedDataViewStyles,
      css`
        #multi-view-header {
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
          #multi-view-header {
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
      <div id="multi-view-header">
        <div id="multi-view-header-left">
          <span class="text-name-label">Inquiry Text: </span>
          <formatted-filename .filename="${this.fileName}" .rightside="${'left'}"></formatted-filename>
          ${MultiViewHeaderLeftColumn({
            isInfoDialogLeftOpen: this.isInfoDialogLeftOpen,
            setIsInfoDialogLeftOpen: this.setIsInfoDialogLeftOpen,
            openDialogLeft: this.openDialogLeft
          })}
          <source-link .filename="${this.fileName}"></source-link>
        </div>

        <div>(Beta version) AI Translation</div>

        ${this.displaySCMulti
          ? MultiViewHeaderRightColumn({
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
