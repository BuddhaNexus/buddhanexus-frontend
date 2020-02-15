import { customElement, html, LitElement, property } from 'lit-element';

import { sortByKey, getLanguageFromFilename } from '../utility/views-common';
import {
  highlightTextByOffset,
  segmentArrayToString,
  replaceSegmentForDisplay,
} from '../utility/preprocessing';
import { getFileTextParallelsMiddle } from '../../api/actions';

import sharedDataViewStyles from '../data/data-view-shared.styles';
import styles from './text-view.styles';

@customElement('text-view-middle')
export class TextView extends LitElement {
  @property({ type: String }) fileName;
  @property({ type: Array }) limitCollection;
  @property({ type: Number }) quoteLength;
  @property({ type: Number }) cooccurance;
  @property({ type: Number }) score;
  @property({ type: Object }) data;

  @property({ type: String }) fetchLoading = true;
  @property({ type: String }) fetchError;

  static get styles() {
    return [sharedDataViewStyles, styles];
  }

  updated(_changedProperties) {
    this.fetchLoading = true;
    _changedProperties.forEach((oldValue, propName) => {
      if (
        [
          'data',
          'leftActiveSegment',
          'score',
          'cooccurance',
          'quoteLength',
          'limitCollection',
        ].includes(propName)
      ) {
        this.fetchMiddleParallels();
      }
    });
  }

  async fetchMiddleParallels() {
    if (!this.data.selectedParallels) {
      return;
    }
    let segmentnr = this.data.activeSegment;
    const { parallels, error } = await getFileTextParallelsMiddle({
      segmentnr: segmentnr,
      file_name: this.fileName,
      score: this.score,
      par_length: this.quoteLength,
      limit_collection: this.limitCollection,
      co_occ: this.cooccurance,
    });
    this.data.selectedParallels = parallels[0];
    this.fetchError = error;
    this.fetchLoading = false;
    this.requestUpdate();
  }
  clickedParallel(e) {
    let target = e.target;
    if (!target.getAttribute('parsegments')) {
      target = target.parentElement;
    }
    this.dispatchEvent(
      new CustomEvent('click-parallel', {
        bubbles: true,
        composed: true,
        detail: [target, this.data.rightMode],
      })
    );
  }

  mouseOverParallel(e) {
    this.dispatchEvent(
      new CustomEvent('mouseover-parallel', {
        bubbles: true,
        composed: true,
        detail: [e.target, this.data.rightMode],
      })
    );
  }

  renderParallels() {
    let { activeSegment, position, selectedParallels } = this.data;
    let selectedParallelsText = html``;
    let positionFlag = 0;
    let parallelCounter = 0;
    if (selectedParallels) {
      selectedParallels = sortByKey(selectedParallels, 'score');
      selectedParallels = selectedParallels.reverse();
      for (let i = 0; i < selectedParallels.length; i++) {
        if (
          selectedParallels[i].root_offset_beg <= position &&
          selectedParallels[i].root_segnr[0] == activeSegment
        ) {
          positionFlag = 1;
        }
        if (
          selectedParallels[i].root_offset_end >= position &&
          selectedParallels[i].root_segnr.slice(-1)[0] == activeSegment
        ) {
          positionFlag = 1;
        }
        if (
          selectedParallels[i].root_offset_beg > position &&
          selectedParallels[i].root_segnr[0] == activeSegment
        ) {
          positionFlag = 0;
        }
        if (
          selectedParallels[i].root_offset_end < position &&
          selectedParallels[i].root_segnr.slice(-1)[0] == activeSegment
        ) {
          positionFlag = 0;
        }
        if (
          selectedParallels[i].root_segnr.slice(1, -1).indexOf(activeSegment) >
          -1
        ) {
          positionFlag = 1;
        }
        if (positionFlag === 1) {
          let parSegnr = segmentArrayToString(selectedParallels[i].par_segnr);
          let segnrText = selectedParallels[i].par_segtext;
          if (segnrText.length > 2) {
            segnrText.splice(1, segnrText.length - 2, '…');
          }
          const par_lang = getLanguageFromFilename(
            selectedParallels[i].par_segnr[0]
          );
          parallelCounter += 1;
          let rootOffsetBegin = selectedParallels[i].root_offset_beg;
          let rootOffsetEnd = selectedParallels[i].root_offset_end;
          let parOffsetBegin = selectedParallels[i].par_offset_beg;
          let parOffsetEnd = selectedParallels[i].par_offset_end;
          let rootSegnr = selectedParallels[i].root_segnr;
          let rootSegnrText = '';
          for (let l = 0; l < rootSegnr.length; l++) {
            rootSegnrText += rootSegnr[l] + ';';
          }

          let selParName = [];
          selectedParallels[i].par_segnr.forEach(item =>
            selParName.push(`${item};`)
          );
          segnrText = highlightTextByOffset(
            segnrText,
            parOffsetBegin,
            parOffsetEnd,
            par_lang
          );
          selectedParallelsText = html`
            ${selectedParallelsText}
            <div
              class="selected-parallel"
              activeSegments="${rootSegnrText}"
              rootOffsetBegin="${rootOffsetBegin}"
              rootOffsetEnd="${rootOffsetEnd}"
              parSegments="${selParName}"
              parOffsetBegin="${parOffsetBegin}"
              parOffsetEnd="${parOffsetEnd}"
              @click="${this.clickedParallel}"
              @mouseover="${this.mouseOverParallel}"
            >
              <span class="selected-parallel-nr">
                ${replaceSegmentForDisplay(parSegnr, par_lang)}</span
              ><br />
              <span class="score">Score: ${selectedParallels[i].score} %</span>
              <span class="segment-length"
                >Length: ${selectedParallels[i].par_length}
              </span>
              <span class="co-occurance"
                >Co-occurance: ${selectedParallels[i]['co-occ']} </span
              ><br />
              ${segnrText}
            </div>
          `;
        }
      }
    }

    return html`
      <p class="parallels-text" lang="en">
        There are <strong>${parallelCounter}</strong> parallel segments found
        for the selected segment with the current filters.
      </p>
      <br />${selectedParallelsText}
    `;
  }

  render() {
    if (!this.data.activeSegment) {
      return html`
        <span lang="en"
          >Click on a syllable in the Inquiry Text to display the approximate
          matches. Only colored syllables have parallels. Black text has no
          parallels with the current filter settings.</span
        >
      `;
    }
    if (!this.fetchLoading) {
      return this.renderParallels(this.data);
    }
  }
}
