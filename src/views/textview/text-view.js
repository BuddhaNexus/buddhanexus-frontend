import { customElement, html, LitElement, property } from 'lit-element';

import '@vaadin/vaadin-split-layout/theme/material/vaadin-split-layout';

import './text-view-search';
import './text-view-header';
import './text-view-left';
import './text-view-middle';
import './text-view-right';
import { getLanguageFromFilename } from '../utility/views-common';

import sharedDataViewStyles from '../data/data-view-shared.styles';
import styles from './text-view.styles';

const TextViewInfoModalContent = () => html`
  <div>
    <p>
      The color coding of the syllables in the Inquiry Text on the left side
      indicates how many approximate matches are to be encountered at a certain
      syllable according to the current filter settings.
    </p>
    <table style="width:50%" align="left">
      <tr>
        <th>Number of approximate matches</th>
        <th>Color</th>
      </tr>
      <tr>
        <th>0</th>
        <th bgcolor="#000000"></th>
      </tr>

      <tr>
        <th>1</th>
        <th bgcolor="#0CC0E8"></th>
      </tr>
      <tr>
        <th>2</th>
        <th bgcolor="#0039FF"></th>
      </tr>
      <tr>
        <th>3</th>
        <th bgcolor="#610CE8"></th>
      </tr>
      <tr>
        <th>4</th>
        <th bgcolor="#AA00FF"></th>
      </tr>
      <tr>
        <th>5</th>
        <th bgcolor="#DC0CE8"></th>
      </tr>
      <tr>
        <th>6</th>
        <th bgcolor="#FF0093"></th>
      </tr>
      <tr>
        <th>7</th>
        <th bgcolor="#E80C0C"></th>
      </tr>
      <tr>
        <th>8</th>
        <th bgcolor="#FF2A00"></th>
      </tr>
      <tr>
        <th>9</th>
        <th bgcolor="#E8550C"></th>
      </tr>
      <tr>
        <th>10 or more</th>
        <th bgcolor="#FF860D"></th>
      </tr>
      <tr>
        <th></th>
        <th></th>
      </tr>
    </table>
  </div>
`;

@customElement('text-view')
export class TextView extends LitElement {
  @property({ type: String }) fileName;
  @property({ type: String }) leftActiveSegment = 'none';
  @property({ type: Array }) limitCollection;
  @property({ type: Number }) quoteLength;
  @property({ type: Number }) cooccurance;
  @property({ type: Number }) score;
  @property({ type: String }) searchString;

  @property({ type: String }) rightFileName = '';
  @property({ type: Object }) rightTextData;
  @property({ type: Object }) middleData = {};
  @property({ type: Object }) leftTextData;
  @property({ type: String }) lang;

  static get styles() {
    return [sharedDataViewStyles, styles];
  }

  updated(_changedProperties) {
    _changedProperties.forEach((oldValue, propName) => {
      if (['fileName'].includes(propName)) {
        this.newText();
      }
    });
  }

  newText() {
    this.rightFileName = '';
    this.middleData = {};
    this.lang = getLanguageFromFilename(this.fileName);
  }

  switchTexts() {
    this.leftTextData = this.rightTextData;
    this.fileName = this.rightFileName;
    this.rightFileName = '';
  }

  toggleMiddleData(e) {
    this.middleData = e.detail;
  }

  updateParallelCount(e) {
    this.parallelCount = e.detail.parallelCount;
    this.segmentCount = e.detail.segmentCount;
  }

  handleMouseOver(e) {
    let mainElement = e.detail[0];
    let rightMode = e.detail[1];
    if (!mainElement.getAttribute('activesegments')) {
      mainElement = e.detail[0].parentElement;
    }

    if (!mainElement.getAttribute('activesegments')) {
      return;
    }

    let rootSegments = mainElement
      .getAttribute('activesegments')
      .split(';')
      .slice(0, -1);
    let rootOffsetBegin = parseInt(mainElement.getAttribute('rootoffsetbegin'));
    let rootOffsetEnd = parseInt(mainElement.getAttribute('rootoffsetend'));
    this.highlightParallel(
      rootSegments,
      rootOffsetBegin,
      rootOffsetEnd,
      rightMode
    );
  }

  highlightLeftafterScrolling(e) {
    let data = e.detail;
    this.highlightParallel(
      data.selectedParallels,
      data.startoffset,
      data.endoffset,
      0
    );
  }

  highlightParallel(rootSegments, rootOffsetBegin, rootOffsetEnd, rightMode) {
    if (!rootSegments) {
      return;
    }

    let TextViewWindow = {};

    if (rightMode === 1) {
      TextViewWindow = this.shadowRoot.getElementById('text-view-right');
    } else {
      TextViewWindow = this.shadowRoot.getElementById('text-view-left');
    }

    let allSegments = TextViewWindow.shadowRoot.querySelectorAll(
      '.highlighted-by-parallel'
    );
    allSegments.forEach(item => {
      item.classList.remove('highlighted-by-parallel');
    });

    for (let i = 0; i < rootSegments.length; ++i) {
      let currentSegment = rootSegments[i];
      if (!TextViewWindow.shadowRoot.getElementById(currentSegment)) {
        return;
      }

      let segment = TextViewWindow.shadowRoot.getElementById(currentSegment);
      if (!segment.getElementsByClassName('word')) {
        return;
      }

      // TODO: simplify these if-statements
      let words = segment.getElementsByClassName('word');
      for (let j = 0; j <= words.length; ++j) {
        if (words[j] && words[j].hasAttribute('position')) {
          let position = parseInt(words[j].getAttribute('position'));
          if (
            rootSegments[0] == currentSegment &&
            position >= rootOffsetBegin
          ) {
            words[j].classList.add('highlighted-by-parallel');
          }
          if (rootSegments.slice(1, -1).indexOf(currentSegment) > -1) {
            words[j].classList.add('highlighted-by-parallel');
          }
          if (rootSegments.slice(-1)[0] == currentSegment) {
            if (position >= rootOffsetEnd) {
              words[j].classList.remove('highlighted-by-parallel');
            } else {
              words[j].classList.add('highlighted-by-parallel');
            }
          }
          if (rootSegments[0] == currentSegment && position < rootOffsetBegin) {
            words[j].classList.remove('highlighted-by-parallel');
          }
        }
      }
    }
  }

  async updateText(e) {
    let data = e.detail[0];
    let rightMode = e.detail[1];
    let selectedParallels = data.getAttribute('parsegments').split(';');
    selectedParallels.pop();
    let startoffset = parseInt(data.getAttribute('paroffsetbegin'));
    let endoffset = parseInt(data.getAttribute('paroffsetend'));
    if (rightMode === 0) {
      this.renderSwitchButton = true;
      this.rightFileName = selectedParallels[0].replace(/:.*/, '');
      this.rightTextData = {
        selectedParallels: selectedParallels,
        startoffset: startoffset,
        endoffset: endoffset,
      };
    } else {
      this.fileName = selectedParallels[0].replace(/:.*/, '');
      this.leftTextData = { selectedParallels, startoffset, endoffset };
    }
  }

  async updateTextBySearch(e) {
    let data = e.detail;
    this.leftTextData = data;
    this.searchString = false;
  }

  render() {
    console.log('rendered text view.');

    if (this.searchString) {
      return html`
        <text-view-search
          lang="${this.lang}"
          .fileName="${this.fileName}"
          .searchString="${this.searchString}"
          @click-result="${this.updateTextBySearch}"
        ></text-view-search>
      `;
    } else {
      return html`
        <data-view-header
          .score="${this.score}"
          .limitCollection="${this.limitCollection}"
          .quoteLength="${this.quoteLength}"
          .cooccurance="${this.cooccurance}"
          .fileName="${this.fileName}"
          .infoModalContent="${TextViewInfoModalContent()}"
        ></data-view-header>
        <table class="text-view-table">
          <text-view-header
            .fileName="${this.fileName}"
            .lang="${this.lang}"
            .rightFileName="${this.rightFileName}"
            .renderSwitchButton="${this.renderSwitchButton}"
            .score="${this.score}"
            .limitCollection="${this.limitCollection}"
            .quoteLength="${this.quoteLength}"
            .cooccurance="${this.cooccurance}"
            @switch-texts="${this.switchTexts}"
          ></text-view-header>
        </table>

        <vaadin-split-layout class="top-level-split">
          <div class="left-text-column">
            <p>
              <text-view-left
                lang="${this.lang}"
                id="text-view-left"
                .fileName="${this.fileName}"
                .leftTextData="${this.leftTextData}"
                .score="${this.score}"
                .limitCollection="${this.limitCollection}"
                .quoteLength="${this.quoteLength}"
                .cooccurance="${this.cooccurance}"
                .leftActiveSegment="${this.leftActiveSegment}"
                @active-segment-changed="${this.toggleMiddleData}"
                @highlight-left-after-scrolling="${this
                  .highlightLeftafterScrolling}"
                @update-parallel-count="${this.updateParallelCount}"
              ></text-view-left>
            </p>
          </div>
          <div style="width: 100%">
            <vaadin-split-layout>
              <div class="middle-text-column">
                <text-view-middle
                  lang="${this.lang}"
                  id="text-view-middle"
                  .score="${this.score}"
                  .fileName="${this.fileName}"
                  .limitCollection="${this.limitCollection}"
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
                        lang="${this.lang}"
                        id="text-view-right"
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
                        Click on a match in the middle column in order to
                        display the full Hit Text here.
                      </p>
                    `}
              </div>
            </vaadin-split-layout>
          </div>
        </vaadin-split-layout>
      `;
    }
  }
}
