import { customElement, html, css, LitElement, property } from 'lit-element';

import { getExternalLink } from '../../api/actions';
import { getLanguageFromFilename } from './views-common';

import { SOURCE_BUTTONS, LANGUAGE_CODES } from './constants';

@customElement('source-link')
export class FormattedFileName extends LitElement {
  @property({ type: String }) filename;
  @property({ type: String }) lang;
  @property({ type: String }) sourceLink = '';
  @property({ type: String }) imgLink = '';
  @property({ type: String }) imgLink2 = '';
  @property({ type: String }) buttonText = '';
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

    switch (this.lang) {
      case LANGUAGE_CODES.TIBETAN:
        this.fetchData();
        this.buttonText = SOURCE_BUTTONS.BDRC[1];
        this.buttonText2 = SOURCE_BUTTONS.RKTS[1];
        this.imgLink = SOURCE_BUTTONS.BDRC[0];
        this.imgLink2 = SOURCE_BUTTONS.RKTS[0];
        break;
      case LANGUAGE_CODES.PALI:
        this.imgLink = this.fetchImageLink(this.filename);
        this.buttonText = this.fetchButtonText(this.filename);
        this.sourceLink = this.fetchPaliSource(this.filename);
        break;
      case LANGUAGE_CODES.SANSKRIT:
        this.fetchData();
        if (this.filename.match(/[X0-9]n[0-9]/)) {
          this.buttonText = SOURCE_BUTTONS.DSBC[1];
          this.imgLink = SOURCE_BUTTONS.DSBC[0];
        } else {
          this.buttonText = SOURCE_BUTTONS.GRETIL[1];
          this.imgLink = SOURCE_BUTTONS.GRETIL[0];
        }
        this.buttonText2 = SOURCE_BUTTONS.SC[1];
        this.imgLink2 = SOURCE_BUTTONS.SC[0];
        break;
      case LANGUAGE_CODES.CHINESE:
        this.fetchData();
        this.buttonText = SOURCE_BUTTONS.CBETA[1];
        this.imgLink = SOURCE_BUTTONS.CBETA[0];
        this.buttonText2 = SOURCE_BUTTONS.SC[1];
        this.imgLink2 = SOURCE_BUTTONS.SC[0];
        break;
      default:
        this.buttonText = '';
        this.imgLink = '';
        this.buttonText2 = '';
        this.imgLink2 = '';
    }
  }

  async fetchData() {
    const { link, error } = await getExternalLink({
      fileName: this.filename,
    });
    switch (this.lang) {
      case LANGUAGE_CODES.TIBETAN:
        this.sourceLink = link[0];
        this.sourceLink2 = link[0].replace(
          'http://purl.bdrc.io/resource/WA0RK',
          'http://purl.rkts.eu/resource/WKT'
        );
        this.sourceLink2 = this.sourceLink2.replace(
          'http://purl.bdrc.io/resource/WA0RT',
          'https://www.istb.univie.ac.at/kanjur/rktsneu/verif/verif3.php?id='
        );
        break;
      case LANGUAGE_CODES.SANSKRIT:
        this.sourceLink = link[0];
        this.sourceLink2 = link[1];
        break;
      case LANGUAGE_CODES.CHINESE:
        this.sourceLink = this.sourceLink = `https://cbetaonline.dila.edu.tw/${this.filename.replace(
          /_[TX]/,
          'n'
        )}_001`;
        this.sourceLink2 = link[1];
        break;
    }
    this.fetchLoading = false;
    this.fetchError = error;
  }

  fetchButtonText(filename) {
    return filename.match(/^tika|^anya|^atk/)
      ? SOURCE_BUTTONS.VRI[1]
      : SOURCE_BUTTONS.SC[1];
  }

  fetchImageLink(filename) {
    return filename.match(/^tika|^anya|^atk/)
      ? SOURCE_BUTTONS.VRI[0]
      : SOURCE_BUTTONS.SC[0];
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
    if (!this.filename.startsWith("N")) { // for the time being, exclude NG/NK files from linking
      return html`<span class="source-link">Links:&nbsp;
                    <a href="${this.sourceLink}"
                       title="${this.buttonText}"
                       target="_blank"><img class="image-link" src="${this.imgLink}"/></a>

                  ${this.sourceLink2
                    ? html`
                        <a href="${this.sourceLink2}"
                          title="${this.buttonText2}"
                          target="_blank"><img class="image-link" src="${this.imgLink2}"/></a>`
                    : null}
                  </span>`
    }
    return;
  }
}
