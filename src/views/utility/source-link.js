import { customElement, html, css, LitElement, property } from 'lit-element';

import { getGretilLink } from '../../api/actions';
import { getLanguageFromFilename } from './views-common';

@customElement('source-link')
export class FormattedFileName extends LitElement {
  @property({ type: String }) filename;
  @property({ type: String }) lang;
  @property({ type: String }) sourceLink = '';
  @property({ type: String }) buttonText = '';
  @property({ type: String }) titleText = '';
  @property({ type: Function }) allowFetching = false;
  @property({ type: Function }) fetchLoading = false;
  @property({ type: String }) fetchError;

  static get styles() {
    return [
      css`
        .source-link {
          background-color: var(--color-light-chartbar);
          box-shadow: var(--material-card-shadow);
          border-radius: 5px;
          font-weight: bold;
          padding: 12px;
          margin-left: 24px;
        }

        a {
          color: var(--content-link-color);
          text-decoration: none;
        }

        a:hover {
          color: var(--hover-link-color);
          text-decoration: underline;
        }
      `,
    ];
  }

  updated() {
    this.lang = getLanguageFromFilename(this.filename);
    if (this.lang === 'skt') {
      this.fetchData();
      this.buttonText = 'GRETIL';
      this.titleText =
        'Click to go to the original file in GRETIL (includes full header information).';
    } else if (this.lang === 'pli') {
      this.titleText = this.fetchTitleText(this.filename);
      this.buttonText = this.fetchButtonText(this.filename);
      this.sourceLink = this.fetchPaliSource(this.filename);
    } else if (this.lang === 'chn') {
      this.buttonText = 'CBETA';
      this.titleText =
        'Click to go to the original file in CBETA (includes additional information).';
      this.sourceLink = `http://tripitaka.cbeta.org/${this.filename.replace(
        /_[TX]/,
        'n'
      )}`;
    }
  }

  async fetchData() {
    const { gretilLink, error } = await getGretilLink({
      fileName: this.filename,
    });
    this.sourceLink = gretilLink;
    this.fetchLoading = false;
    this.fetchError = error;
  }

  fetchButtonText(filename) {
    return filename.match(/^tika|^anya|^atk/) ? `VRI` : `SC`;
  }

  fetchTitleText(filename) {
    return filename.match(/^tika|^anya|^atk/)
      ? `Click to go to the original text in VRI.`
      : `Click to go to the original text(s) in SuttaCentral (includes translations and parallels).`;
  }

  fetchPaliSource(filename) {
    return filename.match(/^tika|^anya|^atk/)
      ? `https://www.tipitaka.org/romn/`
      : `https://suttacentral.net/${filename}`;
  }

  render() {
    if (this.fetchLoading || this.lang === 'tib') {
      return;
    }
    // prettier-ignore
    return html`<span class="source-link" title="${this.titleText}">
                  <a href="${this.sourceLink}" target="blank">${this.buttonText}</a>
                </span>`
  }
}
