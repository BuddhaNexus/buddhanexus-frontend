import { customElement, html, LitElement, property } from 'lit-element';

import styles from './text-view-table.styles';
import sharedDataViewStyles from '../data/data-view-shared.styles';

@customElement('text-view-table')
export default class TextViewTable extends LitElement {
  @property({ type: String }) lang;
  @property({ type: String }) fileName;
  @property({ type: Object }) leftTextData;
  @property({ type: Object }) middleData = {};
  @property({ type: Object }) rightTextData;
  @property({ type: String }) rightFileName = '';
  @property({ type: Number }) score;
  @property({ type: Array }) limitCollection;
  @property({ type: Number }) quoteLength;
  @property({ type: Number }) cooccurance;
  @property({ type: String }) leftActiveSegment = 'none';

  @property({ type: Function }) toggleMiddleData;
  @property({ type: Function }) highlightLeftAfterScrolling;
  @property({ type: Function }) handleMouseOver;
  @property({ type: Function }) handleParallelClicked;

  static get styles() {
    return [styles, sharedDataViewStyles];
  }

  render() {
    return html`
      <vaadin-split-layout>
        <div class="left-text-column">
          <text-view-left
            id="text-view-left"
            lang="${this.lang}"
            .fileName="${this.fileName}"
            .leftTextData="${this.leftTextData}"
            .score="${this.score}"
            .limitCollection="${this.limitCollection}"
            .quoteLength="${this.quoteLength}"
            .cooccurance="${this.cooccurance}"
            .leftActiveSegment="${this.leftActiveSegment}"
            @active-segment-changed="${this.toggleMiddleData}"
            @highlight-left-after-scrolling="${this
              .highlightLeftAfterScrolling}"
          ></text-view-left>
        </div>

        <div class="middle-right-texts-container">
          <vaadin-split-layout>
            <div class="middle-text-column">
              <text-view-middle
                id="text-view-middle"
                lang="${this.lang}"
                .score="${this.score}"
                .fileName="${this.fileName}"
                .quoteLength="${this.quoteLength}"
                .cooccurance="${this.cooccurance}"
                .data="${this.middleData}"
                @mouseover-parallel="${this.handleMouseOver}"
                @click-parallel="${this.handleParallelClicked}"
              ></text-view-middle>
            </div>

            <div class="right-text-column">
              ${this.rightFileName
                ? html`
                    <text-view-right
                      id="text-view-right"
                      lang="${this.lang}"
                      .fileName="${this.fileName}"
                      .rightFileName="${this.rightFileName}"
                      .rightTextData="${this.rightTextData}"
                      .score="${this.score}"
                      .limitCollection="${this.limitCollection}"
                      .quoteLength="${this.quoteLength}"
                      .cooccurance="${this.cooccurance}"
                      @active-segment-changed="${this.toggleMiddleData}"
                    ></text-view-right>
                  `
                : html`
                    <p>
                      Click on a match in the middle column in order to display
                      the full Hit Text here.
                    </p>
                  `}
            </div>
          </vaadin-split-layout>
        </div>
      </vaadin-split-layout>
    `;
  }
}
