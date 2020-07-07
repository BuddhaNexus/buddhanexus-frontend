import { customElement, html, LitElement, property } from 'lit-element';

import '@google-web-components/google-chart/google-chart-loader.js';
import '@google-web-components/google-chart/google-chart.js';

import { getDataForGraph } from '../../api/actions';
import { getLanguageFromFilename } from '../utility/views-common';

import sharedDataViewStyles from '../data/data-view-shared.styles';
import styles from './graph-view.styles';

const GraphViewInfoModalContent = () => html`
  <div>
    <p>
      Displays a pie-chart of the distribution across collections of all the
      parallels found with current filters.
    </p>
    <p>The distribution is weighted by length of parallels found.</p>
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
  @property({ type: String }) lang;
  @property({ type: String }) fetchError;
  @property({ type: String }) fetchLoading = true;
  @property({ type: Boolean }) isDialogOpen = false;

  static get styles() {
    return [styles, sharedDataViewStyles];
  }

  async firstUpdated(_changedProperties) {
    super.firstUpdated(_changedProperties);
    this.graphHeight =
      window.innerHeight < 700 ? window.innerHeight * 0.8 + 'px' : '500px';
    this.lang = getLanguageFromFilename(this.fileName);
    await this.fetchData();
  }

  updated(_changedProperties) {
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
    for (let i = 0; i < Math.min(50, histogramgraphdata.length); i++) {
      histogramdata.push(histogramgraphdata[i]);
    }
    this.histogramGraphData = histogramdata;
    this.pieGraphData = piegraphdata;
    this.fetchError = error;

    this.fetchLoading = false;
  }

  // TODO: refactor the header for the histogram into it's own element.
  openDialog = () => (this.isDialogOpen = true);

  setIsDialogOpen = e => (this.isDialogOpen = e.detail.value);

  render() {
    if (this.fetchLoading) {
      return html`
        <bn-loading-spinner></bn-loading-spinner>
      `;
    }

    return html`
      <div
        class="graph-container"
        style="height: ${window.innerHeight * 1.7}px"
      >
        <data-view-subheader
          .fileName="${this.fileName}"
          .language="${this.lang}"
          .infoModalContent="${GraphViewInfoModalContent()}"
        ></data-view-subheader>

        <div id="pie-wrapper" style="height: ${this.graphHeight}">
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
              height: window.innerHeight < 700 ? window.innerHeight * 0.7 : 500,
              chartArea: { left: 0, top: 0, width: '100%', height: '100%' },
              is3D: true,
              backgroundColor: '#ffeed4',
            }}"
          >
          </google-chart>
        </div>

        <div id="histogram-title">
          Distribution of the top files that have matches with the Inquiry Text
          <vaadin-dialog
            id="info-histogram"
            aria-label="simple"
            .opened="${this.isDialogOpen}"
            @opened-changed="${this.setIsDialogOpen}"
          >
            <template>
              The distribution of the top files that have matches with the
              Inquiry Text is displayed based on the accumulated length of the
              approximate matches.<br />
              A maximum of 50 hit texts are shown.
            </template>
          </vaadin-dialog>
          <vaadin-button class="info-button" @click="${this.openDialog}">
            <iron-icon
              class="info-icon"
              icon="vaadin:info-circle-o"
            ></iron-icon>
          </vaadin-button>
        </div>

        <div id="histogram-wrapper" style="height: ${this.graphHeight}">
          <google-chart
            id="histogram-chart"
            type="histogram"
            .cols="${[
              { label: 'Collection', type: 'string' },
              { label: 'Match-lengths', type: 'number' },
            ]}"
            .rows="${this.histogramGraphData}"
            .options="${{
              maxNumBuckets: 10,
              width: window.innerWidth < 1000 ? window.innerWidth : 1000,
              height:
                window.innerHeight < 700
                  ? window.innerHeight * 0.65
                  : window.innerHeight * 0.8,
              chartArea: { left: 0, top: 0, width: '100%', height: '90%' },
              backgroundColor: '#ffeed4',
            }}"
          >
          </google-chart>
        </div>
      </div>
    `;
  }
}
