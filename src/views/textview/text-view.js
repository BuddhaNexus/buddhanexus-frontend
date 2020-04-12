import { customElement, html, LitElement, property } from 'lit-element';

import '@vaadin/vaadin-split-layout/theme/material/vaadin-split-layout';

import './text-view-search';
import './text-view-header';
import './text-view-left';
import './text-view-middle';
import './text-view-right';
import './text-view-table';
import { getLanguageFromFilename } from '../utility/views-common';
import TextViewInfoModalContent from './text-view-modal-content';

import sharedDataViewStyles from '../data/data-view-shared.styles';

@customElement('text-view')
export class TextView extends LitElement {
  @property({ type: String }) fileName;
  @property({ type: String }) leftActiveSegment = 'none';
  @property({ type: String }) folio;
  @property({ type: Array }) limitCollection;
  @property({ type: Number }) quoteLength;
  @property({ type: Number }) cooccurance;
  @property({ type: Number }) score;
  @property({ type: String }) searchString;
  @property({ type: Function }) setFileName;
  @property({ type: String }) rightFileName = '';
  @property({ type: Object }) rightTextData;
  @property({ type: Object }) middleData = {};
  @property({ type: Object }) leftTextData;
  @property({ type: String }) lang;
  @property({ type: String }) textSwitchedFlag = false;

  static get styles() {
    return [sharedDataViewStyles];
  }

  updated(_changedProperties) {
    _changedProperties.forEach((oldValue, propName) => {
      if (['fileName'].includes(propName)) {
        this.textSwitchedFlag = false;
        this.newText();
      }
      if (['folio'].includes(propName)) {
        this.newFolio();
      }
    });
  }

  newText() {
    this.rightFileName = '';
    this.middleData = {};
    this.lang = getLanguageFromFilename(this.fileName);
  }

  switchTexts() {
    this.textSwitchedFlag = true;
    this.leftTextData = this.rightTextData;
    this.setFileName(this.rightFileName);
    this.fileName = this.rightFileName;
    this.rightFileName = '';
  }

  resetLeftText() {
    this.leftTextData = {
      selectedParallels: ['none'],
      startoffset: 0,
      endoffset: 0,
    };
  }

  newFolio() {
    let segment = '';
    if (this.lang === 'chn') {
      let folio = parseInt(this.folio)
        .toString()
        .padStart(3, '0');
      segment = `${this.fileName}:${folio}-1`;
    } else if (this.lang === 'tib') {
      segment = `${this.fileName}:${this.folio}-0`;
    } else {
      if (this.fileName.startsWith('dhp')) {
        segment = `${this.folio}.0_0`;
      } else {
        segment = `${this.folio}.1.1_0`;
      }
    }
    this.leftTextData = {
      selectedParallels: [segment],
      startoffset: 0,
      endoffset: 0,
    };
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

  highlightLeftAfterScrolling(e) {
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
            if (position > rootOffsetEnd) {
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
    return html`
      <data-view-subheader
        .score="${this.score}"
        .limitCollection="${this.limitCollection}"
        .quoteLength="${this.quoteLength}"
        .cooccurance="${this.cooccurance}"
        .fileName="${this.fileName}"
        .infoModalContent="${TextViewInfoModalContent()}"
      ></data-view-subheader>

      <text-view-header
        .fileName="${this.fileName}"
        .rightFileName="${this.rightFileName}"
        .renderSwitchButton="${this.renderSwitchButton}"
        @switch-texts="${this.switchTexts}"
        @reset-left-text="${this.resetLeftText}"
      ></text-view-header>

      <text-view-table
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
        .textSwitchedFlat="${this.textSwitchedFlag}"
        .leftActiveSegment="${this.leftActiveSegment}"
        .toggleMiddleData="${this.toggleMiddleData}"
        .highlightLeftAfterScrolling="${this.highlightLeftAfterScrolling}"
        .updateParallelCount="${this.updateParallelCount}"
        .handleMouseOver="${this.handleMouseOver}"
        .updateText="${this.updateText}"
      >
      </text-view-table>
    `;
  }
}
