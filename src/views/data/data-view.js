/**
 * @file data-view is the container component of table-view, numbers-view, table-view and graph-view.
 *
 * @todo:
 * - pass filter values inside an object instead of separately in order to simplify code.
 * - get rid of one of this.selectedView/this.viewMode
 */

import { customElement, html, LitElement, property } from 'lit-element';

import '../menus/navigation-menu.js';
import './text-select-combo-box';
// import '../menus/navigation-menu.js'; Needs to go in when menu is rendered.
import { updateFileParamInBrowserLocation } from './dataViewUtils';
import './data-view-router';

import dataViewStyles from './data-view.styles';

@customElement('data-view')
export class DataView extends LitElement {
  @property({ type: String }) fileName = '';
  @property({ type: String }) language;
  @property({ type: Number }) score = 50;
  @property({ type: Number }) quoteLength = 12;
  @property({ type: Number }) cooccurance = 2000;
  @property({ type: Array }) targetCollection = [];
  @property({ type: Array }) limitCollection = [];
  @property({ type: String }) searchString;
  @property({ type: String }) sortMethod = 'position';
  @property({ type: String }) viewMode;
  @property({ type: String }) activeSegment;

  @property({ type: String }) selectedView;

  static get styles() {
    return [dataViewStyles];
  }

  connectedCallback() {
    super.connectedCallback();
    this.updateViewModeParamInUrl();
    this.setFileParamFromPath();
    this.setCurrentLanguageFromPath();
  }

  firstUpdated(_changedProperties) {
    super.firstUpdated(_changedProperties);
    this.handleViewModeParamChanged();
    this.cooccurance = this.language === 'pli' ? 15 : 2000;
    this.quoteLength = this.language === 'chn' ? 7 : 12;
  }

  updated(_changedProperties) {
    _changedProperties.forEach((oldValue, propName) => {
      if (propName === 'fileName') {
        this.updateFileNameParamInUrl(this.fileName, this.activeSegment);
      }
      if (
        ['score', 'cooccurance', 'sortMethod', 'quoteLength'].includes(propName)
      ) {
        this.applyFilter();
      }
    });
  }

  handleViewModeParamChanged() {
    this.handleViewModeChanged(this.location.params.viewMode.toLowerCase());
  }

  setFileParamFromPath() {
    const { fileName, activeSegment } = this.location.params;
    if (fileName) {
      this.fileName = fileName;
      this.activeSegment = activeSegment;
    }
  }

  setCurrentLanguageFromPath() {
    this.language = this.location.pathname.split('/')[1];
  }

  setFileName = fileName => (this.fileName = fileName);

  setScore = e => {
    this.score = e.target.value;
  };

  setSearch = e => {
    this.searchString = e.target.value;
  };
  setQuoteLength = e => {
    this.quoteLength = e.target.value;
  };

  setCooccurance = e => {
    this.cooccurance = e.target.value;
    // if the user sets the value to 30, this means all co-ocs are displayed.
    if (this.cooccurance > 29) {
      this.cooccurance = 10000;
    }
  };

  setSortMethod = e => (this.sortMethod = e.target.value);

  setLimitCollection = limitCollection => {
    // if we don't do this check, limitCollection gets updated constantly and triggers refetching of the data which is very undesired.
    if (this.limitCollection.toString() !== limitCollection.toString()) {
      this.limitCollection = limitCollection;
      console.log('LIMIT COLLECTION', this.limitCollection);
    }
    if (this.fileName) {
      this.applyFilter();
    }
  };

  setLimitCollectionExclude = limitCollectionExclude => {
    // if we don't do this check, limitCollection gets updated constantly and triggers refetching of the data which is very undesired.
    if (this.limitCollection.toString() !== limitCollectionExclude.toString()) {
      this.limitCollectionExclude = limitCollectionExclude;
    }
    if (this.fileName) {
      this.applyFilter();
    }
  };

  setTargetCollection = targetCollection => {
    this.targetCollection = targetCollection;
    if (this.fileName) {
      this.applyFilter();
    }
  };

  updateFileNameParamInUrl(fileName, activeSegment) {
    if (!fileName) {
      return;
    }
    const { fileName: oldFileParam } = this.location.params;
    this.location.params.fileName = fileName;
    updateFileParamInBrowserLocation(!oldFileParam, fileName, activeSegment);
  }

  updateViewModeParamInUrl(newViewMode) {
    const { viewMode: viewModeParam } = this.location.params;
    const pathParams = location.href.split('/');
    this.viewMode = viewModeParam;

    if (!viewModeParam) {
      updateFileParamInBrowserLocation();
    } else if (!newViewMode) {
      return;
    } else if (viewModeParam !== newViewMode) {
      const viewModeParamIndex = pathParams.indexOf(this.language) + 1;
      pathParams[viewModeParamIndex] = newViewMode;
      const newUrl = pathParams.join('/');
      history.replaceState({}, null, newUrl);
      this.location.pathname = newUrl;
    }
    this.location.params.viewMode = newViewMode;
  }

  handleViewModeChanged(newViewMode) {
    if (newViewMode === this.viewMode) {
      return;
    }
    console.log('NEW VIEW MODE', newViewMode);
    this.updateViewModeParamInUrl(newViewMode);
    this.viewMode = newViewMode;
    this.selectedView = newViewMode;

    if (this.fileName) {
      this.applyFilter();
    }
  }

  applyFilter() {
    this.selectedView = this.viewMode;
  }

  render() {
    return html`
      <div class="data-view-container" lang="${this.language}">
        <div class="data-view-options-card">
          <text-select-combo-box
            .language="${this.language}"
            .fileName="${this.fileName}"
            .setFileName="${this.setFileName}"
          ></text-select-combo-box>

          <data-view-filters-container
            .viewMode="${this.viewMode}"
            .handleViewModeChanged="${viewMode =>
              this.handleViewModeChanged(viewMode)}"
            .score="${this.score}"
            .updateScore="${this.setScore}"
            .updateSearch="${this.setSearch}"
            .updateSortMethod="${this.setSortMethod}"
            .quoteLength="${this.quoteLength}"
            .updateQuoteLength="${this.setQuoteLength}"
            .updateLimitCollection="${this.setLimitCollection}"
            .updateTargetCollection="${this.setTargetCollection}"
            .cooccurance="${this.cooccurance}"
            .updateCooccurance="${this.setCooccurance}"
            .updateSorting="${this.setSortMethod}"
            .language="${this.language}"
          ></data-view-filters-container>
        </div>
        <data-view-router
          .selectedView="${this.selectedView}"
          .fileName="${this.fileName}"
          .activeSegment="${this.activeSegment}"
          .limitCollection="${this.limitCollection}"
          .targetCollection="${this.targetCollection}"
          .quoteLength="${this.quoteLength}"
          .cooccurance="${this.cooccurance}"
          .score="${this.score}"
          .sortMethod="${this.sortMethod}"
          .searchString="${this.searchString}"
        ></data-view-router>
      </div>
    `;
  }
}
