import { Router } from '@vaadin/router';

import './views/home/home-view.js';

const TABS = {
  HOME: '',
  PALI: 'pli',
  TIBETAN: 'tib',
  CHINESE: 'chn',
  VISUAL: 'visual',
};

const TABS_IN_ORDER = [
  TABS.HOME,
  TABS.PALI,
  TABS.TIBETAN,
  TABS.CHINESE,
  TABS.VISUAL,
];

const ROUTES = [
  {
    path: '/',
    component: 'home-view',
    action: () => BNRouter.selectTab(TABS.HOME),
  },
  {
    path: '/pli/:viewMode?/:fileName?',
    component: 'data-view',
    action: () => {
      import('./views/data/data-view.js');
      BNRouter.selectTab(TABS.PALI);
    },
  },
  {
    path: '/tib/:viewMode?/:fileName?/:activeSegment?',
    component: 'data-view',
    action: () => {
      import('./views/data/data-view.js');
      BNRouter.selectTab(TABS.TIBETAN);
    },
  },
  {
    path: '/chn/:viewMode?/:fileName?',
    component: 'data-view',
    action: () => {
      import('./views/data/data-view.js');
      BNRouter.selectTab(TABS.CHINESE);
    },
  },
  {
    path: '/visual',
    component: 'visual-view',
    action: () => {
      import('./views/visual/visual-view.js');
      BNRouter.selectTab(TABS.VISUAL);
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
