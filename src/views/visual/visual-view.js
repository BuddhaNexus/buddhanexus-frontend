import { customElement, html, LitElement, property } from 'lit-element';

import '@google-web-components/google-chart/google-chart.js';

import './visual-view-header';
import './visual-view-graph';

@customElement('visual-view')
export class VisualView extends LitElement {
  @property({ type: String }) searchItem;
  @property({ type: Array }) selectedCollections;

  setSelection = (searchItem, selectedCollections) => {
    this.searchItem = searchItem;
    this.selectedCollections = selectedCollections;
  };

  render() {
    console.log('rendering visual view');
    return html`
      <visual-view-header
        .setSelection="${this.setSelection}"
      ></visual-view-header>
      <div class="graph-wrapper" style="margin-bottom: 12px">
        <visual-view-graph
          .searchItem="${this.searchItem}"
          .selectedCollections="${this.selectedCollections}"
          .setSelection="${this.setSelection}"
        >
        </visual-view-graph>
      </div>
    `;
  }
}
