import { Router } from '@vaadin/router';

import './views/static/home/home-view.js';
import './views/static/history/history-view.js';
import './views/static/people/people-view.js';
import './views/static/institutions/institutions-view.js';
import './views/static/activities/activities-view.js';
import './views/static/publications/publications-view.js';
import './views/static/guidelines/guidelines-view.js';
import './views/static/events/events-view.js';
import './views/static/imprint/imprint-view.js';
import './views/static/contact/contact-view.js';
import {
  getMainLayout,
  setLogoSource,
  setNavigationDrawerVisibility,
  switchNavbarLayout,
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

const ROUTES = [
  {
    path: '/',
    animate: true,
    component: 'home-view',
    action: () => {
      BNRouter.selectTab(TABS.HOME);
      switchNavbarLayout(true);
      //      setFooterVisible(true);
    },
  },
  {
    path: '/history',
    animate: true,
    component: 'history-view',
    action: () => {
      switchNavbarLayout(false);
      //      setFooterVisible(true);
    },
  },
  {
    path: '/people',
    animate: true,
    component: 'people-view',
    action: () => {
      switchNavbarLayout(false);
      //      setFooterVisible(true);
    },
  },
  {
    path: '/institutions',
    animate: true,
    component: 'institutions-view',
    action: () => {
      switchNavbarLayout(false);
      //      setFooterVisible(true);
    },
  },
  {
    path: '/activities',
    animate: true,
    component: 'activities-view',
    action: () => {
      switchNavbarLayout(false);
      //      setFooterVisible(true);
    },
  },
  {
    path: '/publications',
    animate: true,
    component: 'publications-view',
    action: () => {
      switchNavbarLayout(false);
      //      setFooterVisible(true);
    },
  },
  {
    path: '/guidelines',
    animate: true,
    component: 'guidelines-view',
    action: () => {
      switchNavbarLayout(false);
      //      setFooterVisible(true);
    },
  },
  {
    path: '/events',
    animate: true,
    component: 'events-view',
    action: () => {
      switchNavbarLayout(false);
      //      setFooterVisible(true);
    },
  },
  {
    path: '/contact',
    animate: true,
    component: 'contact-view',
    action: () => {
      switchNavbarLayout(false);
      //      setFooterVisible(true);
    },
  },
  {
    path: '/imprint',
    animate: true,
    component: 'imprint-view',
    action: () => {
      switchNavbarLayout(false);
      //      setFooterVisible(true);
    },
  },
  {
    path: '/pli/:viewMode?/:fileName?/:activeSegment?',
    component: 'data-view',
    action: () => {
      import('./views/data/data-view.js');
      BNRouter.selectTab(TABS.PALI);
      switchNavbarLayout(false);
      //      setFooterVisible(false);
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
      //      setFooterVisible(false);
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
      //      setFooterVisible(false);
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
      //      setFooterVisible(false);
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
      //      setFooterVisible(false);
      setNavigationDrawerVisibility(false);
      setLogoSource('/src/assets/img/buddhanexus.jpg');
    },
  },
  {
    path: '/search/:query',
    component: 'search-view',
    action: () => {
      import('./views/searchview/search-view.js');
      switchNavbarLayout(false);
      //      setFooterVisible(false);
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
      //      setFooterVisible(false);
      setNavigationDrawerVisibility(false);
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
