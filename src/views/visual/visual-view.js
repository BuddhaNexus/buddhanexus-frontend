import { customElement, html, css, LitElement, property } from 'lit-element';

import '@google-web-components/google-chart/google-chart.js';

import './visual-view-header';
import './visual-view-graph';
import './visual-view-selection-box';

@customElement('visual-view')
export class VisualView extends LitElement {
  @property({ type: String }) searchItem;
    @property({ type: String }) colorScheme;
      @property({ type: String }) activeLanguage;
  @property({ type: Array }) selectedCollections;

  static get styles() {
    return [
      css`
        :host {
          width: 100%;
        }

        .visual-view-container {
          display: flex;
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
	if(window.globalLang){
	    this.activeLanguage = window.globalLang;
	}
    }
  setSelection = (searchItem, selectedCollections) => {
    this.searchItem = searchItem;
    this.selectedCollections = selectedCollections;
  };

  setColorScheme = colorScheme => {
    this.colorScheme = colorScheme;
  };

  render() {
    return html`
${this.activeLanguage
            ? null : html`<visual-view-selection-box></visual-view-selection-box>`}
      <div class="visual-view-container">
        <visual-view-header
          .setSelection="${this.setSelection}"
          .setColorScheme="${this.setColorScheme}"
          .activeLanguage="${this.activeLanguage}"
          ></visual-view-header>



        <visual-view-graph
          .searchItem="${this.searchItem}"
          .colorScheme="${this.colorScheme}"
          .selectedCollections="${this.selectedCollections}"
          .setSelection="${this.setSelection}"
        >
        </visual-view-graph>
      </div>
	  `
  }
  
}
