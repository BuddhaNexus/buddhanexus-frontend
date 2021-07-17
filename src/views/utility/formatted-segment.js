import { customElement, html, LitElement, property, css } from 'lit-element';

import { getDisplayName } from '../../api/actions';
import { getLanguageFromFilename } from './views-common';
import { segmentArrayToString } from './preprocessing';
import { LANGUAGE_CODES, LANGUAGE_NAMES } from '../utility/constants';

import styles from './formatted-segment.styles';

@customElement('formatted-segment')
export class FormattedSegment extends LitElement {
  @property({ type: String }) segmentnr;
  @property({ type: String }) filename;
  @property({ type: String }) lang;
  @property({ type: String }) rootUrl;
  @property({ type: Boolean }) logo = true;
  @property({ type: String }) externalLinkCode;
  @property({ type: String }) number;
  @property({ type: String }) displayName = '';
  @property({ type: String }) displayLink = '';
  @property({ type: String }) externalLink = '';
  @property({ type: String }) externalLinkName = '';
  @property({ type: Function }) allowFetching = false;
  @property({ type: Function }) fetchLoading = false;
  @property({ type: String }) fetchError;

  static get styles() {
    return [
      styles,
      css`
        .formatted-segment {
          font-family: var(--system-font-stack);
        }
      `,
    ];
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
      case LANGUAGE_CODES.TIBETAN:
        title = LANGUAGE_NAMES.TIBETAN;
        break;
      case LANGUAGE_CODES.SANSKRIT:
        title = LANGUAGE_NAMES.SANSKRIT;
        break;
      case LANGUAGE_CODES.PALI:
        title = LANGUAGE_NAMES.PALI;
        break;
      case LANGUAGE_CODES.CHINESE:
        title = LANGUAGE_NAMES.CHINESE;
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
    if (
      this.lang === LANGUAGE_CODES.CHINESE ||
      this.lang === LANGUAGE_CODES.SANSKRIT
    ) {
      this.filename = this.filename.replace(/_[0-9]+/, '');
    }

    let thisFile = localStorage.getItem('thisFile');
    if (this.filename === thisFile) {
      this.parseDisplayData(
        JSON.parse(localStorage.getItem('thisDisplayData')),
        segmentnrString
      );
      return;
    }

    const { displayData, error } = await getDisplayName({
      segmentnr: this.filename,
    });
    this.parseDisplayData(displayData, segmentnrString);

    this.fetchLoading = false;
    this.allowFetching = false;
    this.fetchError = error;
  }

  parseDisplayData(displayData, segmentnrString) {
    this.displayName = displayData ? displayData[0] : '';

    this.externalLink = this.getLinkForSegmentNumbers(
      this.lang,
      segmentnrString,
      displayData
    );

    this.displayLink = this.rootUrl;
    this.externalLinkName = this.getExternalLinkName(
      this.lang,
      this.externalLink
    );
  }

  getExternalLinkName(language, externalLink) {
    if (!externalLink) {
      return;
    }
    let linkName = '';
    switch (language) {
      case LANGUAGE_CODES.TIBETAN:
        linkName =
          externalLink && externalLink.match('bdrc')
            ? `Buddhist Digital Resource Centre`
            : `Resources for Kanjur and Tanjur Studies`;
        break;
      case LANGUAGE_CODES.PALI:
        linkName =
          externalLink && externalLink.match('suttacentral')
            ? `SuttaCentral`
            : `Vipassana Research Institute`;
        break;
      case LANGUAGE_CODES.SANSKRIT:
        if (externalLink && externalLink.match('suttacentral')) {
          linkName = `SuttaCentral`;
        } else if (externalLink && externalLink.match('dsbc')) {
          linkName = `Digital Sanskrit Buddhist Canon`;
        } else {
          linkName = `GRETIL`;
        }
        break;
      case LANGUAGE_CODES.CHINESE:
        linkName = externalLink && externalLink.match('suttacentral')
          ? `SuttaCentral`
          : `CBETA (OLD SITE)`;
        break;
      default:
        linkName = '';
    }
    return linkName;
  }

  getLinkForSegmentNumbers(language, segmentnr, displayData) {
    let linkText = '';
    if (language === LANGUAGE_CODES.TIBETAN) {
      if (!displayData || !displayData[2]) {
        linkText = '';
      }
      if (this.externalLinkCode === 'exlink1') {
        linkText = displayData[2];
      } else {
        linkText = displayData[2].replace(
          'http://purl.bdrc.io/resource/WA0RT',
          'https://www.istb.univie.ac.at/kanjur/rktsneu/verif/verif3.php?id='
        );
      }
    }

    if (language === LANGUAGE_CODES.SANSKRIT) {
      if (!displayData || !displayData[2]) {
        linkText = '';
      }
      if (this.externalLinkCode === 'exlink1' || !displayData[3]) {
        linkText = displayData[2];
      } else {
        linkText = displayData[3];
      }
    }

    if (language === LANGUAGE_CODES.PALI) {
      // Because SuttaCentral changed the way links work, some things
      // have changed here. For now I placed them in comments and asked at SC
      // if there are any plans to add range highlighting again.
      // prettier-ignore
      const dhpVerses = [1,21,33,44,60,76,90,100,116,129,146,157,167,179,197,209,221,235,256,273,290,306,320,334,360,383,424];
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
    }

    if (language === LANGUAGE_CODES.CHINESE) {
      const cleanedSegmentNumber = segmentnr.split(':')[1].split('–')[0];
      const cleanedSegment = segmentnr.split(':')[0].replace(/_[TX]/, 'n');
      if (this.externalLinkCode === 'exlink1' || !displayData[3]) {
        linkText = `http://tripitaka.cbeta.org/${cleanedSegment}#${cleanedSegmentNumber}`;
      } else {
        linkText = `${displayData[3]}#t${cleanedSegmentNumber}`;
      }
    }

    return linkText;
  }

  copyText() {
    const el = document.createElement('textarea');
    el.value = this.filename + ':' + this.number + ': ' + this.displayName;
    alert('Copied to clipboard:\n' + el.value);
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
    if (this.externalLink) {
      // prettier-ignore
      return html`${this.getIcon(this.lang)} <a target="_blanc" class="segment-link" href="${this.displayLink}">
        <span class="formatted-segment" title="${this.displayName}">${this.filename}:${this.number}</span>
        </a>
        <iron-icon
          class="copy-icon"
          icon="vaadin:copy-o"
          title="Copy work title to Clipboard"
          @click="${this.copyText}">
        </iron-icon>
        <iron-icon
          class="open-link-icon"
          icon="vaadin:external-link"
          title="Display this text in ${this.externalLinkName}"
          onclick="window.open('${this.externalLink}','_blank');">
        </iron-icon>
        `
    }
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
    localStorage.setItem('thisFile', this.filename);
    this.fetchData();
  }

  async fetchData() {
    const { displayData, error } = await getDisplayName({
      segmentnr: this.filename,
    });
    localStorage.setItem('thisDisplayData', JSON.stringify(displayData));

    this.displayName = displayData[0];
    this.textName = displayData[1];
    this.fetchLoading = false;
    this.fetchError = error;
  }

  copyText() {
    const el = document.createElement('textarea');
    el.value = this.textName + ': ' + this.displayName;
    alert('Copied to clipboard:\n' + el.value);
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
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
