import { Router } from '@vaadin/router';

import './views/home/home-view.js';
import { setNavigationDrawerVisibility } from './views/utility/utils';

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

const ROUTES = [
  {
    path: '/',
    component: 'home-view',
    action: () => {
      BNRouter.selectTab(TABS.HOME);
      setNavigationDrawerVisibility(false);
    },
  },
  {
    path: '/pli/:viewMode?/:fileName?/:activeSegment?',
    component: 'data-view',
    action: () => {
      import('./views/data/data-view.js');
      BNRouter.selectTab(TABS.PALI);
      setNavigationDrawerVisibility(true);
    },
  },
  {
    path: '/skt/:viewMode?/:fileName?/:activeSegment?',
    component: 'data-view',
    action: () => {
      import('./views/data/data-view.js');
      BNRouter.selectTab(TABS.SANSKRIT);
      setNavigationDrawerVisibility(true);
    },
  },

  {
    path: '/tib/:viewMode?/:fileName?/:activeSegment?',
    component: 'data-view',
    action: () => {
      import('./views/data/data-view.js');
      BNRouter.selectTab(TABS.TIBETAN);
      setNavigationDrawerVisibility(true);
    },
  },
  {
    path: '/chn/:viewMode?/:fileName?/:activeSegment?',
    component: 'data-view',
    action: () => {
      import('./views/data/data-view.js');
      BNRouter.selectTab(TABS.CHINESE);
      setNavigationDrawerVisibility(true);
    },
  },
  {
    path: '/visual',
    component: 'visual-view',
    action: () => {
      import('./views/visual/visual-view.js');
      BNRouter.selectTab(TABS.VISUAL);
      setNavigationDrawerVisibility(false);
    },
  },
  {
    path: '/search',
    component: 'search-view',
    action: () => {
      import('./views/searchview/search-view.js');
      BNRouter.selectTab(TABS.VISUAL);
      setNavigationDrawerVisibility(false);
    },
  },
  {
    path: '(.*)',
    component: 'not-found-view',
    action: () => import('./views/not-found-view'),
  },
];

class BNRouter {
  constructor() {
    this.router = new Router(document.querySelector('main'), null);
  }

  init() {
    this.router.setRoutes(ROUTES);
  }

  static selectTab(tabName) {
    const vaadinTabs = document.querySelectorAll('vaadin-tab');
    vaadinTabs.forEach(item => {
      item.removeAttribute('selected');
    });

    vaadinTabs[TABS_IN_ORDER.indexOf(tabName)].setAttribute('selected', 'true');
  }
}

export default BNRouter;
