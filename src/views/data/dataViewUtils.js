import { DATA_VIEW_MODES } from './data-view-filters-container';
import { getLanguageFromFilename } from '../utility/views-common';

// TODO: check if history.replaceState can be replaced by Router.go
export const updateFileParamInBrowserLocation = (
  isLocationEmpty,
  fileName,
  activeSegment
) => {
  if (isLocationEmpty) {
    history.replaceState({}, null, `${location.href}/${fileName}`);
  } else {
    const pathParams = location.href.split('/');
    const shortenFactor = activeSegment ? 2 : 1;
    const urlWithoutLastParam = pathParams
      .splice(0, pathParams.length - shortenFactor)
      .join('/');
    history.replaceState({}, null, `${urlWithoutLastParam}/${fileName}`);
  }
};

export const updateViewModeParamInBrowserLocation = (
  newViewMode,
  pathParams
) => {
  let newUrl = '';
  if (newViewMode) {
    // Strip the last path param (current viewMode)
    const rootUrl = pathParams.slice(0, pathParams.length - 1).join('/');
    newUrl = `${rootUrl}/${newViewMode}`;
  } else {
    newUrl = `${location.href}${DATA_VIEW_MODES.TEXT}`;
  }
  history.pushState({}, null, newUrl);
};

export const createTextViewSegmentUrl = segmentNr => {
  let lang = getLanguageFromFilename(segmentNr);
  let textName = segmentNr.split(':')[0];
  if (lang === 'chn') {
    textName = textName.replace(/_[0-9][0-9][0-9]/, '');
  }
  // This is a hack because dots in the segmentnumber are not accepted in the routing.
  return `../../${lang}/text/${textName}/${segmentNr.replace(/\./g, '@')}`;
};
