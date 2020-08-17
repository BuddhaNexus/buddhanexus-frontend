/**
 * @file data-view is the container component of table-view, numbers-view, table-view and graph-view.
 *
 * @todo:
 * - pass filter values inside an object instead of separately in order to simplify code.
 * - get rid of one of this.selectedView/this.viewMode
 */

import { customElement, html, LitElement, property } from 'lit-element';

import '../menus/navigation-menu.js';
import '../components/side-sheet';
import '../components/card';
import { updateFileParamInBrowserLocation } from './dataViewUtils';
import './data-view-router';
import './data-view-filters-container';
import './data-view-settings-container';
import './data-view-view-selector';
import './data-view-header';

import '../utility/total-numbers';
import { getLanguageFromFilename } from '../utility/views-common';
import dataViewStyles from './data-view.styles';
import { getMainLayout } from '../utility/utils';
import { DATA_VIEW_MODES } from './data-view-filters-container';
import {
  LANGUAGE_CODES,
  MIN_LENGTHS,
  DEFAULT_SCORES,
} from '../utility/constants';

@customElement('data-view')
export class DataView extends LitElement {
  @property({ type: String }) fileName = '';
  @property({ type: String }) language;
  @property({ type: Number }) score;
  @property({ type: Number }) quoteLength;
  @property({ type: Number }) minLength;
  @property({ type: Number }) cooccurance = 2000; // just put it to a high value so it is practically disabled per default.
  @property({ type: Array }) targetCollection = [];
  @property({ type: Array }) limitCollection = [];
  @property({ type: Array }) setLimitOrTargetCollection = [];
  @property({ type: String }) searchString;
  @property({ type: String }) sortMethod = 'position';
  @property({ type: String }) viewMode;
  @property({ type: String }) activeSegment;
  @property({ type: String }) folio;
  @property({ type: String }) selectedView;
  @property({ type: Boolean }) filterBarOpen;
  @property({ type: Boolean }) showSegmentNumbers;
  @property({ type: String }) segmentDisplaySide;

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
    switch (this.language) {
      case LANGUAGE_CODES.TIBETAN:
        this.quoteLength = MIN_LENGTHS.TIBETAN;
        this.score = DEFAULT_SCORES.TIBETAN;
        break;
      case LANGUAGE_CODES.PALI:
        this.quoteLength = MIN_LENGTHS.PALI;
        this.score = DEFAULT_SCORES.PALI;
        break;
      case LANGUAGE_CODES.SANSKRIT:
        this.quoteLength = MIN_LENGTHS.SANSKRIT;
        this.score = DEFAULT_SCORES.SANSKRIT;
        break;
      case LANGUAGE_CODES.CHINESE:
        this.quoteLength = MIN_LENGTHS.CHINESE;
        this.score = DEFAULT_SCORES.CHINESE;
        break;
      default:
        this.quoteLength = MIN_LENGTHS.TIBETAN;
        this.score = DEFAULT_SCORES.TIBETAN;
    }
    this.minLength = this.quoteLength;
    this.checkSelectedView();
  }

  updated(_changedProperties) {
    this.checkSelectedView();
    _changedProperties.forEach((oldValue, propName) => {
      if (propName === 'fileName') {
        this.updateFileNameParamInUrl(this.fileName, this.activeSegment);
      }
      if (
        ['score', 'cooccurance', 'sortMethod', 'quoteLength'].includes(propName)
      ) {
        this.applyFilter();
      }
      if (propName === 'language') {
        getMainLayout()
          .querySelector('navigation-menu')
          .setAttribute('language', this.language);
      }
      if (
        ['limitCollection', 'targetCollection', 'viewMode'].includes(propName)
      ) {
        this.setLimitOrTargetCollection =
          this.viewMode == 'graph'
            ? this.targetCollection
            : this.limitCollection;
      }
    });
  }

  handleViewModeParamChanged = () => {
    this.handleViewModeChanged(this.location.params.viewMode.toLowerCase());
  };

  setFileParamFromPath() {
    const { fileName, activeSegment } = this.location.params;
    if (fileName) {
      if (fileName !== this.fileName) {
        this.fileName = fileName;
        this.language = getLanguageFromFilename(fileName);
      }
      // This to revert a previous hack because dots in the segmentnumber are not accepted in the routing.
      if (activeSegment) {
        this.activeSegment = activeSegment.replace(/@/g, '.');
      }
    }
  }

  checkSelectedView() {
    if (this.selectedView === DATA_VIEW_MODES.NEUTRAL && this.fileName) {
      this.selectedView = DATA_VIEW_MODES.TEXT;
      this.viewMode = DATA_VIEW_MODES.TEXT;
      const newUrl = this.location.pathname.replace('neutral', 'text');
      this.location.pathname = newUrl;
      history.replaceState({}, null, newUrl);
    }
  }

  setCurrentLanguageFromPath() {
    this.language = this.location.pathname.split('/')[1];
  }

  setFileName = fileName => {
    // Is it the case that we might trigger a re-rendering in case the variable value is the
    // same but it get's updated anyway? I suspect this is happening, this is why I added the if-statements here.
    if (this.fileName !== fileName) {
      this.fileName = fileName;
    }
  };

  setSelectedView = viewName => {
    this.selectedView = viewName;
    this.viewMode = viewName;
  };

  setFolio = folio => {
    if (this.folio !== folio) {
      this.folio = folio;
    }
  };

  setScore = e => {
    if (e.target.value !== this.score) {
      this.score = e.target.value;
    }
  };

  setSearch = searchString => {
    this.searchString = searchString;
    this.viewMode = DATA_VIEW_MODES.TEXT_SEARCH;
    this.selectedView = DATA_VIEW_MODES.TEXT_SEARCH;
  };

  setQuoteLength = e => {
    if (e.target.value !== this.quoteLength) {
      this.quoteLength = e.target.value;
    }
  };

  setCooccurance = e => {
    if (e.target.value !== this.cooccurance) {
      this.cooccurance = e.target.value;
    }
    // if the user sets the value to 30, we force it very high so all co-ocs are displayed.
    if (this.cooccurance > 29) {
      this.cooccurance = 10000;
    }
  };

  setSortMethod = e => (this.sortMethod = e.target.value);

  setLimitCollection = limitCollection => {
    // if we don't do this check, limitCollection gets updated constantly and triggers refetching of the data which is very undesired.
    if (this.limitCollection.toString() !== limitCollection.toString()) {
      this.limitCollection = limitCollection;
      this.setLimitOrTargetCollection =
        this.viewMode == 'graph' ? this.targetCollection : this.limitCollection;
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

  updateViewModeParamInUrl = newViewMode => {
    const { viewMode: viewModeParam } = this.location.params;
    this.viewMode = viewModeParam;

    if (!viewModeParam) {
      updateFileParamInBrowserLocation();
    } else if (!newViewMode) {
      return;
    } else if (viewModeParam !== newViewMode) {
      const pathParams = location.href.split('/');
      const viewModeParamIndex = pathParams.indexOf(this.language) + 1;
      pathParams[viewModeParamIndex] = newViewMode;
      const newUrl = pathParams.join('/');
      // TODO: check if history.replaceState can be replaced by Router.go
      history.replaceState({}, null, newUrl);
      this.location.pathname = newUrl;
    }
    this.location.params.viewMode = newViewMode;
  };

  handleViewModeChanged = newViewMode => {
    if (newViewMode === this.viewMode) {
      return;
    }
    this.updateViewModeParamInUrl(newViewMode);
    this.viewMode = newViewMode;
    this.selectedView = newViewMode;

    if (this.fileName) {
      this.applyFilter();
    }
  };

  applyFilter() {
    this.selectedView = this.viewMode;
  }

  toggleFilterBarOpen = () => {
    this.filterBarOpen = !this.filterBarOpen;
  };

  toggleShowSegmentNumbers = e => {
    this.showSegmentNumbers = e.detail.value;
  };

  toggleSegmentDisplaySide = e => {
    this.segmentDisplaySide = e.target.value;
  };

  render() {
    //prettier-ignore
    return html`
      <div class="data-view" lang="${this.language}" view="${this.viewMode}">
        <div class="data-view__main-container">
          <data-view-header
            .language="${this.language}"
            .fileName="${this.fileName}"
            .setFileName="${this.setFileName}"
            .viewMode="${this.viewMode}"
            .handleViewModeChanged="${this.handleViewModeChanged}"
            .folio="${this.folio}"
            .setFolio="${this.setFolio}"
            .filterBarOpen="${this.filterBarOpen}"
            .toggleFilterBarOpen="${this.toggleFilterBarOpen}"
            .updateSearch="${this.setSearch}"
            .updateSortMethod="${this.setSortMethod}">
          </data-view-header>

          <data-view-router
            .selectedView="${this.selectedView}"
            .setSelectedView="${this.setSelectedView}"
            .lang="${this.language}"
            .setFileName="${this.setFileName}"
            .fileName="${this.fileName}"
            .activeSegment="${this.activeSegment}"
            .folio="${this.folio}"
            .limitCollection="${this.limitCollection}"
            .targetCollection="${this.targetCollection}"
            .quoteLength="${this.quoteLength}"
            .cooccurance="${this.cooccurance}"
            .score="${this.score}"
            .sortMethod="${this.sortMethod}"
            .searchString="${this.searchString}"
            .showSegmentNumbers="${this.showSegmentNumbers}"
            .segmentDisplaySide="${this.segmentDisplaySide}">
          </data-view-router>
        </div>

        <side-sheet
          id="filter-menu"
          class="${this.filterBarOpen
            ? 'side-sheet--open'
            : 'side-sheet--closed'}"
          .handleClose="${() => {
            this.filterBarOpen = false;
          }}">
          <data-view-total-numbers
            id="total-numbers"
            .fileName="${this.fileName}"
            .score="${this.score}"
            .limitCollection="${this.setLimitOrTargetCollection}"
            .quoteLength="${this.quoteLength}"
            .cooccurance="${this.cooccurance}">
          </data-view-total-numbers>

          <data-view-filters-container
            .viewMode="${this.viewMode}"
            .score="${this.score}"
            .updateScore="${this.setScore}"
            .quoteLength="${this.quoteLength}"
            .minLength="${this.minLength}"
            .updateQuoteLength="${this.setQuoteLength}"
            .updateLimitCollection="${this.setLimitCollection}"
            .updateTargetCollection="${this.setTargetCollection}"
            .cooccurance="${this.cooccurance}"
            .updateCooccurance="${this.setCooccurance}"
            .updateSorting="${this.setSortMethod}"
            .language="${this.language}">
          </data-view-filters-container>

          <data-view-settings-container
            class="settings-menu"
            lang="${this.language}"
            view="${this.viewMode}"
            .toggleShowSegmentNumbers="${this.toggleShowSegmentNumbers}"
            .toggleSegmentDisplaySide="${this.toggleSegmentDisplaySide}">
          </data-view-settings-container>
        </side-sheet>
      </div>
    `;
  }
}
