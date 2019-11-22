import { customElement, html, LitElement, property } from 'lit-element';

import { getDataForVisual } from '../../api/actions';
import '../utility/LoadingSpinner';
import { getGoogleGraphOptions } from './visualViewUtils';

import styles from './visual-view-graph.styles';

@customElement('visual-view-graph')
export class VisualViewGraph extends LitElement {
  @property({ type: String }) searchItem;
  @property({ type: String }) selectedCollections;
  @property({ type: Number }) pageSize;
  @property({ type: Function }) setSelection;

  @property({ type: Array }) graphData;
  @property({ type: String }) language;
  @property({ type: Number }) currentPage = 0;
  @property({ type: Number }) totalPages;
  @property({ type: String }) chartHeight;
  @property({ type: String }) fetchLoading;
  @property({ type: String }) fetchError;

  static get styles() {
    return [styles];
  }

  updated(_changedProperties) {
    _changedProperties.forEach((oldValue, propName) => {
      if (
        ['searchItem', 'selectedCollections'].includes(propName) &&
        !this.fetchLoading
      ) {
        this.fetchData();
      }

      if (['currentPage'].includes(propName) && !this.fetchLoading) {
        this.adjustChartHeight();
      }
    });
  }

  paginateGraphData(graphData) {
    let paginatedGraphData = [];
    let currentPage = [];
    let alreadyFoundTexts = [];
    let count = 0;
    let entryCount = 0;
    graphData.forEach(entry => {
      currentPage.push(entry);
      entryCount += 1;
      if (!alreadyFoundTexts.includes(entry[0])) {
        alreadyFoundTexts.push(entry[0]);
        count += 1;
      }
      if (count >= this.pageSize || entryCount == graphData.length) {
        paginatedGraphData.push(currentPage);
        currentPage = [];
        count = 0;
      }
    });
    return paginatedGraphData;
  }

  decreaseCurrentPage() {
    if (this.currentPage > 0) {
      this.currentPage -= 1;
    }
  }

  increaseCurrentPage() {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage += 1;
    }
  }

  createPageDisplay() {
    if (this.totalPages <= 1) {
      return;
    }
    let pages = [];
    for (let i = 0; i < this.totalPages; i++) {
      let currentClass = 'element';
      if (i == this.currentPage) {
        currentClass += ' active';
      }
      pages.push(
        html`
          <span
            class="${currentClass}"
            @click="${function() {
              this.currentPage = i;
            }}"
            >${i + 1}</span
          >
        `
      );
    }
    return html`
      <div id="pages-display">
        <div id="inner-pages">
          <span class="element" @click="${this.decreaseCurrentPage}">«</span>
          ${pages}
          <span class="element" @click="${this.increaseCurrentPage}">»</span>
        </div>
      </div>
    `;
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
    this.graphData = this.paginateGraphData(graphdata);
    this.totalPages = this.graphData.length;
    this.adjustChartHeight();
    this.fetchError = error;
    this.fetchLoading = false;
  }

  adjustChartHeight() {
    this.chartHeight = '84vh';
    if (
      this.graphData &&
      this.graphData[this.currentPage] &&
      this.graphData[this.currentPage].length * 2 > 800
    ) {
      this.chartHeight = this.graphData[this.currentPage].length * 2 + 'px';
    }
  }

  // When the chart is clicked, the value of it is checked. If is is on the left side (L), it opens when we are
  // in collection-view and shows the files underneath. If we already see the files it opens a new window
  // with the graph-view for that file.
  selectSubCollection(e) {
    let targetItem = e.detail.chart.getSelection()[0].name.split(' ')[0];
    if (targetItem && targetItem.startsWith('L')) {
      this.setSelection(
        this.language + '_' + targetItem.substring(2),
        this.selectedCollections
      );
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
    if (this.graphData) {
      return html`
        ${this.createPageDisplay()}
        <google-chart
          id="parallels-chart"
          type="sankey"
          .cols="${[
            { label: 'From', type: 'string' },
            { label: 'To', type: 'string' },
            { label: 'Weight', type: 'number' },
          ]}"
          style="height: ${this.chartHeight}"
          .rows="${this.graphData[this.currentPage]}"
          .options="${getGoogleGraphOptions}"
          @google-chart-select="${this.selectSubCollection}"
        >
        </google-chart>
        ${this.createPageDisplay()}
      `;
    }
  }
}
