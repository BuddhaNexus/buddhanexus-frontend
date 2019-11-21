import { customElement, html, LitElement, property } from 'lit-element';

import '@vaadin/vaadin-combo-box/theme/material/vaadin-combo-box';
import '@vaadin/vaadin-button/theme/material/vaadin-button';
import '@vaadin/vaadin-icons/vaadin-icons';
import 'multiselect-combo-box/theme/material/multiselect-combo-box';

import { getCollectionsForVisual } from '../menus/actions';

import styles from './visual-view-header.styles';

@customElement('visual-view-header')
export class VisualViewHeader extends LitElement {
  @property({ type: String }) searchItem = '';
  @property({ type: Array }) collectionData;
  @property({ type: Array }) targetCollectionData;
  @property({ type: Array }) selectedCollections = [];
  @property({ type: Function }) setSelection;
  @property({ type: Function }) setPageSize;
  @property({ type: String }) fetchError;

  static get styles() {
    return [styles];
  }

  async firstUpdated(_changedProperties) {
    super.firstUpdated(_changedProperties);
    this.fetchData();
  }

  updated(_changedProperties) {
    console.log('visual header properties updated. ', _changedProperties);
    _changedProperties.forEach((oldValue, propName) => {
      if (['searchItem'].includes(propName)) {
        this.setTargetCollectionData();
      }
    });
  }

  setTargetCollectionData() {
    let language = this.searchItem.substr(0, 3);
    let targetCollectionData = [];
    this.collectionData.forEach(collection => {
      if (collection.collectionlanguage === language) {
        targetCollectionData.push(collection);
      }
    });
    this.targetCollectionData = targetCollectionData;
    this.shadowRoot
      .querySelector('#target-visual-view-dropdown')
      ._handleRemoveAllItems();
  }

  async fetchData() {
    console.log('visual chart menu: fetching data');

    const { result, error } = await getCollectionsForVisual();

    // This is a temporary hack to take out sanskrit data collections.
    const filteredResults = result.filter(
      entry => entry.collectionlanguage !== 'skt'
    );
    this.collectionData = filteredResults;
    this.fetchError = error;
  }

  handleTargetCollectionChanged(e) {
    this.selectedCollections = e.detail.value.map(item => item.collectionkey);
    if (this.selectedCollections.length > 0) {
      this.setSelection(this.searchItem, this.selectedCollections);
    }
  }

  handleCollectionChanged(e) {
    this.searchItem = e.target.value;
    this.selectedCollections = [];
  }

  returnToMainCollection() {
    if (this.searchItem && this.selectedCollections.length > 0) {
      this.setSelection(this.searchItem + '_', this.selectedCollections);
    }
  }

  render() {
    return html`
      <p class="explanation-text">
        Select the main source and target collections.<br />Click on any
        collection on the left side in the chart to open it.
      </p>
      <div class="selection-box">
        <vaadin-combo-box
          id="visual-view-dropdown"
          label="Source Collection"
          item-label-path="collectionname"
          item-value-path="collectionkey"
          selected-item="${this.searchItem}"
          @value-changed="${this.handleCollectionChanged}"
          .items="${this.collectionData}"
        >
          <template>
            <strong style="display: inline; margin-bottom: 4px;"
              >[[item.collectionname]]</strong
            >
            <small style="display: inline;">[[item.collectionlanguage]]</small>
          </template>
        </vaadin-combo-box>

        ${this.searchItem
          ? html`
              <vaadin-button
                theme="contrast primary small"
                id="visual-back-button"
                @click="${this.returnToMainCollection}"
                title="Return to main source collection"
              >
                <iron-icon
                  id="visual-back-icon"
                  icon="vaadin:arrow-circle-left-o"
                  slot="prefix"
                ></iron-icon>
              </vaadin-button>
              <multiselect-combo-box
                Label="Target Collections:"
                id="target-visual-view-dropdown"
                item-label-path="collectionname"
                @selected-items-changed="${this.handleTargetCollectionChanged}"
                .items="${this.targetCollectionData}"
                item-value-path="collectionkey"
              >
              </multiselect-combo-box>
            `
          : null}
      </div>
    `;
  }
}
