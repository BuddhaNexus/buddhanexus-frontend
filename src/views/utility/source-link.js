import { customElement, html, css, LitElement, property } from 'lit-element';

import { getExternalLink } from '../../api/actions';
import { getLanguageFromFilename } from './views-common';

@customElement('source-link')
export class FormattedFileName extends LitElement {
  @property({ type: String }) filename;
  @property({ type: String }) lang;
  @property({ type: String }) sourceLink = '';
  @property({ type: String }) imgLink = '';
  @property({ type: String }) imgLink2 = '';
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
          padding-left: 4px;
        }

        a:hover {
          color: var(--hover-link-color);
        }

        .image-link {
          height: 30px;
          vertical-align: middle;
          padding-bottom: 6px;
          padding-left: 4px;
        }
      `,
    ];
  }

  updated() {
    this.lang = getLanguageFromFilename(this.filename);
    if (this.lang === 'skt') {
      this.fetchData();
      if (this.filename.match(/[X0-9]n[0-9]/)) {
          this.buttonText = 'DSBC';
          this.imgLink = '../../src/assets/icons/dsbc_logo.png';
          this.titleText =
                `Click to go to the original file in the Digital Sanskrit
                Buddhist Canon (includes full header information).`;
      } else {
          this.buttonText = 'GRETIL';
          this.imgLink = '../../src/assets/icons/gretil_logo.png';
          this.titleText =
                  `Click to go to the original file in GRETIL
                  (includes full header information).`;
      }
    }

    if (this.lang === 'tib') {
      this.fetchData();
      this.buttonText = 'Click to visit the file in the Buddhist Digital Resource Center.';
      this.buttonText2 = 'Click to visit the file at Resources for Kanjur & Tanjur Studies .';
      this.imgLink = '../../src/assets/icons/bdrc_logo.png';
      this.imgLink2 = '../../src/assets/icons/rkts_logo.png';
      this.titleText2 =
        'Click to visit the file in the Buddhist Digital Resource Center.';
    } else if (this.lang === 'pli') {
      this.titleText = this.fetchTitleText(this.filename);
      this.imgLink = this.fetchImageLink(this.filename);
      this.buttonText = this.fetchButtonText(this.filename);
      this.sourceLink = this.fetchPaliSource(this.filename);
    } else if (this.lang === 'chn') {
      this.buttonText = 'CBETA';
      this.imgLink = '../../src/assets/icons/cbeta_logo.png';
      this.titleText =
        'Click to go to the original file in CBETA (includes additional information).';
      this.sourceLink = `https://cbetaonline.dila.edu.tw/${this.filename.replace(
        /_[TX]/,
        'n'
      )}_001`;
    }
  }

  async fetchData() {
    const { link, error } = await getExternalLink({
      fileName: this.filename,
    });
      this.sourceLink = link;
      if (this.lang == "tib") {
        this.sourceLink2 = link.replace("http://purl.bdrc.io/resource/WA0RK","http://purl.rkts.eu/resource/WKT")
        this.sourceLink2 = this.sourceLink2.replace("http://purl.bdrc.io/resource/WA0RT","https://www.istb.univie.ac.at/kanjur/rktsneu/verif/verif3.php?id=")
      }
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

  fetchImageLink(filename) {
    return filename.match(/^tika|^anya|^atk/)
      ? '../../src/assets/icons/vri_logo.gif'
      : '../../src/assets/icons/sc_logo.png';
  }

  fetchPaliSource(filename) {
    return filename.match(/^tika|^anya|^atk/)
      ? `https://www.tipitaka.org/romn/`
      : `https://suttacentral.net/${filename}`;
  }

  render() {
    if (this.fetchLoading) {
      return;
    }
      // prettier-ignore
    if (this.lang != "tib") {
      return html`<span class="source-link" title="${this.titleText}">Links:&nbsp;
                  <a href="${this.sourceLink}"
                     target="blank">${this.buttonText} <img class="image-link" target="_blank" src="${this.imgLink}"/></a>`
    } else {
      if (!this.filename.includes("N")) { // for the time being, exclude NG/NK files from linking
        return html`<span class="source-link">Links:&nbsp;
                    <a href="${this.sourceLink}"
                       title="${this.buttonText}"
                       target="blank"><img class="image-link" target="_blank" src="${this.imgLink}"/></a>
                    <a href="${this.sourceLink2}"
                       title="${this.buttonText2}"
                       target="blank"><img class="image-link" target="_blank" src="${this.imgLink2}"/></a>`
      }
    }
  }
}
