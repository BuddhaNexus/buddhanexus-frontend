import { css, customElement, html, LitElement, property } from 'lit-element';

import { getDataForVisual } from '../../api/actions';
import '../utility/LoadingSpinner';
import { getGoogleGraphOptions } from './visualViewUtils';

@customElement('visual-view-graph')
export class VisualViewGraph extends LitElement {
  @property({ type: Array }) graphData;
  @property({ type: String }) language;
  @property({ type: String }) searchItem;
  @property({ type: String }) selectedCollections;
  @property({ type: String }) chartHeight;
  @property({ type: String }) fetchLoading;
  @property({ type: String }) fetchError;

  static get styles() {
    return [
      css`
        #parallels-chart {
          font: 13px sans-serif;
          padding: 30px;
          width: 93vw;
        }
      `,
    ];
  }

  updated(_changedProperties) {
    console.log('visual view updated. ', _changedProperties);
    _changedProperties.forEach((oldValue, propName) => {
      if (
        ['searchItem', 'selectedCollections'].includes(propName) &&
        !this.fetchLoading
      ) {
        this.fetchData();
      }
    });
  }

  async fetchData() {
    if (!this.searchItem) {
      this.fetchLoading = false;
      return;
    }
    this.fetchLoading = true;
    this.language = this.searchItem.split('_')[0];
    const searchTerm = this.searchItem.split('_')[1];

    console.log('visual view: fetching data', this.searchItem);

    const { graphdata, error } = await getDataForVisual({
      searchTerm: searchTerm,
      selected: this.selectedCollections,
      language: this.language,
    });

    // These chartHeight values are just guesses. It might have to be adjusted when more data is loaded.
    // When a good way of dealing with this is found, this function needs clearning up too.
    this.chartHeight = '';
    let heightMultiplyFactor = graphdata.length / window.innerHeight;
    if (heightMultiplyFactor <= 0.5) {
      this.chartHeight = '84vh';
    } else if (heightMultiplyFactor <= 1) {
      this.chartHeight = graphdata.length * heightMultiplyFactor * 3 + 'px';
    } else if (heightMultiplyFactor <= 1.5) {
      this.chartHeight = graphdata.length * heightMultiplyFactor * 2 + 'px';
    } else if (heightMultiplyFactor <= 2) {
      this.chartHeight =
        (graphdata.length * heightMultiplyFactor * 3) / 2 + 'px';
    } else if (heightMultiplyFactor <= 3) {
      this.chartHeight = graphdata.length * heightMultiplyFactor + 'px';
    } else if (heightMultiplyFactor <= 4) {
      this.chartHeight = graphdata.length / 2 + 'px';
    } else if (heightMultiplyFactor <= 5) {
      this.chartHeight = graphdata.length / 2.5 + 'px';
    } else {
      this.chartHeight = '20000px';
    }
    this.graphData = graphdata;
    this.fetchError = error;
    this.fetchLoading = false;
  }

  // When the chart is clicked, the value of it is checked. If is is on the left side (L), it opens when we are
  // in collection-view and shows the files underneath. If we already see the files it opens a new window
  // with the graph-view for that file.
  selectSubCollection(e) {
    let targetItem = e.detail.chart.getSelection()[0].name.split(' ')[0];
    if (targetItem && targetItem.startsWith('L')) {
      this.searchItem = this.language + '_' + targetItem.substring(2);
    } else if (targetItem && !targetItem.startsWith('R')) {
      let win = window.open(
        `../${this.language}/graph/${targetItem}`,
        '_blank'
      );
      win.focus();
    }
  }

  render() {
    if (this.fetchLoading) {
      return html`
        <bn-loading-spinner></bn-loading-spinner>
      `;
    }

    console.log('rendering visual graph view');

    return html`
      <google-chart
        id="parallels-chart"
        type="sankey"
        .cols="${[
          { label: 'From', type: 'string' },
          { label: 'To', type: 'string' },
          { label: 'Weight', type: 'number' },
        ]}"
        style="height: ${this.chartHeight}"
        .rows="${this.graphData}"
        .options="${getGoogleGraphOptions}"
        @google-chart-select="${this.selectSubCollection}"
      >
      </google-chart>
    `;
  }
}
