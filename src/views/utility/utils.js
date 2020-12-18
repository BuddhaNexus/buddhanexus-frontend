export function objectMap(object, mapFn) {
  return Object.keys(object).reduce(function(result, key) {
    result[key] = mapFn(object[key]);
    return result;
  }, {});
}

export function getMainLayout() {
  return document.getElementById('app_layout').shadowRoot;
}

export function isObjectEmpty(obj) {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
}

export function setNavigationDrawerVisibility(isVisible) {
  const drawerToggle = getMainLayout().querySelector('vaadin-drawer-toggle');
  if (isVisible) {
    drawerToggle.removeAttribute('style');
  } else {
    drawerToggle.setAttribute('style', 'visibility: hidden');
  }
}

export function setNavbarMenus(isStart) {
  const navBarStart = getMainLayout().querySelector('.menu-tab.main');
  const navBarSubsite = getMainLayout().querySelector('.menu-tab.sub');
  if (isStart) {
    navBarStart.setAttribute('style', 'display: block');
    navBarSubsite.setAttribute('style', 'display: none');
  } else {
    navBarStart.setAttribute('style', 'display: none');
    navBarSubsite.setAttribute('style', 'display: block');
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

function setNavbarVisibility(isVisible) {
  const navbar = getMainLayout()
    .querySelector('vaadin-app-layout')
    .shadowRoot.querySelector('div');
  if (isVisible) {
    navbar.setAttribute('style', 'position: fixed; top: 80px;');
  } else {
    navbar.setAttribute('style', 'position: fixed; top: 0px;');
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

export function switchNavbarLayout(isLargeNavbar, isVisibleFooter) {
  closeDrawer();
  setNavigationDrawerVisibility(!isLargeNavbar);
  setLogoVisibility(!isLargeNavbar);
  setNavbarFixed(!isLargeNavbar);
  setLogoPosition(isLargeNavbar);
  setNavbarMenus(isLargeNavbar);
  setFooterVisibility(isVisibleFooter);
  toggleLargeNavbarLayoutClass(isLargeNavbar);
}

export function switchNavbarVisibility(isVisibleNavbar) {
  closeDrawer();
  setLogoVisibility(isVisibleNavbar);
  setNavbarVisibility(isVisibleNavbar);
}

export function preprocessMenuData(menuData) {
  // this function has a bit of spaghetti-style; maybe we can refactor it at some point.
  return menuData.map(menuEntry => {
    menuEntry.imgStringPLI = '';
    menuEntry.imgStringSKT = '';
    menuEntry.imgStringTIB = '';
    menuEntry.imgStringCHN = '';
    if (menuEntry.available_lang) {
      menuEntry.available_lang.forEach(langItem => {
        if (langItem == 'pli') {
          menuEntry.imgStringPLI =
            '../../src/assets/icons/favicon-' + langItem + '-16x16.png';
        }
        if (langItem == 'skt') {
          menuEntry.imgStringSKT =
            '../../src/assets/icons/favicon-' + langItem + '-16x16.png';
        }
        if (langItem == 'tib') {
          menuEntry.imgStringTIB =
            '../../src/assets/icons/favicon-' + langItem + '-16x16.png';
        }
        if (langItem == 'chn') {
          menuEntry.imgStringCHN =
            '../../src/assets/icons/favicon-' + langItem + '-16x16.png';
        }
      });
    }
    return menuEntry;
  });
}
