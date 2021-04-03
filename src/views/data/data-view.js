/**
 * @file data-view is the container component of table-view, numbers-view, table-view and graph-view.
 *
 * @todo:
 * - pass filter values inside an object instead of separately in order to simplify code.
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
import { getMainLayout, switchNavbarVisibility } from '../utility/utils';
import { DATA_VIEW_MODES } from './data-view-filters-container';
import {
  LANGUAGE_CODES,
  MIN_LENGTHS,
  DEFAULT_LENGTHS,
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
  @property({ type: String }) multiSearchString;
  @property({ type: String }) transMethod = 'wylie';
  @property({ type: String }) sortMethod = 'position';
  @property({ type: String }) viewMode;
  @property({ type: Array }) multiLingualMode = [
    LANGUAGE_CODES.PALI,
    LANGUAGE_CODES.SANSKRIT,
    LANGUAGE_CODES.TIBETAN,
    LANGUAGE_CODES.CHINESE,
  ];
  @property({ type: String }) activeSegment;
  @property({ type: String }) folio;
  @property({ type: String }) headerVisibility = '';
  @property({ type: Boolean }) filterBarOpen;
  @property({ type: Boolean }) showSegmentNumbers = false;
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
    this.initializeFilterValues(this.language);
    this.checkSelectedView();
  }
  initializeFilterValues(lang) {
    switch (lang) {
      case LANGUAGE_CODES.TIBETAN:
        this.minLength = MIN_LENGTHS.TIBETAN;
        this.quoteLength = DEFAULT_LENGTHS.TIBETAN;
        this.score = DEFAULT_SCORES.TIBETAN;
        this.multiLingualMode = [LANGUAGE_CODES.TIBETAN];
        break;
      case LANGUAGE_CODES.PALI:
        this.minLength = MIN_LENGTHS.PALI;
        this.quoteLength = DEFAULT_LENGTHS.PALI;
        this.score = DEFAULT_SCORES.PALI;
        this.multiLingualMode = [LANGUAGE_CODES.PALI];
        break;
      case LANGUAGE_CODES.SANSKRIT:
        this.minLength = MIN_LENGTHS.SANSKRIT;
        this.quoteLength = DEFAULT_LENGTHS.SANSKRIT;
        this.score = DEFAULT_SCORES.SANSKRIT;
        //this.multiLingualMode = [LANGUAGE_CODES.SANSKRIT];
        break;
      case LANGUAGE_CODES.CHINESE:
        this.minLength = MIN_LENGTHS.CHINESE;
        this.quoteLength = DEFAULT_LENGTHS.CHINESE;
        this.score = DEFAULT_SCORES.CHINESE;
        this.multiLingualMode = [LANGUAGE_CODES.CHINESE];
        break;
      case LANGUAGE_CODES.MULTILANG:
        this.score = DEFAULT_SCORES.MULTILANG;
        this.minLength = MIN_LENGTHS.MULTILANG;
        this.quoteLength = DEFAULT_LENGTHS.MULTILANG;
        break;
    }
  }

  updated(_changedProperties) {
    this.checkSelectedView();
    _changedProperties.forEach((oldValue, propName) => {
      if (propName === 'fileName') {
        this.updateFileNameParamInUrl(this.fileName, this.activeSegment);
        this.checkSearchSelectedText();
      }
      if (propName === 'viewMode' && this.score == null) {
        // when the viewMode is changed and the filter-values are not set yet, we have to initialize them
        const tempLang = getLanguageFromFilename(this.fileName);
        this.initializeFilterValues(tempLang);
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
    if (this.viewMode === DATA_VIEW_MODES.NEUTRAL && this.fileName) {
      let newUrl;
      if (this.language != LANGUAGE_CODES.MULTILANG) {
        this.viewMode = DATA_VIEW_MODES.TEXT;
        newUrl = this.location.pathname.replace('neutral', 'text');
      } else {
        this.viewMode = DATA_VIEW_MODES.MULTILANG;
        newUrl = this.location.pathname.replace('neutral', 'multi');
      }
      this.location.pathname = newUrl;
      history.replaceState({}, null, newUrl);
    }
  }
  // handles the case that a new text was selected while browsing the search-results in local-search-view.
  checkSearchSelectedText() {
    if (this.viewMode === DATA_VIEW_MODES.TEXT_SEARCH && this.fileName) {
      this.viewMode = DATA_VIEW_MODES.TEXT;
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
    this.multiLingualMode = [
      LANGUAGE_CODES.PALI,
      LANGUAGE_CODES.SANSKRIT,
      LANGUAGE_CODES.TIBETAN,
      LANGUAGE_CODES.CHINESE,
    ];
  };

  setSelectedView = viewName => {
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
  };

  setMultiLangSearch = searchString => {
    this.multiSearchString = searchString;
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

  toggleTransMode = e => {
    this.transMethod = e.target.value;
  };
  setSortMethod = e => {
    this.sortMethod = e.target.value;
    if (this.sortMethod != 'position') {
      this.folio = '';
    }
  };

  setLimitCollection = limitCollection => {
    // if we don't do this check, limitCollection gets updated constantly and triggers refetching of the data which is very undesired.
    if (this.limitCollection.toString() !== limitCollection.toString()) {
      this.limitCollection = limitCollection;
      this.setLimitOrTargetCollection =
        this.viewMode == 'graph' ? this.targetCollection : this.limitCollection;
    }
  };

  setTargetCollection = targetCollection => {
    this.targetCollection = targetCollection;
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
  };

  toggleFilterBarOpen = () => {
    this.filterBarOpen = !this.filterBarOpen;
  };

  toggleNavBar = () => {
    if (this.headerVisibility === '') {
      this.headerVisibility = 'no-header';
      switchNavbarVisibility(false);
    } else {
      this.headerVisibility = '';
      switchNavbarVisibility(true);
    }
  };

  toggleShowSegmentNumbers = e => {
    this.showSegmentNumbers = e.detail.value;
  };

  toggleSegmentDisplaySide = e => {
    this.segmentDisplaySide = e.target.value;
  };

  setMultiLingualMode = multiLingualList => {
    this.multiLingualMode = multiLingualList;
  };

  render() {
    //prettier-ignore
    return html`
      <div class="data-view ${this.headerVisibility}" lang="${this.language}" view="${this.viewMode}">
        <div class="data-view__main-container">
          <data-view-header
            .language="${this.language}"
            .fileName="${this.fileName}"
            .setFileName="${this.setFileName}"
            .viewMode="${this.viewMode}"
            .sortMethod="${this.sortMethod}"
            .score="${this.score}"
            .handleViewModeChanged="${this.handleViewModeChanged}"
            .setFolio="${this.setFolio}"
            .filterBarOpen="${this.filterBarOpen}"
            .toggleFilterBarOpen="${this.toggleFilterBarOpen}"
            .toggleNavBar="${this.toggleNavBar}"
            .updateSearch="${this.setSearch}"
            .multiLingualMode="${this.multiLingualMode}"
            .updateMultiLangSearch="${this.setMultiLangSearch}"
            .updateSortMethod="${this.setSortMethod}">
          </data-view-header>

          <data-view-router
            .selectedView="${this.viewMode}"
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
            .transMethod="${this.transMethod}"
            .searchString="${this.searchString}"
            .multiLingualMode="${this.multiLingualMode}"
            .multiSearchString="${this.multiSearchString}"
            .headerVisibility="${this.headerVisibility}"
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
            .fileName="${this.fileName}"
            .viewMode="${this.viewMode}"
            .score="${this.score}"
            .updateScore="${this.setScore}"
            .quoteLength="${this.quoteLength}"
            .minLength="${this.minLength}"
            .updateQuoteLength="${this.setQuoteLength}"
            .updateLimitCollection="${this.setLimitCollection}"
            .updateTargetCollection="${this.setTargetCollection}"
            .updateMultiLingualMode="${this.setMultiLingualMode}"
            .multiLingualMode="${this.multiLingualMode}"
            .cooccurance="${this.cooccurance}"
            .updateCooccurance="${this.setCooccurance}"
            .language="${this.language}">
          </data-view-filters-container>

          <data-view-settings-container
            class="settings-menu"
            lang="${this.language}"
            view="${this.viewMode}"
            .toggleTransMode="${this.toggleTransMode}">
            .toggleShowSegmentNumbers="${this.toggleShowSegmentNumbers}"
            .toggleSegmentDisplaySide="${this.toggleSegmentDisplaySide}">


          </data-view-settings-container>
        </side-sheet>
      </div>
    `;
  }
}
