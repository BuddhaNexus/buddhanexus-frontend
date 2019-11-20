import { DATA_VIEW_MODES } from './data-view-filters-container';

export const updateFileParamInBrowserLocation = (
  isLocationEmpty,
  fileName,
  activeSegment
) => {
  if (isLocationEmpty) {
    history.replaceState({}, null, `${location.href}/${fileName}`);
  } else {
    const pathParams = location.href.split('/');
    const urlWithoutLastParam = pathParams
      .splice(0, pathParams.length - 2)
      .join('/');
    history.replaceState(
      {},
      null,
      `${urlWithoutLastParam}/${fileName}/${activeSegment}`
    );
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
