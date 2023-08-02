import { customElement, html, css, LitElement, property } from 'lit-element';

import '@google-web-components/google-chart/google-chart.js';
import { switchNavbarVisibility } from '../utility/utils';

import './visual-view-header';
import './visual-view-graph';
import './visual-view-selection-box';

@customElement('visual-view')
export class VisualView extends LitElement {
  @property({ type: String }) searchItem = 'tib_Kangyur';
  @property({ type: String }) colorScheme;
  @property({ type: String }) activeLanguage = "tib";
  @property({ type: Array }) selectedCollections = ['tib_Tengyur'];
  @property({ type: String }) headerVisibility = '';

  static get styles() {
    return [
      css`
        :host {
          width: 100%;
          height: calc(100vh - var(--header-height));
        }

        .visual-view-container {
          flex-direction: column;
          min-height: 200px;
          align-items: flex-start;
          padding: 32px;
        }

        visual-view-header {
          margin-bottom: 32px;
        }

        visual-view-graph {
          margin-bottom: 12px;
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
        }
      `,
    ];
  }

  firstUpdated() {
    this.activeLanguage = this.location.params.lang;
  }

  setSelection = (searchItem, selectedCollections) => {
    this.searchItem = searchItem;
    this.selectedCollections = selectedCollections;
  };

  setColorScheme = colorScheme => {
    this.colorScheme = colorScheme;
  };

  setDisplay() {
    return this.activeLanguage ? 'display: flex' : 'display: none';
  }

  toggleNavBar = () => {
    if (this.headerVisibility === '') {
      this.headerVisibility = 'no-header';
      this.classList.add('no-header');
      switchNavbarVisibility(false);
    } else {
      this.headerVisibility = '';
      this.classList.remove('no-header');
      switchNavbarVisibility(true);
    }
  };

  render() {
    //prettier-ignore
    return html`
      ${!this.activeLanguage
        ? html`
            <visual-view-selection-box></visual-view-selection-box>
          `
        : null}
        <visual-view-graph
          .searchItem="${this.searchItem}"
          .colorScheme="${this.colorScheme}"
          .selectedCollections="${this.selectedCollections}"
          .setSelection="${this.setSelection}">
        </visual-view-graph>
      </div>
    `;
  }
}
