import { customElement, html, LitElement, property } from 'lit-element';

import '@vaadin/vaadin-combo-box/theme/material/vaadin-combo-box';
import '@vaadin/vaadin-button/theme/material/vaadin-button';
import '@vaadin/vaadin-icons/vaadin-icons';
import 'multiselect-combo-box/theme/material/multiselect-combo-box';
import '@vaadin/vaadin-dialog/theme/material/vaadin-dialog';

import { getCollectionsForVisual } from '../menus/actions';
import '../components/card';

import styles from './visual-view-header.styles';

@customElement('visual-view-header')
export class VisualViewHeader extends LitElement {
  @property({ type: String }) searchItem = '';
  @property({ type: String }) colorScheme = 'Gradient';
  @property({ type: Array }) languages = [
    { language: 'tib', label: 'Tibetan' },
    { language: 'pli', label: 'Pāli' },
    { language: 'skt', label: 'Sanskrit' },
    { language: 'chn', label: 'Chinese' },
  ];
  @property({ type: Array }) colorSchemeValues = [
    'Gradient',
    'Inquiry Collection',
    'Hit Collection',
  ];
  @property({ type: String }) activeLanguage;
  @property({ type: Array }) collectionData;
  @property({ type: Array }) targetCollectionData;
  @property({ type: Array }) selectedCollections = [];
  @property({ type: Function }) setSelection;
  @property({ type: Function }) setColorScheme;
  @property({ type: Function }) toggleNavBar;
  @property({ type: Boolean }) isDialogOpen;
  @property({ type: String }) fetchError;

  static get styles() {
    return [styles];
  }

  async firstUpdated(_changedProperties) {
    super.firstUpdated(_changedProperties);
    this.fetchData();
  }

  updated(_changedProperties) {
    _changedProperties.forEach((oldValue, propName) => {
      if (propName === 'searchItem') {
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
    const { result, error } = await getCollectionsForVisual();
    this.collectionData = result;
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

  handleLanguageChanged(e) {
    this.activeLanguage = e.target.value;
  }

  returnToMainCollection() {
    if (this.searchItem && this.selectedCollections.length > 0) {
      this.setSelection(this.searchItem, this.selectedCollections);
    }
  }

  limitCollectionData(collection) {
    let resultCollection = collection.map(entry => {
      if (entry.collectionlanguage == this.activeLanguage) {
        return entry;
      }
    });
    return resultCollection;
  }

  handleColorSchemeChanged(e) {
    this.colorScheme = e.target.value;
    if (this.colorScheme) {
      this.setColorScheme(this.colorScheme);
    }
  }

  // TODO: Move info the dialog to a separate element. Also in graph view.
  openDialog = () => (this.isDialogOpen = true);

  setIsDialogOpen = e => (this.isDialogOpen = e.detail.value);

  render() {
    //prettier-ignore
    return html`
      <div class="selection-box">
        <bn-card>
          <vaadin-dialog
            id="info-visual"
            aria-label="simple"
            .opened="${this.isDialogOpen}"
            @opened-changed="${this.setIsDialogOpen}">
            <template>
              Select the Inquiry and Hit Collections. More than one Hit
              Collection can be selected. To reduce the view to a single
              subsection, click on the pertinent coloured bar in the Inquiry
              Collection (left). The view can be further reduced to a single
              text. A click on a single text will open the text view where the
              individual matches will be displayed.
            </template>
          </vaadin-dialog>

          <iron-icon
            icon="vaadin:desktop"
            title="Toggle Full Screen Mode"
            @click="${this.toggleNavBar}"
            class="nav-bar-toggle-icon">
          </iron-icon>

          <vaadin-button class="info-button" @click="${this.openDialog}">
            <iron-icon
              class="info-icon"
              icon="vaadin:info-circle-o">
            </iron-icon>
          </vaadin-button>

          ${this.activeLanguage
            ? html`
                <vaadin-combo-box
                  id="visual-view-collection-dropdown"
                  label="Inquiry Collection"
                  item-label-path="collectionname"
                  item-value-path="collectionkey"
                  selected-item="${this.searchItem}"
                  @value-changed="${this.handleCollectionChanged}"
                  .items="${this.limitCollectionData(this.collectionData)}">
                  <template>
                    <strong style="display: inline; margin-bottom: 4px;">[[item.collectionname]]</strong>
                  </template>
                </vaadin-combo-box>

                ${this.searchItem
                  ? html`
                      <multiselect-combo-box
                        Label="Hit Collections"
                        id="target-visual-view-dropdown"
                        item-label-path="collectionname"
                        @selected-items-changed="${this
                          .handleTargetCollectionChanged}"
                        .items="${this.targetCollectionData}"
                        item-value-path="collectionkey">
                      </multiselect-combo-box>

                      <vaadin-combo-box
                        id="color-scheme-dropdown"
                        label="Color Scheme"
                        selected-item="${this.colorScheme}"
                        .items="${this.colorSchemeValues}"
                        @value-changed="${this.handleColorSchemeChanged}">
                      </vaadin-combo-box>

                      <vaadin-button
                        id="visual-back-button"
                        theme="contrast primary small"
                        @click="${this.returnToMainCollection}"
                        title="Return to top level">
                        <iron-icon
                          id="visual-back-icon"
                          icon="vaadin:backwards"
                          slot="prefix">
                        </iron-icon>
                      </vaadin-button>
                    `
                  : null}
              `
            : null}
        </bn-card>
      </div>
    `;
  }
}
