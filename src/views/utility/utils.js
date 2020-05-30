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
    drawerToggle.setAttribute('style', 'visibility: hidden');
  }
}

export function disableDrawer() {
  getMainLayout().querySelector('vaadin-app-layout').drawerOpened = false;
  getMainLayout()
    .querySelector('vaadin-drawer-toggle')
    .setAttribute('style', 'visibility: hidden');
}

export function setLogoPosition(isStart) {
  const logoContainer = document.querySelector('.header-logo-container');
  if (isStart) {
    logoContainer.classList.add('logo-position-start');
    logoContainer.classList.remove('logo-position');
  } else {
    logoContainer.classList.remove('logo-position-start');
    logoContainer.classList.add('logo-position');
  }
}

export function setNavbarLinks(isStart) {
  const navbarStart = getMainLayout().querySelectorAll('vaadin-menu-bar.start');
  const navbarSubsite = getMainLayout().querySelectorAll('vaadin-menu-bar.subsite');
  if (isStart) {
    navbarStart.forEach(item => {
      item.setAttribute('style', 'display: block');
    });
    navbarSubsite.forEach(item => {
      item.setAttribute('style', 'display: none');
    });
  } else {
    navbarStart.forEach(item => {
      item.setAttribute('style', 'display: none');
    });
    navbarSubsite.forEach(item => {
      item.setAttribute('style', 'display: block');
    });
  }
}

function setLogoVisibility(isVisible) {
  const logo = getMainLayout().querySelector('.logo-buddhanexus');
  if (!isVisible) {
    logo.setAttribute('style', 'visibility: hidden');
  } else {
    logo.setAttribute('style', 'visibility: visible');
  }
}

function setFooterVisibility(isVisible) {
  const footer = getMainLayout().querySelector('footer');
  if (!isVisible) {
    footer.setAttribute('style', 'display: none');
  } else {
    footer.setAttribute('style', 'display: block');
  }
}

export function setLogoSource(source) {
  const logo = getMainLayout().querySelector('img.logo-buddhanexus');
  logo.setAttribute('src', source);
}

function setNavbarFixed(isFixed) {
  const navbar = getMainLayout()
    .querySelector('vaadin-app-layout')
    .shadowRoot.querySelector('div');
  if (isFixed) {
    navbar.setAttribute('style', 'position: fixed; top: 80px;');
  } else {
    navbar.setAttribute('style', 'position: relative; top: 0px;');
  }
}

function toggleLargeNavbarLayoutClass(isLargeNavbar) {
  const layout = getMainLayout().querySelector('vaadin-app-layout');
  if (isLargeNavbar) {
    layout.classList.add('layout--large-navbar');
  } else {
    layout.classList.remove('layout--large-navbar');
  }
}

export function closeDrawer() {
  getMainLayout().querySelector('vaadin-app-layout').drawerOpened = false;
}

export function switchNavbarLayout(isLargeNavbar) {
  closeDrawer();
  setNavigationDrawerVisibility(!isLargeNavbar);
  setLogoVisibility(!isLargeNavbar);
  setNavbarFixed(!isLargeNavbar);
  setLogoPosition(isLargeNavbar);
  setNavbarLinks(isLargeNavbar);
  setFooterVisibility(isLargeNavbar);
  toggleLargeNavbarLayoutClass(isLargeNavbar);
}
