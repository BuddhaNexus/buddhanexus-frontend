import { Router } from '@vaadin/router';

import './views/home/home-view.js';
import {
  getMainLayout,
  setLogoPosition,
  setNavigationDrawerVisibility,
} from './views/utility/utils';

const TABS = {
  HOME: '',
  PALI: 'pli',
  SANSKRIT: 'skt',
  TIBETAN: 'tib',
  CHINESE: 'chn',
  VISUAL: 'visual',
  SEARCH: 'search',
};

const TABS_IN_ORDER = [
  TABS.HOME,
  TABS.PALI,
  TABS.SANSKRIT,
  TABS.TIBETAN,
  TABS.CHINESE,
  TABS.VISUAL,
];

function setLogoVisibility(isVisible) {
  const logo = getMainLayout().querySelector('.logo-buddhanexus');
  if (!isVisible) {
    logo.setAttribute('style', 'visibility: hidden');
  } else {
    logo.setAttribute('style', 'visibility: visible');
  }
}

function setLogoSource(source) {
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

function switchNavbarLayout(isLargeNavbar) {
  setNavigationDrawerVisibility(!isLargeNavbar);
  setLogoVisibility(!isLargeNavbar);
  setNavbarFixed(!isLargeNavbar);
  setLogoPosition(isLargeNavbar);
}

const ROUTES = [
  {
    path: '/',
    animate: true,
    component: 'home-view',
    action: () => {
      BNRouter.selectTab(TABS.HOME);
      switchNavbarLayout(true);
    },
  },
  {
    path: '/pli/:viewMode?/:fileName?/:activeSegment?',
    component: 'data-view',
    action: () => {
      import('./views/data/data-view.js');
      BNRouter.selectTab(TABS.PALI);
      switchNavbarLayout(false);
      setLogoSource('/src/assets/img/buddhanexus_pli.jpg');
    },
  },
  {
    path: '/skt/:viewMode?/:fileName?/:activeSegment?',
    component: 'data-view',
    action: () => {
      import('./views/data/data-view.js');
      BNRouter.selectTab(TABS.SANSKRIT);
      switchNavbarLayout(false);
      setLogoSource('/src/assets/img/buddhanexus_skt.jpg');
    },
  },

  {
    path: '/tib/:viewMode?/:fileName?/:activeSegment?',
    component: 'data-view',
    action: () => {
      import('./views/data/data-view.js');
      BNRouter.selectTab(TABS.TIBETAN);
      switchNavbarLayout(false);
      setLogoSource('/src/assets/img/buddhanexus_tib.jpg');
    },
  },
  {
    path: '/chn/:viewMode?/:fileName?/:activeSegment?',
    component: 'data-view',
    action: () => {
      import('./views/data/data-view.js');
      BNRouter.selectTab(TABS.CHINESE);
      switchNavbarLayout(false);
      setLogoSource('/src/assets/img/buddhanexus_chn.jpg');
    },
  },
  {
    path: '/visual',
    component: 'visual-view',
    action: () => {
      import('./views/visual/visual-view.js');
      BNRouter.selectTab(TABS.VISUAL);
      switchNavbarLayout(false);
      setLogoSource('/src/assets/img/buddhanexus.jpg');
    },
  },
  {
    path: '/search/:query',
    component: 'search-view',
    action: () => {
      import('./views/searchview/search-view.js');
      BNRouter.selectTab(-1);
      switchNavbarLayout(false);
      setNavigationDrawerVisibility(false);
      setLogoSource('/src/assets/img/buddhanexus.jpg');
    },
  },
  {
    path: '(.*)',
    component: 'not-found-view',
    action: () => {
      import('./views/not-found-view');
      switchNavbarLayout(true);
      setLogoSource('/src/assets/img/buddhanexus.jpg');
    },
  },
];

class BNRouter {
  constructor() {
    this.router = new Router(getMainLayout().querySelector('main'), null);
  }

  async init() {
    await this.router.setRoutes(ROUTES);
  }

  static selectTab(tabName) {
    const vaadinTabs = getMainLayout().querySelectorAll('vaadin-tab');
    vaadinTabs.forEach(item => {
      item.removeAttribute('selected');
    });

    vaadinTabs[TABS_IN_ORDER.indexOf(tabName)].setAttribute('selected', 'true');
  }
}

export default BNRouter;
