export function objectMap(object, mapFn) {
  return Object.keys(object).reduce(function(result, key) {
    result[key] = mapFn(object[key]);
    return result;
  }, {});
}

export function setNavigationDrawerVisibility(isVisible) {
  const drawerToggle = document.querySelector('vaadin-drawer-toggle');
  if (isVisible) {
    drawerToggle.removeAttribute('style');
  } else {
    drawerToggle.setAttribute('style', 'visibility: hidden');
  }
}
