import { customElement, html, LitElement, property } from 'lit-element';

import '@google-web-components/google-chart/google-chart.js';

import './visual-view-header';
import './visual-view-graph';

@customElement('visual-view')
export class VisualView extends LitElement {
  @property({ type: String }) searchItem;
  @property({ type: String }) colorScheme;
  @property({ type: Array }) selectedCollections;

  setSelection = (searchItem, selectedCollections) => {
    this.searchItem = searchItem;
    this.selectedCollections = selectedCollections;
  };

  setColorScheme = colorScheme => {
    this.colorScheme = colorScheme;
  };

  render() {
    return html`
      <visual-view-header
        .setSelection="${this.setSelection}"
        .setColorScheme="${this.setColorScheme}"
      ></visual-view-header>
      <div class="graph-wrapper" style="margin-bottom: 12px">
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
