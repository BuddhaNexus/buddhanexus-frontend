import { customElement, html, LitElement, property } from 'lit-element';
import { truncateSegnrText } from './textViewUtils';
import { getLanguageFromFilename } from '../utility/views-common';
import {
  highlightTextByOffset,
  segmentArrayToString,
} from '../utility/preprocessing';
import { getFileTextParallelsMiddle } from '../../api/actions';
import { createTextViewSegmentUrl } from '../data/dataViewUtils';

import sharedDataViewStyles from '../data/data-view-shared.styles';
import styles from './text-view-table.styles';
import '../utility/formatted-segment';

@customElement('text-view-middle')
export class TextViewMiddle extends LitElement {
  @property({ type: String }) fileName;
  @property({ type: Number }) quoteLength;
  @property({ type: Number }) cooccurance;
  @property({ type: Number }) score;
  @property({ type: Array }) multiLingualMode;
  @property({ type: Object }) data;
  @property({ type: Array }) limitCollection;
  @property({ type: String }) leftActiveSegment;
  @property({ type: Array }) selectedParallels;
  @property({ type: String }) fetchLoading = true;
  @property({ type: String }) fetchError;
  @property({ type: String }) transMethod;

  static get styles() {
    return [sharedDataViewStyles, styles];
  }

  async connectedCallback() {
    super.connectedCallback();
    await this.fetchMiddleParallels();
  }

  updated(_changedProperties) {
    super.updated(_changedProperties);
    _changedProperties.forEach(async (oldValue, propName) => {
      if (
        [
          'data',
          'leftActiveSegment',
          'score',
          'limitCollection',
          'cooccurance',
          'quoteLength',
          'multiLingualMode',
        ].includes(propName)
      ) {
        if (this.fetchLoading) {
          return;
        }
        await this.fetchMiddleParallels();
        this.fetchLoading = false;
      }
    });
  }

  async fetchMiddleParallels() {
    this.fetchLoading = true;
    const { parallels, error } = await getFileTextParallelsMiddle({
      segmentnr: this.data.activeSegment,
      file_name: this.fileName,
      score: this.score,
      par_length: this.quoteLength,
      limit_collection: this.data.limitCollection,
      co_occ: this.cooccurance,
      multi_lingual: this.multiLingualMode,
    });
    this.selectedParallels = parallels;
    this.fetchError = error;
    this.fetchLoading = false;
  }
  clickedParallel(e) {
    let target = e.target;
    if (!target.getAttribute('parsegments')) {
      target = target.parentElement;
    }
    if (target.classList.contains('chinese-verse')) {
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

  createTransMessage(par_lang) {
    if (par_lang == 'tib') {
      return html`
        Tibetan translation
      `;
    }
    if (par_lang == 'skt') {
      return html`
        Sanskrit version
      `;
    }
    if (par_lang == 'pli') {
      return html`
        Pāli version
      `;
    }

    if (par_lang == 'chn') {
      return html`
        Chinese translation
      `;
    }
  }

  render() {
    if (!this.data) {
      //prettier-ignore
      return html`<span lang="en">Click on a syllable in the Inquiry Text to display the approximate
          matches. Only colored syllables have parallels. Black text has no
          parallels with the current filter settings.</span>`;
    }

    let selectedParallelsText = html``;
    let positionFlag = 0;
    let parallelCounter = 0;
    let parallels = [...this.selectedParallels];
    if (parallels) {
      for (let i = 0; i < parallels.length; i++) {
        if (
          parallels[i].root_offset_beg <= this.data.position &&
          parallels[i].root_segnr[0] === this.data.activeSegment
        ) {
          positionFlag = 1;
        }
        if (
          parallels[i].root_offset_end >= this.data.position &&
          parallels[i].root_segnr.slice(-1)[0] === this.data.activeSegment
        ) {
          positionFlag = 1;
        }
        if (
          parallels[i].root_offset_beg > this.data.position &&
          parallels[i].root_segnr[0] === this.data.activeSegment
        ) {
          positionFlag = 0;
        }
        if (
          parallels[i].root_offset_end < this.data.position &&
          parallels[i].root_segnr.slice(-1)[0] === this.data.activeSegment
        ) {
          positionFlag = 0;
        }
        if (
          parallels[i].root_segnr
            .slice(1, -1)
            .indexOf(this.data.activeSegment) > -1
        ) {
          positionFlag = 1;
        }
        if (positionFlag === 1) {
          let segnrText = parallels[i].par_segtext;
          segnrText = truncateSegnrText(segnrText);

          const par_lang = getLanguageFromFilename(parallels[i].par_segnr[0]);
          const src_lang = getLanguageFromFilename(parallels[i].root_segnr[0]);
          let parSegnr = segmentArrayToString(parallels[i].par_segnr, par_lang);
          parallelCounter += 1;
          let rootOffsetBegin = parallels[i].root_offset_beg;
          let rootOffsetEnd = parallels[i].root_offset_end;
          let parOffsetBegin = parallels[i].par_offset_beg;
          let parOffsetEnd = parallels[i].par_offset_end;
          let rootSegnr = parallels[i].root_segnr;
          let rootSegnrText = '';
          for (let l = 0; l < rootSegnr.length; l++) {
            rootSegnrText += rootSegnr[l] + ';';
          }

          // const selParName = parallels[i].par_segnr.map(i => `${i};`);

          let selParName = [];
          parallels[i].par_segnr.forEach(item => selParName.push(`${item};`));

          segnrText = highlightTextByOffset({
            textArray: segnrText,
            startoffset: parOffsetBegin,
            endoffset: parOffsetEnd,
            lang: par_lang,
            transMethod: this.transMethod,
          });
          let transMessage = `Match`;
          if (src_lang != par_lang) {
            transMessage = this.createTransMessage(par_lang);
          }
          //prettier-ignore
          selectedParallelsText = html`
            ${selectedParallelsText}
            <div
              class="selected-parallel material-card"
              lang="${par_lang}"
              trans="${this.transMethod}"
              activeSegments="${rootSegnrText}"
              rootOffsetBegin="${rootOffsetBegin}"
              rootOffsetEnd="${rootOffsetEnd}"
              parSegments="${selParName}"
              parOffsetBegin="${parOffsetBegin}"
              parOffsetEnd="${parOffsetEnd}"
              @click="${this.clickedParallel}"
              @mouseover="${this.mouseOverParallel}">
              <span class="selected-parallel-nr">
                <formatted-segment .segmentnr="${[parSegnr]}" .lang="${par_lang}" .rootUrl="${createTextViewSegmentUrl(parSegnr)}"></formatted-segment>
              <span class="trans-message">${transMessage}</span> <br /> </span> 
              <span class="score">Score: ${parallels[i].score} %</span>
              <span class="segment-length ${parallels[i].par_length ? 'show-length' : 'no-show-length'}">Length: ${parallels[i].par_length}</span>
              <span class="co-occurance">Co-occurrence: ${parallels[i]['co-occ']} </span>
              <br />
              <div class="horizontal-divider"></div>
              ${segnrText}</div>
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
      ${this.fetchLoading
        ? html`
            <bn-loading-spinner></bn-loading-spinner>
          `
        : null}
    `;
  }
}
