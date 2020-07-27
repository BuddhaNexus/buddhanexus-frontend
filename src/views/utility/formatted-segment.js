import { customElement, html, LitElement, property } from 'lit-element';
import { getDisplayName } from '../../api/actions';
import { getLanguageFromFilename } from './views-common';

@customElement('formatted-segment')
export class FormattedSegment extends LitElement {
  @property({ type: String }) segmentnr;
  @property({ type: String }) filename;
  @property({ type: String }) lang;
  @property({ type: String }) number;
  @property({ type: String }) displayName = '';
  @property({ type: Function }) showRKTS = false;
  @property({ type: Function }) fetchLoading = false;
  @property({ type: String }) fetchError;

  firstUpdated() {
    this.fetchData();
  }

  async fetchData() {
    this.lang = getLanguageFromFilename(this.segmentnr);
    this.filename = this.segmentnr.split(':')[0];
    this.number = this.segmentnr.split(':')[1];
    if (this.lang == 'chn') {
      this.filename = this.filename.replace(/_[0-9]+/, '');
    }
    const { displayData, error } = await getDisplayName({
      segmentnr: this.filename,
    });
    this.displayName = displayData;
    this.fetchLoading = false;
    this.fetchError = error;
  }

  render() {
    if (this.fetchLoading) {
      return html`
        <span title="${this.filename}">${this.filename}:${this.number}</span>
      `;
    }

    return html`
      <span title="${this.displayName}">${this.filename}:${this.number}</span>
    `;
  }
}

@customElement('formatted-filename')
export class FormattedFileName extends LitElement {
  @property({ type: String }) filename;
  @property({ type: String }) displayName = '';
  @property({ type: Function }) showRKTS = false;
  @property({ type: Function }) fetchLoading = false;
  @property({ type: String }) fetchError;

  firstUpdated() {
    this.fetchData();
  }

  async fetchData() {
    const { displayData, error } = await getDisplayName({
      segmentnr: this.filename,
    });
    this.displayName = displayData;
    this.fetchLoading = false;
    this.fetchError = error;
  }

  render() {
    if (this.fetchLoading) {
      return html`
        <span class="formatted-file-name" title="${this.filename}"
          >${this.filename}</span
        >
      `;
    }
    return html`
      <span class="formatted-file-name" title="${this.displayName}"
        >${this.filename}</span
      >
    `;
  }
}
