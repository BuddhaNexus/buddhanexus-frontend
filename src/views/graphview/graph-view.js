import { customElement, html, LitElement, property } from 'lit-element';

import '@google-web-components/google-chart/google-chart-loader.js';
import '@google-web-components/google-chart/google-chart.js';

import { getDataForGraph } from '../../api/actions';

import sharedDataViewStyles from '../data/data-view-shared.styles';

const GraphViewInfoModalContent = () => html`
  <div>
    Displays a pie-chart of the distribution across collections of all the
    parallels found with current filters. <br />
    The distribution is weighted by length of parallels found.
  </div>
`;

@customElement('graph-view')
export class GraphView extends LitElement {
  @property({ type: String }) fileName;
  @property({ type: Number }) quoteLength;
  @property({ type: Number }) cooccurance;
  @property({ type: Number }) score;
  @property({ type: Array }) targetCollection;

  @property({ type: Array }) pieGraphData;
  @property({ type: Array }) histogramGraphData;
  @property({ type: String }) graphHeight;
  @property({ type: String }) fetchError;
  @property({ type: String }) fetchLoading = true;

  static get styles() {
    return [sharedDataViewStyles];
  }

  async firstUpdated(_changedProperties) {
    super.firstUpdated(_changedProperties);
    this.graphHeight =
      window.innerHeight < 700 ? window.innerHeight * 0.85 + 'px' : '600px';
    await this.fetchData();
  }

  updated(_changedProperties) {
    console.log('graph view updated. ', _changedProperties);
    _changedProperties.forEach(async (oldValue, propName) => {
      if (
        [
          'score',
          'cooccurance',
          'quoteLength',
          'fileName',
          'targetCollection',
        ].includes(propName) &&
        !this.fetchLoading
      ) {
        await this.fetchData();
      }
    });
  }

  async fetchData() {
    if (!this.fileName) {
      this.fetchLoading = false;
      return;
    }
    this.fetchLoading = true;

    const { piegraphdata, histogramgraphdata, error } = await getDataForGraph({
      fileName: this.fileName,
      score: this.score,
      co_occ: this.cooccurance,
      par_length: this.quoteLength,
      target_collection: this.targetCollection,
    });
    let histogramdata = [];
    for (let i = 0; i < histogramgraphdata.length * 0.1; i++) {
      histogramdata.push(histogramgraphdata[i]);
    }
    this.histogramGraphData = histogramdata;
    this.pieGraphData = piegraphdata;
    this.fetchError = error;

    this.fetchLoading = false;
  }

  render() {
    if (this.fetchLoading) {
      return html`
        <bn-loading-spinner></bn-loading-spinner>
      `;
    }

    console.log('rendering graph view');

    return html`
      <data-view-header
        .score="${this.score}"
        .limitCollection="${this.limitCollection}"
        .quoteLength="${this.quoteLength}"
        .cooccurance="${this.cooccurance}"
        .fileName="${this.fileName}"
        .infoModalContent="${GraphViewInfoModalContent()}"
      ></data-view-header>
      <div
        class="pie-wrapper"
        style="height: ${this.graphHeight}; margin-bottom: 24px"
      >
        <google-chart
          id="pie-chart"
          type="pie"
          .cols="${[
            { label: 'Collection', type: 'string' },
            { label: 'Match-lengths', type: 'number' },
          ]}"
          .rows="${this.pieGraphData}"
          .options="${{
            width: window.innerWidth < 1000 ? window.innerWidth : 1000,
            height: window.innerHeight < 700 ? window.innerHeight : 700,
            chartArea: { left: 0, top: 0, width: '85%', height: '85%' },
          }}"
        >
        </google-chart>
      </div>
      <div class="histogram-wrapper" style="height: ${this.graphHeight}">
        <google-chart
          id="histogram-chart"
          type="histogram"
          .cols="${[
            { label: 'Collection', type: 'string' },
            { label: 'Match-lengths', type: 'number' },
          ]}"
          .rows="${this.histogramGraphData}"
          .options="${{
            title: '10% of files with highest match-length',
            legend: { position: 'none' },
            histogram: { lastBucketPercentile: 10 },
            width: window.innerWidth < 1000 ? window.innerWidth : 1000,
            height: window.innerHeight < 700 ? window.innerHeight : 700,
            chartArea: { left: 0, top: 0, width: '85%', height: '75%' },
          }}"
        >
        </google-chart>
      </div>
    `;
  }
}
