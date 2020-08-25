import { customElement, html, LitElement, property } from 'lit-element';
import { getDisplayName } from '../../api/actions';
import { getLanguageFromFilename } from './views-common';
import styles from './formatted-segment.styles';

@customElement('formatted-segment')
export class FormattedSegment extends LitElement {
  @property({ type: String }) segmentnr;
  @property({ type: String }) filename;
  @property({ type: String }) lang;
  @property({ type: String }) number;
  @property({ type: String }) displayName = '';
  @property({ type: Function }) allowFetching = false;
  @property({ type: Function }) fetchLoading = false;
  @property({ type: String }) fetchError;

  static get styles() {
    return [styles];
  }

  firstUpdated() {
    this.addObserver();
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
    this.lang = getLanguageFromFilename(this.segmentnr);
    this.filename = this.segmentnr.split(':')[0];
    this.number = this.segmentnr.split(':')[1];
    if (this.lang == 'chn') {
      this.filename = this.filename.replace(/_[0-9]+/, '');
    }
    const { displayData, error } = await getDisplayName({
      segmentnr: this.filename,
    });
    this.displayName = displayData ? displayData[0] : '';
    this.fetchLoading = false;
    this.allowFetching = false;
    this.fetchError = error;
  }

  render() {
    if (this.fetchLoading || !this.displayName) {
      // prettier-ignore
      return html`<span class="formatted-segment" title="${this.filename}">${this.filename}:${this.number}</span>`
    }
    // prettier-ignore
    return html`<span class="formatted-segment" title="${this.displayName}">${this.filename}:${this.number}</span>`
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

  render() {
    if (this.fetchLoading || !this.displayName) {
      // prettier-ignore
      return html`<span class="formatted-file-name" name="${this.displayName}">${this.filename}</span> `
    }
    // prettier-ignore
    return html`<span class="formatted-file-name ${this.rightside}" name="${this.displayName}">${this.textName}</span> `
  }
}
