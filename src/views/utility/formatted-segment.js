import { customElement, html, LitElement, property } from 'lit-element';

import { getDisplayName } from '../../api/actions';
import { getLanguageFromFilename } from './views-common';
import { segmentArrayToString } from './preprocessing';

import styles from './formatted-segment.styles';

@customElement('formatted-segment')
export class FormattedSegment extends LitElement {
  @property({ type: String }) segmentnr;
  @property({ type: String }) filename;
  @property({ type: String }) lang;
  @property({ type: Boolean }) logo = true;
  @property({ type: String }) number;
  @property({ type: String }) displayName = '';
  @property({ type: String }) displayLink = '';
  @property({ type: Function }) allowFetching = false;
  @property({ type: Function }) fetchLoading = false;
  @property({ type: String }) fetchError;

  static get styles() {
    return [styles];
  }

  firstUpdated() {
    this.addObserver();
  }

  getIcon(par_lang) {
    if (!this.logo) {
      return;
    }
    let title;
    switch (par_lang) {
      case 'tib':
        title = 'Tibetan';
        break;
      case 'skt':
        title = 'Sanskrit';
        break;
      case 'pli':
        title = 'Pali';
        break;
      case 'chn':
        title = 'Chinese';
        break;
      default:
        title = '';
    }

    return html`
      <img
        title="${title}"
        width="16px"
        src="../../src/assets/icons/favicon-${par_lang}-16x16.png"
      />
    `;
  }

  updated(_changedProperties) {
    _changedProperties.forEach(async (oldValue, propName) => {
      if (propName === 'segmentnr') {
        this.fetchData();
        this.allowFetching == false;
      }
    });

    if (this.allowFetching) {
      this.fetchData();
      this.allowFetching = false;
    }
  }

  async addObserver() {
    const targets = this.shadowRoot.querySelectorAll('.formatted-segment');
    const observer = new IntersectionObserver(entries => {
      let entry = entries[0];
      if (entry.isIntersecting) {
        this.allowFetching = true;
        observer.unobserve(entry.target);
      }
    });
    observer.observe(targets[0]);
  }

  async fetchData() {
    let segmentnrString = segmentArrayToString(this.segmentnr);
    this.lang = getLanguageFromFilename(segmentnrString);
    this.filename = segmentnrString.split(':')[0];
    this.number = segmentnrString.split(':')[1];
    if (this.lang === 'chn' || this.lang === 'skt') {
      this.filename = this.filename.replace(/_[0-9]+/, '');
    }
    const { displayData, error } = await getDisplayName({
      segmentnr: this.filename,
    });
    this.displayName = displayData ? displayData[0] : '';
    if (this.lang === 'skt' || this.lang === 'tib') {
      this.displayLink = displayData ? displayData[2] : '';
    }
    if (this.lang === 'chn' || this.lang === 'pli') {
      this.displayLink = this.getLinkForSegmentNumbers(
        this.lang,
        segmentnrString
      );
    }
    this.fetchLoading = false;
    this.allowFetching = false;
    this.fetchError = error;
  }

  getLinkForSegmentNumbers(language, segmentnr) {
    // prettier-ignore
    const dhpVerses = [1,21,33,44,60,76,90,100,116,129,146,157,167,179,197,
                        209,221,235,256,273,290,306,320,334,360,383,424]
    let linkText = '';
    if (language === 'pli') {
      // Because SuttaCentral changed the way links work, some things
      // have changed here. For now I placed them in comments and asked at SC
      // if there are any plans to add range highlighting again.
      let cleanedSegment = segmentnr
        .split(':')[1]
        .replace(/_[0-9]+/g, '')
        .split('–')[0];
      // .replace('–', '--');
      let rootSegment = segmentnr.split(':')[0];
      if (segmentnr.match(/^dhp/)) {
        let verseNumber = parseInt(cleanedSegment.split('.', 1)[0]);
        for (let i = 0; i < dhpVerses.length; i++) {
          if (verseNumber >= dhpVerses[i] && verseNumber < dhpVerses[i + 1]) {
            rootSegment = `dhp${String(dhpVerses[i])}-${String(
              dhpVerses[i + 1] - 1
            )}`;
            break;
          }
        }
        cleanedSegment = '';
      } else if (segmentnr.match(/^an[1-9]|^sn[1-9]/)) {
        rootSegment = `${rootSegment}.${cleanedSegment.split('.', 1)}`;
        const dotPosition = cleanedSegment.indexOf('.');
        cleanedSegment = cleanedSegment.substring(dotPosition + 1);
        // if (cleanedSegment.match(/--/)) {
        //   let [firstpart, secondpart] = cleanedSegment.split('--');
        //   const secondDot = secondpart.indexOf('.');
        //   secondpart = secondpart.substring(secondDot + 1);
        //   cleanedSegment = `${firstpart}--${secondpart}`;
        // }
      }
      linkText = segmentnr.match(/^tika|^anya|^atk/)
        ? `https://www.tipitaka.org/romn/`
        : `https://suttacentral.net/${rootSegment}/pli/ms#${cleanedSegment}`;
    } else if (language === 'chn') {
      const cleanedSegment = segmentnr.split(':')[0].replace(/_[TX]/, 'n');
      linkText = `http://tripitaka.cbeta.org/${cleanedSegment}`;
    }
    return linkText;
  }

  copyText() {
    const el = document.createElement('textarea');
    el.value = this.filename + ':' + this.number + ': ' + this.displayName;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  }

  render() {
    if (this.fetchLoading || !this.displayName) {
      // prettier-ignore
      return html`<span class="formatted-segment" title="${this.filename}">${this.filename}:${this.number}</span>`
    }
    if (this.displayLink) {
      // prettier-ignore
      return html`${this.getIcon(this.lang)} <a target="_blanc" class="segment-link" href="${this.displayLink}">
        <span class="formatted-segment" title="${this.displayName}">${this.filename}:${this.number}</span>
        </a>
        <iron-icon
          class="copy-icon"
          icon="vaadin:copy-o"
          title="Copy work title to Clipboard"
          @click="${this.copyText}">
        </iron-icon>`
    }
    // prettier-ignore
    return html`${this.getIcon(this.lang)} <span class="formatted-segment" title="${this.displayName}">${this.filename}:${this.number}</span>
        <iron-icon
          class="copy-icon"
          icon="vaadin:copy-o"
          title="Copy work title to Clipboard"
          @click="${this.copyText}">
        </iron-icon>`
  }
}

@customElement('formatted-filename')
export class FormattedFileName extends LitElement {
  @property({ type: String }) filename;
  @property({ type: String }) displayName = '';
  @property({ type: String }) textName = '';
  @property({ type: String }) rightside = '';
  @property({ type: Function }) allowFetching = false;
  @property({ type: Function }) fetchLoading = false;
  @property({ type: String }) fetchError;

  static get styles() {
    return [styles];
  }

  updated() {
    this.fetchData();
  }

  async fetchData() {
    const { displayData, error } = await getDisplayName({
      segmentnr: this.filename,
    });
    this.displayName = displayData[0];
    this.textName = displayData[1];
    this.fetchLoading = false;
    this.fetchError = error;
  }

  copyText() {
    const el = document.createElement('textarea');
    el.value = this.textName + ': ' + this.displayName;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  }

  showSource(filename) {
    const lang = getLanguageFromFilename(filename);
    if (lang == 'skt') {
      if (filename.match(/[X0-9]n[0-9]/)) {
        return html`
          (<a href="http://www.dsbcproject.org/">DSBC</a>)
        `;
      } else {
        return html`
          (<a href="http://gretil.sub.uni-goettingen.de/gretil.html">GRETIL</a>)
        `;
      }
    }
  }

  render() {
    if (this.fetchLoading || !this.displayName) {
      // prettier-ignore
      return html`<span class="formatted-file-name" name="${this.displayName}">${this.filename}</span>`
    }
    // prettier-ignore
    return html`<span class="formatted-file-name ${this.rightside}" name="${this.displayName}">${this.textName}</span>
          <iron-icon
            class="copy-icon"
            icon="vaadin:copy-o"
            title="Copy work title to Clipboard"
            @click="${this.copyText}">
          </iron-icon>`
  }
}
