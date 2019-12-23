import { customElement, html, LitElement, property } from 'lit-element';

import '@vaadin/vaadin-button/theme/material/vaadin-button';
import '@vaadin/vaadin-dialog/theme/material/vaadin-dialog';
import '@vaadin/vaadin-icons/vaadin-icons.js';
import '../utility/total-numbers';
import { replaceFileNameForDisplay } from '../utility/preprocessing';

import sharedDataViewStyles from '../data/data-view-shared.styles';
import styles from './text-view.styles';

@customElement('text-view-header')
export class TextViewHeader extends LitElement {
  @property({ type: String }) fileName;
  @property({ type: String }) rightFileName;
  @property({ type: Array }) limitCollection;
  @property({ type: Number }) cooccurance;
  @property({ type: Number }) quoteLength;
  @property({ type: Number }) score;
  @property({ type: Number }) renderSwitchButton;
  @property({ type: Boolean }) isDialogRightOpen = false;

  static get styles() {
    return [sharedDataViewStyles, styles];
  }

  clickedSwitchButton() {
    this.dispatchEvent(
      new CustomEvent('switch-texts', {
        bubbles: true,
        composed: true,
      })
    );
  }

  clickedUpButton() {
    this.dispatchEvent(
      new CustomEvent('reset-left-text', {
        bubbles: true,
        composed: true,
      })
    );
  }

  clickedNewTabLeftButton() {
    let win = window.open(`./${this.fileName}`, '_blank');
    win.focus();
  }

  clickedNewTabButton() {
    let win = window.open(`./${this.rightFileName}`, '_blank');
    win.focus();
  }

  openDialogRight = () => (this.isDialogRightOpen = true);

  setisDialogRightOpen = e => (this.isDialogRightOpen = e.detail.value);

  beginningButton() {
    return html`
      <vaadin-button
        class="up-button"
        title="Go back to the beginning of the Inquiry Text"
        @click="${this.clickedUpButton}"
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
        @click="${this.clickedNewTabLeftButton}"
      >
        <iron-icon
          class="swap-icon"
          icon="vaadin:plus-circle-o"
          slot="prefix"
        ></iron-icon>
      </vaadin-button>
    `;
  }

  // TODO move this to separate component as a constant
  switchButton() {
    return html`
      <vaadin-button
        class="swap-button"
        title="Display this text in the left column"
        @click="${this.clickedSwitchButton}"
      >
        <iron-icon
          class="swap-icon"
          icon="vaadin:arrow-circle-left-o"
          slot="prefix"
        ></iron-icon>
      </vaadin-button>
      <vaadin-button
        class="swap-button"
        title="Display this text in a new tab"
        @click="${this.clickedNewTabButton}"
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
        .opened="${this.isDialogRightOpen}"
        @opened-changed="${this.setisDialogRightOpen}"
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
      <vaadin-button class="info-button" @click="${this.openDialogRight}">
        <iron-icon class="info-icon" icon="vaadin:info-circle-o"></iron-icon>
      </vaadin-button>
      Hit Text ${replaceFileNameForDisplay(this.rightFileName)}
    `;
  }

  render() {
    const renderSwitchButton = !(
      !this.renderSwitchButton || this.rightFileName === ''
    );
    return html`
      <div id="text-view-header">
        <div id="text-view-header-left">
          Inquiry Text
          ${replaceFileNameForDisplay(this.fileName)}${this.beginningButton()}
        </div>
        <div id="text-view-header-middle">Approximate matches</div>
        <div id="text-view-header-right">
          ${renderSwitchButton ? this.switchButton() : null}
        </div>
      </div>
    `;
  }
}
