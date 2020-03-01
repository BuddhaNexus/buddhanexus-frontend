import { customElement, html, css, LitElement, property } from 'lit-element';

import '@google-web-components/google-chart/google-chart.js';

import './visual-view-header';
import './visual-view-graph';

@customElement('visual-view')
export class VisualView extends LitElement {
  @property({ type: String }) searchItem;
  @property({ type: String }) colorScheme;
  @property({ type: Array }) selectedCollections;

  static get styles() {
    return [
      css`
        .visual-view-container {
          display: flex;
          flex-direction: column;
          min-height: 200px;
          align-items: end;
        }

        visual-view-header {
          margin-top: 100px;
          margin-bottom: 32px;
        }

        visual-view-graph {
          margin-bottom: 12px;
          flex: 1;
          display: flex;
          width: 100%;
        }
      `,
    ];
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
      <div class="visual-view-container">
        <visual-view-header
          .setSelection="${this.setSelection}"
          .setColorScheme="${this.setColorScheme}"
        ></visual-view-header>

        <visual-view-graph
          .searchItem="${this.searchItem}"
          .colorScheme="${this.colorScheme}"
          .selectedCollections="${this.selectedCollections}"
          .setSelection="${this.setSelection}"
        >
        </visual-view-graph>
      </div>
    `;
  }
}
