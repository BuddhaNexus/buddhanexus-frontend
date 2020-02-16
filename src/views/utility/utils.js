export function objectMap(object, mapFn) {
  return Object.keys(object).reduce(function(result, key) {
    result[key] = mapFn(object[key]);
    return result;
  }, {});
}

export function getMainLayout() {
  return document.getElementById('app_layout').shadowRoot;
}

export function setNavigationDrawerVisibility(isVisible) {
  const drawerToggle = getMainLayout().querySelector('vaadin-drawer-toggle');
  if (isVisible) {
    drawerToggle.removeAttribute('style');
  } else {
    drawerToggle.setAttribute('style', 'display: none');
  }
}

export function disableDrawer() {
  getMainLayout().querySelector('vaadin-app-layout').drawerOpened = false;
  getMainLayout()
    .querySelector('vaadin-drawer-toggle')
    .setAttribute('style', 'display: none');
}
