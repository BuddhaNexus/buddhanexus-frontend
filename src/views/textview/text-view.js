import { customElement, html, LitElement, property } from 'lit-element';
import '@vaadin/vaadin-split-layout/theme/material/vaadin-split-layout';

import './text-view-search';
import './text-view-header';
import './text-view-left';
import './text-view-middle';
import './text-view-right';
import './text-view-table';
import { getLanguageFromFilename } from '../utility/views-common';
import { isObjectEmpty } from '../utility/utils';

export const C_HIGHLIGHTED_SEGMENT = 'segment--highlighted';
export const C_SELECTED_SEGMENT = 'segment--selected';

@customElement('text-view')
export class TextView extends LitElement {
  @property({ type: String }) fileName;
  @property({ type: String }) leftActiveSegment = 'none';
  @property({ type: String }) rightActiveSegment = 'none';
  @property({ type: String }) folio;
  @property({ type: Array }) limitCollection;
  @property({ type: Number }) quoteLength;
  @property({ type: Number }) cooccurance;
  @property({ type: Number }) score;
  @property({ type: Boolean }) rightMode;
  @property({ type: String }) searchString;
  @property({ type: Function }) setFileName;
  @property({ type: String }) rightFileName = '';
  @property({ type: Object }) rightTextData;
  @property({ type: Object }) middleData = {};
  @property({ type: Object }) leftTextData;
  @property({ type: String }) lang;

  updated(_changedProperties) {
    _changedProperties.forEach((oldValue, propName) => {
      if (['fileName'].includes(propName)) {
        this.handleFileNameChanged();
      }
      if (['folio'].includes(propName)) {
        this.handleFolioChanged();
      }

      if (['limitCollection'].includes(propName)) {
        if ('limitCollection' in this.middleData) {
          this.middleData.limitCollection = this.limitCollection;
        }
      }
    });
  }

  handleFileNameChanged() {
    this.rightFileName = '';
    this.lang = getLanguageFromFilename(this.fileName);
    this.middleData = {};
  }

  switchTexts() {
    this.leftTextData = this.rightTextData;
    this.setFileName(this.rightFileName);
    this.fileName = this.rightFileName;
    this.rightFileName = '';
    this.middleData = false;
  }

  resetLeftText() {
    this.leftTextData = {
      selectedParallels: [undefined],
      startoffset: 0,
      endoffset: 0,
    };
    this.middleData = {};
  }

  setMiddleData(e) {
    this.middleData = e.detail;
    this.leftActiveSegment = e.detail.activeSegment;
  }

  handleFolioChanged() {
    let segment = this.folio['segment_nr'];
    this.leftTextData = {
      selectedParallels: [segment],
      startoffset: 0,
      endoffset: 0,
    };
  }

  handleMouseOver(e) {
    e.preventDefault();
    const [mainElement, rightMode] = e.detail;

    if (!mainElement.getAttribute('activesegments')) {
      return;
    }

    this.highlightParallel({
      rootSegments: mainElement
        .getAttribute('activesegments')
        .split(';')
        .slice(0, -1),
      rootOffsetBegin: parseInt(mainElement.getAttribute('rootoffsetbegin')),
      rootOffsetEnd: parseInt(mainElement.getAttribute('rootoffsetend')),
      rightMode,
    });
  }

  highlightLeftAfterScrolling(e) {
    this.highlightParallel({
      rootSegments: e.detail.selectedParallels,
      rootOffsetBegin: e.detail.startoffset,
      rootOffsetEnd: e.detail.endoffset,
      rightMode: false,
    });
  }

  highlightParallel({
    rootSegments,
    rootOffsetBegin,
    rootOffsetEnd,
    rightMode,
  }) {
    if (!rootSegments) {
      return;
    }

    const textContainer = this.shadowRoot
      .getElementById('text-view-table')
      .shadowRoot.getElementById(
        rightMode ? 'text-view-right' : 'text-view-left'
      );

    textContainer.shadowRoot
      .querySelectorAll(`.${C_HIGHLIGHTED_SEGMENT}`)
      .forEach(item => {
        item.classList.remove(C_HIGHLIGHTED_SEGMENT);
      });
    for (let i = 0; i < rootSegments.length; ++i) {
      const segment = textContainer.shadowRoot.getElementById(rootSegments[i]);
      const words = segment ? segment.getElementsByClassName('word') : null;
      for (let j = 0; j <= words.length; ++j) {
        let word = words[j];
        if (word && word.hasAttribute('position')) {
          const position = parseInt(word.getAttribute('position'));
          if (
            rootSegments[0] === rootSegments[i] &&
            position >= rootOffsetBegin
          ) {
            word.classList.add(C_HIGHLIGHTED_SEGMENT);
          }
          if (rootSegments.slice(1, -1).indexOf(rootSegments[i]) > -1) {
            word.classList.add(C_HIGHLIGHTED_SEGMENT);
          }
          if (rootSegments.slice(-1)[0] === rootSegments[i]) {
            if (position > rootOffsetEnd) {
              word.classList.remove(C_HIGHLIGHTED_SEGMENT);
            } else {
              word.classList.add(C_HIGHLIGHTED_SEGMENT);
            }
          }
          if (
            rootSegments[0] === rootSegments[i] &&
            position < rootOffsetBegin
          ) {
            word.classList.remove(C_HIGHLIGHTED_SEGMENT);
          }
        }
      }
    }
  }

  async handleParallelClicked(e) {
    const [data, rightMode] = e.detail;

    const selectedParallels = data.getAttribute('parsegments').split(';');
    selectedParallels.pop();
    const startOffset = parseInt(data.getAttribute('paroffsetbegin'));
    const endOffset = parseInt(data.getAttribute('paroffsetend'));

    if (rightMode) {
      this.fileName = selectedParallels[0]
        .replace(/_[0-9][0-9][0-9]/, '')
        .replace(/:.*/, '');
      this.leftTextData = {
        selectedParallels,
        startoffset: startOffset,
        endoffset: endOffset,
      };
    } else {
      this.renderSwitchButton = true;
      this.rightFileName = selectedParallels[0]
        .replace(/_[0-9][0-9][0-9]/, '')
        .replace(/:.*/, '');
      this.rightActiveSegment = selectedParallels[0];
      this.rightTextData = {
        selectedParallels: selectedParallels,
        startoffset: startOffset,
        endoffset: endOffset,
      };
    }
  }

  render() {
    return html`
      <text-view-header
        .fileName="${this.fileName}"
        .rightFileName="${this.rightFileName}"
        .rightSegmentName="${this.rightActiveSegment}"
        .score="${this.score}"
        .limitCollection="${this.limitCollection}"
        .quoteLength="${this.quoteLength}"
        .cooccurance="${this.cooccurance}"
        .renderSwitchButton="${this.renderSwitchButton}"
        .renderMiddleTextLabel="${!isObjectEmpty(this.middleData)}"
        @switch-texts="${this.switchTexts}"
        @reset-left-text="${this.resetLeftText}"
      ></text-view-header>

      <text-view-table
        id="text-view-table"
        .lang="${this.lang}"
        .fileName="${this.fileName}"
        .leftTextData="${this.leftTextData}"
        .middleData="${this.middleData}"
        .rightTextData="${this.rightTextData}"
        .score="${this.score}"
        .limitCollection="${this.limitCollection}"
        .quoteLength="${this.quoteLength}"
        .cooccurance="${this.cooccurance}"
        .rightFileName="${this.rightFileName}"
        .leftActiveSegment="${this.leftActiveSegment}"
        .toggleMiddleData="${e => this.setMiddleData(e)}"
        .highlightLeftAfterScrolling="${e =>
          this.highlightLeftAfterScrolling(e)}"
        .handleMouseOver="${e => this.handleMouseOver(e)}"
        .handleParallelClicked="${e => this.handleParallelClicked(e)}"
      >
      </text-view-table>
    `;
  }
}
