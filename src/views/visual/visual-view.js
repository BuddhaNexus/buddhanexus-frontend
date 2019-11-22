import { customElement, html, LitElement, property } from 'lit-element';

import '@google-web-components/google-chart/google-chart.js';

import './visual-view-header';
import './visual-view-graph';

@customElement('visual-view')
export class VisualView extends LitElement {
  @property({ type: String }) searchItem;
  @property({ type: Array }) selectedCollections;
  @property({ type: Number }) pageSize = 100;
  async firstUpdated(_changedProperties) {
    super.firstUpdated(_changedProperties);
  }
  setPageSize = pageSize => {
    this.pageSize = pageSize;
  };
  setSelection = (searchItem, selectedCollections) => {
    (this.searchItem = searchItem),
      (this.selectedCollections = selectedCollections);
  };

  render() {
    console.log('rendering visual view');
    return html`
      <visual-view-header
        .setSelection="${this.setSelection}"
        .setPageSize="${this.setPageSize}"
      ></visual-view-header>
      <div class="graph-wrapper">
        <visual-view-graph
          .searchItem="${this.searchItem}"
          .selectedCollections="${this.selectedCollections}"
          .pageSize="${this.pageSize}"
        >
        </visual-view-graph>
      </div>
    `;
  }
}
