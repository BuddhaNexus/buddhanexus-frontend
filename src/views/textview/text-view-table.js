import { customElement, html, LitElement, property } from 'lit-element';

import styles from './text-view-table.styles';

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
  // todo find out what this is
  @property({ type: String }) textSwitchedFlag = false;
  @property({ type: String }) leftActiveSegment = 'none';

  @property({ type: Function }) toggleMiddleData;
  @property({ type: Function }) highlightLeftAfterScrolling;
  @property({ type: Function }) updateParallelCount;
  @property({ type: Function }) handleMouseOver;
  @property({ type: Function }) updateText;

  static get styles() {
    return [styles];
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
            .textSwitchedFlag="${this.textSwitchedFlag}"
            @active-segment-changed="${this.toggleMiddleData}"
            @highlight-left-after-scrolling="${this
              .highlightLeftAfterScrolling}"
            @update-parallel-count="${this.updateParallelCount}"
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
                @click-parallel="${this.updateText}"
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
                    <p style="margin-top:0">
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
