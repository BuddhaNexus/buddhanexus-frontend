import { customElement, html, css, LitElement, property } from 'lit-element';

import '@vaadin/vaadin-checkbox/theme/material/vaadin-checkbox';

// import { getMultilingualData } from '../../api/actions';
// import { LANGUAGE_CODES } from '../utility/constants';

@customElement('search-view-filters')
export class DataViewFiltersMultilingual extends LitElement {
  // @property({ type: String }) fileName;
  // @property({ type: Array }) multiLingTotalList;
  // @property({ type: Array }) mainLang;
  // @property({ type: Array }) multiLingualMode = [];
  // @property({ type: Array }) multiLingualBlockList = [];
  // @property({ type: Function }) updateMultiLingualMode;
  @property({ type: Boolean }) dataLoading = false;
  @property({ type: String }) dataLoadError = false;

  static get styles() {
    return [
      css`
        vaadin-checkbox {
          --material-primary-color: var(--bn-dark-red);
          --material-primary-text-color: var(--bn-dark-red);
        }

        #search-filter {
          flex-wrap: wrap;
          padding-bottom: 8px;
        }

        #search-filter-label {
          padding-bottom: 8px;
          font-size: 12px;
          opacity: 0.8;
          display: block;
        }
      `,
    ];
  }

  firstUpdated() {
    this.fetchSearchFilterData();
  }

  // updated(_changedProperties) {
  //   _changedProperties.forEach(async (oldValue, propName) => {
  //     if (propName === 'fileName' && !this.dataLoading) {
  //       this.fetchMultilingualData();
  //     }
  //   });
  // }

  // updateMultiLingualEvent = e => {
  //   if (e.target.checked) {
  //     this.multiLingualBlockList = this.multiLingualBlockList.filter(
  //       x => x !== e.target.value
  //     );
  //   } else {
  //     this.multiLingualBlockList.push(e.target.value);
  //   }
  //   this.multiLingualMode = this.multiLingTotalList.filter(
  //     x => !this.multiLingualBlockList.includes(x)
  //   );
  //   this.multiLingualMode = [...new Set(this.multiLingualMode)];
  //   this.multiLingualMode = this.multiLingualMode.filter(Boolean);
  //   this.updateMultiLingualMode(this.multiLingualMode);
  // };

  // async fetchSearchFilterData() {
  //   this.dataLoading = true;
  //   // const { langList, error } = await getMultilingualData({
  //   //   fileName: this.fileName,
  //   // });
  //   // langList.push(this.mainLang);
  //   // this.multiLingTotalList = langList;
  //   // this.multiLingualMode = langList;
  //   // if (this.multiLingualBlockList) {
  //   //   this.multiLingualMode.filter(
  //   //     x => !this.multiLingualBlockList.includes(x)
  //   //   );
  //   // }
  //   this.dataLoadError = error;
  //   this.dataLoading = false;
  //   // this.updateMultiLingualMode(this.multiLingTotalList);
  // }

  renderLanguages() {
    return html`
      <vaadin-checkbox
        value="pli"
        @checked-changed="${this.updateMultiLingualEvent}"
        checked
        >Pāḷi</vaadin-checkbox
      >
      <vaadin-checkbox
        value="skt"
        @checked-changed="${this.updateMultiLingualEvent}"
        checked
        >Sanskrit</vaadin-checkbox
      >
      <vaadin-checkbox
        value="tib"
        @checked-changed="${this.updateMultiLingualEvent}"
        checked
        >Tibetan</vaadin-checkbox
      >
      <vaadin-checkbox
        value="chn"
        @checked-changed="${this.updateMultiLingualEvent}"
        checked
        >Chinese</vaadin-checkbox
      >
    `;
  }

  render() {
    //prettier-ignore
    return html`
        <div id="search-filter-label">Choose Languages:</div>
        <div id="search-filter">
          ${this.renderLanguages()}
        </div>

      <multiselect-combo-box
        Label="Filter by target collection:"
        item-label-path="collectionname"
        class="input-field"
        @selected-items-changed="${this.handleTargetComboBoxChanged}"
        .items="${this.targetCollectionData}"
        item-value-path="collectionkey">
      </multiselect-combo-box>
      `;
  }
}
