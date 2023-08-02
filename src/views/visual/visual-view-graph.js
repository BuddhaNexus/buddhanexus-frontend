import { customElement, html, LitElement, property } from 'lit-element';

import { getDataForVisual } from '../../api/actions';
import '../utility/LoadingSpinner';
import {
  getGoogleGraphOptions,
  getGoogleGraphOptionsSource,
  getGoogleGraphOptionsTarget,
} from './visualViewUtils';

import { paginateGraphData, graphDataRemoveLowest } from './graphDataUtils';

import styles from './visual-view-graph.styles';

@customElement('visual-view-graph')
export class VisualViewGraph extends LitElement {
  @property({ type: String }) searchItem = "tib_Kangyur";
  @property({ type: String }) colorScheme = 'Gradient';
  @property({ type: String }) selectedCollections = "tib_Tengyur";
  @property({ type: Function }) setSelection;
  @property({ type: Array }) graphData;
  @property({ type: Array }) setOptions;
  @property({ type: Number }) pageSize = 30;
  @property({ type: Number }) lastPageSize;
  @property({ type: String }) language = "tib";
  @property({ type: String }) targetItem;
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
      if (propName === 'currentPage' && !this.fetchLoading) {
        this.adjustChartHeight();
      }
      if (propName === 'colorScheme') {
        this.changeColorScheme();
      }
    });
  }

  changeColorScheme() {
    switch (this.colorScheme) {
      case 'Inquiry Collection':
        this.setOptions = getGoogleGraphOptionsSource;
        break;
      case 'Hit Collection':
        this.setOptions = getGoogleGraphOptionsTarget;
        break;
      default:
        this.setOptions = getGoogleGraphOptions;
    }
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
      //prettier-ignore
      pages.push(
        html`<span class="${currentClass}" @click="${() => (this.currentPage = i)}">${i + 1}</span>`
      );
    }
    //prettier-ignore
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
    this.currentPage = 0;
    this.fetchLoading = true;
    this.language = this.searchItem.split('_')[0];
    let searchTerm = this.searchItem
      .split('_')
      .slice(1)
      .join('_');
    console.log('searchTerm', searchTerm);
    console.log('selectedCollections', this.selectedCollections);
    console.log('language', this.language);

    let { graphdata, error } = await getDataForVisual({
      searchTerm: searchTerm,
      selected: this.selectedCollections,
      language: this.language,
    });
    console.log("graphdata", graphdata)

    let paginatedData = paginateGraphData(graphdata, this.pageSize);
    this.graphData = paginatedData[0];
    this.lastPageSize = paginatedData[1];
    this.graphData = graphDataRemoveLowest(this.graphData);
    this.totalPages = this.graphData.length;
    this.adjustChartHeight();
    this.fetchError = error;
    this.fetchLoading = false;
  }

  adjustChartHeight() {
    this.chartHeight = '84vh';
    if (!this.graphData || !this.graphData[this.currentPage]) {
      return;
    }

    // calculating the number of items on the right and the left of the chart
    let leftPageSize = this.pageSize;
    if (this.currentPage + 1 === this.graphData.length) {
      leftPageSize = this.lastPageSize;
    }
    let rightPageSize = this.graphData[this.currentPage].length / leftPageSize;

    let cutoffFactor = this.language === 'pli' ? this.pageSize : 10;

    // calculating graphheight based on pagesize.
    let factor;
    let windowHeight = window.innerHeight - 200;
    if (rightPageSize > cutoffFactor && rightPageSize >= leftPageSize) {
      factor = (windowHeight * rightPageSize) / cutoffFactor;
    } else if (leftPageSize > cutoffFactor) {
      factor = (windowHeight * leftPageSize) / cutoffFactor;
    } else {
      factor = windowHeight;
    }
    this.chartHeight = factor + 'px';
  }

  // When the chart is clicked, the value of it is checked. If is is on the left side, it opens when we are
  // in collection-view and shows the files underneath. If we already see the files it opens a new window
  // with the text-view for that file.
  selectSubCollection(e) {
    if (!e.detail.chart.getSelection()[0]) {
      return;
    }

    let targetItem = e.detail.chart.getSelection()[0].name;
    if (!targetItem || targetItem.match(/_\(/)) {
      return;
    }
    const selectedTarget = targetItem.match(/ \((.*?)\)/);
    const setSelectionTarget = selectedTarget ? selectedTarget[1] : targetItem;
    if (targetItem === this.targetItem) {
      let win = window.open(
        `../${this.language}/text/${setSelectionTarget}`,
        '_blank'
      );
      win.focus();
      return;
    }
    this.targetItem = targetItem;
    this.setSelection(
      this.language + '_' + setSelectionTarget,
      this.selectedCollections
    );
  }

  render() {
    if (this.fetchLoading) {
      return html`
        <bn-loading-spinner></bn-loading-spinner>
      `;
    }
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
          style="height: ${this.chartHeight}; width: 100%"
          .rows="${this.graphData[this.currentPage]}"
          .options="${this.setOptions}"
          @google-chart-select="${this.selectSubCollection}"
        >
        </google-chart>
        ${this.createPageDisplay()}
      `;
    }
  }
}
