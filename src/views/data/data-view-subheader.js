import { css, customElement, html, LitElement, property } from 'lit-element';

import '@vaadin/vaadin-button/vaadin-button.js';
import '@vaadin/vaadin-button/theme/material/vaadin-button';
import '@vaadin/vaadin-dialog/theme/material/vaadin-dialog';
import '@vaadin/vaadin-icons/vaadin-icons.js';

import '../utility/formatted-segment';
import '../utility/source-link';

import { getTableDownloadData } from '../../api/actions';

import {
  LANGUAGE_CODES,
  LANGUAGE_NAMES,
  MIN_LENGTHS,
} from '../utility/constants';

export const minimumLengthText = language => {
  let minLength;
  let languageFull;
  let charOrSyl;
  switch (language) {
    case LANGUAGE_CODES.TIBETAN:
      minLength = MIN_LENGTHS.TIBETAN;
      languageFull = LANGUAGE_NAMES.TIBETAN;
      charOrSyl = 'syllables';
      break;
    case LANGUAGE_CODES.PALI:
      minLength = MIN_LENGTHS.PALI;
      languageFull = LANGUAGE_NAMES.PALI;
      charOrSyl = 'letters';
      break;
    case LANGUAGE_CODES.SANSKRIT:
      minLength = MIN_LENGTHS.SANSKRIT;
      languageFull = LANGUAGE_NAMES.SANSKRIT;
      charOrSyl = 'letters';
      break;
    case LANGUAGE_CODES.CHINESE:
      minLength = MIN_LENGTHS.CHINESE;
      languageFull = LANGUAGE_NAMES.CHINESE;
      charOrSyl = 'characters';
      break;
    default:
      minLength = MIN_LENGTHS.TIBETAN;
      languageFull = LANGUAGE_NAMES.TIBETAN;
      charOrSyl = 'syllables';
  }
  return html`
    <p>
      The minimum Match Length for ${languageFull} texts has been set to
      ${minLength} ${charOrSyl}.
    </p>
  `;
};

@customElement('data-view-subheader')
class DataViewSubheader extends LitElement {
  @property({ type: String }) fileName;
  @property({ type: String }) infoModalContent;
  @property({ type: Boolean }) lengthMessage;
  @property({ type: String }) language;
  @property({ type: String }) extraMessage;
  @property({ type: String }) downloadData;

  @property({ type: String }) score;
  @property({ type: Number }) quoteLength;
  @property({ type: Number }) cooccurance;
  @property({ type: String }) sortMethod;
  @property({ type: Array }) limitCollection;
  @property({ type: String }) folio;

  @property({ type: Boolean }) isDialogOpen = false;

  static get styles() {
    return [
      css`
        .data-view-subheader {
          display: flex;
          align-items: center;
          font-weight: bold;
        }

        .info-button {
          padding: 24px;
          cursor: help;
        }

        .download-button {
          padding: 24px;
          cursor: copy;
        }

        .info-icon,
        .download-icon {
          color: var(--color-text-secondary);
        }

        @media screen and (max-width: 900px) {
          .info-button,
          .download-button {
            padding: 12px;
          }
        }

        vaadin-button {
          background-color: transparent;
          color: var(--color-menu-items);
          font-weight: bold;
          height: 32px;
        }

        .text-name-label {
          color: var(--color-text-secondary);
          font-weight: 500;
          font-size: 0.8em;
          display: inline-flex;
        }
      `,
    ];
  }

  openDialog = () => (this.isDialogOpen = true);

  setIsDialogOpen = e => (this.isDialogOpen = e.detail.value);

  async fetchDownloadTable() {
    alert(
      `Fetching data for ${this.fileName.toUpperCase()} with the current filter settings.
      \nThis can take some time.
      \nYour dowload will start when ready.`
    );

    // Fetch the data needed
    // let tsvData = `BuddhaNexus.net\n\nParallels data download for *${this.fileName.toUpperCase()}*\n\n`;
    // tsvData += `Inquiry Segment Nr.\tInquiry text length\tInquiry Text\tHit Segment Nr.\tHit Segment Length\tHit Segment Score\tHit Segment Text\n`;

    if (!this.fileName) {
      return;
    }
    let folio = '';
    if (this.folio) {
      folio = this.folio.num;
    }

    const downloadFile = await getTableDownloadData({
      fileName: this.fileName,
      score: this.score,
      co_occ: this.cooccurance,
      sort_method: this.sortMethod,
      par_length: this.quoteLength,
      limit_collection: this.limitCollection,
      folio: folio,
    });

    // parallels.forEach(parallel => {
    //   let rootSegmentNr = parallel.root_segnr[0];
    //   let rootSegmentText = '';
    //   let parSegmentNr = parallel.par_segnr[0];
    //   let parSegmentText = '';

    //   if (parallel.root_segnr.length > 1) {
    //     rootSegmentNr += `–${
    //       parallel.root_segnr[parallel.root_segnr.length - 1]
    //     }`;
    //   }
    //   parallel.root_seg_text.forEach(text => {
    //     rootSegmentText += text;
    //   });
    //   if (parallel.par_segnr.length > 1) {
    //     parSegmentNr += `–${parallel.par_segnr[parallel.par_segnr.length - 1]}`;
    //   }
    //   parallel.par_segment.forEach(text => {
    //     parSegmentText += text;
    //   });
    //   let tsvFields = [
    //     rootSegmentNr,
    //     parallel.root_length,
    //     rootSegmentText,
    //     parSegmentNr,
    //     parallel.par_length,
    //     parallel.score,
    //     parSegmentText,
    //   ];
    //   tsvData += `${tsvFields.join('\t')}\n`;
    // });

    // Create element to start download with the fetched data
    const url = window.URL.createObjectURL(new Blob([downloadFile]));
    const link = document.createElement('a');
    link.href = url;
    // link.setAttribute(
    //   'href',
    //   `data:xls/xls;charset=utf-8,${encodeURIComponent(tsvData)}`
    // );
    link.setAttribute('download', `${this.fileName}_table.xls`);

    link.style.display = 'none';
    document.body.appendChild(link);

    link.click();
    document.body.removeChild(link);
  }

  render() {
    if (!this.fileName) {
      //prettier-ignore
      return html`
        <div class="data-view-subheader">
          Please select a file or input a search query to continue.
        </div>
      `;
    }
    //prettier-ignore
    return html`
      <div class="data-view-subheader">
        <div class="text-name-label">Inquiry Text:</div>
        <formatted-filename .filename="${this.fileName}"></formatted-filename>&#160;
        <vaadin-button class="info-button" @click="${this.openDialog}">
          <iron-icon class="info-icon" icon="vaadin:info-circle-o"></iron-icon>
        </vaadin-button>

        <source-link .filename="${this.fileName}"></source-link>
        <vaadin-dialog
          id="info-number-view"
          aria-label="simple"
          .opened="${this.isDialogOpen}"
          @opened-changed="${this.setIsDialogOpen}">
          <template>
            ${this.infoModalContent}
            ${this.lengthMessage ? minimumLengthText(this.language) : ''}
          </template>
        </vaadin-dialog>

        ${this.downloadData
          ? html`
            <vaadin-button
              class="download-button"
              title="Download this table with current filter settings"
              @click="${this.fetchDownloadTable}">
              <iron-icon class="download-icon" icon="vaadin:download"></iron-icon>
            </vaadin-button>`
          : null}

      </div> ${this.extraMessage}
    `;
  }
}

export default DataViewSubheader;
