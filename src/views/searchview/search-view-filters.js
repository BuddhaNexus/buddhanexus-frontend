import { customElement, html, css, LitElement, property } from 'lit-element';

import '@vaadin/vaadin-checkbox/theme/material/vaadin-checkbox';

import { getCollectionsForVisual } from '../menus/actions';
import { LANGUAGE_CODES, LANGUAGE_NAMES } from '../utility/constants';

@customElement('search-view-filters')
export class DataViewFiltersMultilingual extends LitElement {
  @property({ type: Function }) setFilterSelection;

  @property({ type: Array }) multiLingTotalList = [];
  @property({ type: Array }) collectionData;
  @property({ type: Array }) collectionDataForDropdown;
  @property({ type: Array }) selectedCollections;
  @property({ type: Boolean }) fetchError;

  static get styles() {
    return [
      css`
        vaadin-checkbox,
        .input-field {
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

        .input-field {
          padding-right: 16px;
          width: calc(100% - 32px);
        }
      `,
    ];
  }

  async firstUpdated(_changedProperties) {
    super.firstUpdated(_changedProperties);
    this.fetchData();
  }

  updateMultiLingualEvent = e => {
    let languageList = this.multiLingTotalList;
    if (e.target.checked) {
      languageList.push(e.target.value);
    } else {
      let index = languageList.indexOf(e.target.value);
      languageList.splice(index, 1);
    }
    this.multiLingTotalList = languageList;
    this.createDropdownData(this.collectionData);
    // if (!this.selectedCollections || this.selectedCollections.length == 0) {
    //     this.setFilterSelection(this.multiLingTotalList);
    // }
  };

  async fetchData() {
    const { result, error } = await getCollectionsForVisual();
    this.collectionData = result;
    this.createDropdownData(result);
    this.fetchError = error;
  }

  createDropdownData(collectionData) {
    if (!collectionData) {
      return;
    }
    let newCollectionData = [];
    for (let languageCode in LANGUAGE_CODES) {
      let newLanguageLabel = {};
      if (this.multiLingTotalList.includes(LANGUAGE_CODES[languageCode])) {
        newLanguageLabel['collectionname'] =
          LANGUAGE_NAMES[languageCode].toUpperCase() + ' (All)';
        newLanguageLabel['collectionkey'] =
          LANGUAGE_CODES[languageCode] + '_all';
        newCollectionData.push(newLanguageLabel);
        collectionData.map(item => {
          if (LANGUAGE_CODES[languageCode] == item.collectionlanguage) {
            if (!item.collectionname.startsWith('• ')) {
              item.collectionname = '• ' + item.collectionname;
            }
            newCollectionData.push(item);
          }
        });
      }
    }
    this.collectionDataForDropdown = newCollectionData;
  }

  handleTargetCollectionChanged(e) {
    this.selectedCollections = e.detail.value.map(item => item.collectionkey);
    if (this.selectedCollections && this.selectedCollections.length > 0) {
      this.setFilterSelection(this.selectedCollections);
    }
  }

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
          class="input-field"
          item-label-path="collectionname"
          @selected-items-changed="${this
            .handleTargetCollectionChanged}"
          .items="${this.collectionDataForDropdown}"
          item-value-path="collectionkey">
          <template>
            <b>[[item.collectionname]]</b> [[item.collectionlanguage]]<br />
          </template>
        </multiselect-combo-box>
      `;
  }
}
