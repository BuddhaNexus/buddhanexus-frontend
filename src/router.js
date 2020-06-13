import { Router } from '@vaadin/router';

import './views/static/home/home-view.js';
import './views/static/about/about-view.js';
import './views/static/introduction/introduction-view.js';
import './views/static/history/history-view.js';
import './views/static/community/community-view.js';
import './views/static/institutions/institutions-view.js';
import './views/static/people/people-view.js';
import './views/static/news/news-view.js';
import './views/static/guidelines/guidelines-view.js';
import './views/static/activities/activities-view.js';
import './views/static/events/events-view.js';
import './views/static/projects/projects-view.js';
import './views/static/presentations/presentations-view.js';
import './views/static/publications/publications-view.js';
import './views/static/tools/tools-view.js';
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
  TABS.VISUAL
];

const ROUTES = [
  {
    path: '/',
    animate: true,
    component: 'home-view',
    action: () => {
      BNRouter.selectTab(TABS.HOME);
      switchNavbarLayout(true, true);
    },
  },
  {
    path: '/about',
    animate: true,
    component: 'about-view',
    action: () => {
      switchNavbarLayout(true, true);
    },
  },
  {
    path: '/introduction',
    animate: true,
    component: 'introduction-view',
    action: () => {
      switchNavbarLayout(false, true);
    },
  },
  {
    path: '/history',
    animate: true,
    component: 'history-view',
    action: () => {
      switchNavbarLayout(false, true);
    },
  },
  {
    path: '/community',
    animate: true,
    component: 'community-view',
    action: () => {
      switchNavbarLayout(false, true);
    },
  },
  {
    path: '/institutions',
    animate: true,
    component: 'institutions-view',
    action: () => {
      switchNavbarLayout(false, true);
    },
  },
  {
    path: '/people',
    animate: true,
    component: 'people-view',
    action: () => {
      switchNavbarLayout(false, true);
    },
  },
  {
    path: '/news',
    animate: true,
    component: 'news-view',
    action: () => {
      switchNavbarLayout(false, true);
    },
  },
  {
    path: '/guidelines',
    animate: true,
    component: 'guidelines-view',
    action: () => {
      switchNavbarLayout(false, true);
    },
  },
  {
    path: '/activities',
    animate: true,
    component: 'activities-view',
    action: () => {
      switchNavbarLayout(false, true);
    },
  },
  {
    path: '/events',
    animate: true,
    component: 'events-view',
    action: () => {
      switchNavbarLayout(false, true);
    },
  },
  {
    path: '/projects',
    animate: true,
    component: 'projects-view',
    action: () => {
      switchNavbarLayout(false, true);
    },
  },
  {
    path: '/presentations',
    animate: true,
    component: 'presentations-view',
    action: () => {
      switchNavbarLayout(false, true);
    },
  },
  {
    path: '/publications',
    animate: true,
    component: 'publications-view',
    action: () => {
      switchNavbarLayout(false, true);
    },
  },
  {
    path: '/contact',
    animate: true,
    component: 'contact-view',
    action: () => {
      switchNavbarLayout(false, true);
    },
  },
  {
    path: '/imprint',
    animate: true,
    component: 'imprint-view',
    action: () => {
      switchNavbarLayout(false, true);
    },
  },
  {
    path: '/pli/:viewMode?/:fileName?/:activeSegment?',
    component: 'data-view',
    action: () => {
      import('./views/data/data-view.js');
      BNRouter.selectTab(TABS.PALI);
      switchNavbarLayout(false, false);
      setLogoSource('/src/assets/img/buddhanexus_pli.jpg');
    },
  },
  {
    path: '/skt/:viewMode?/:fileName?/:activeSegment?',
    component: 'data-view',
    action: () => {
      import('./views/data/data-view.js');
      BNRouter.selectTab(TABS.SANSKRIT);
      switchNavbarLayout(false, false);
      setLogoSource('/src/assets/img/buddhanexus_skt.jpg');
    },
  },

  {
    path: '/tib/:viewMode?/:fileName?/:activeSegment?',
    component: 'data-view',
    action: () => {
      import('./views/data/data-view.js');
      BNRouter.selectTab(TABS.TIBETAN);
      switchNavbarLayout(false, false);
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
      switchNavbarLayout(false, false);
      setLogoSource('/src/assets/img/buddhanexus_chn.jpg');
    },
  },
  {
    path: '/visual/:lang?',
    component: 'visual-view',
    action: () => {
      import('./views/visual/visual-view.js');
      BNRouter.selectTab(TABS.VISUAL);
      switchNavbarLayout(false, false);
      setNavigationDrawerVisibility(false);
      setLogoSource('/src/assets/img/buddhanexus.jpg');
    },
  },
  {
    path: '/search/:query',
    component: 'search-view',
    action: () => {
      import('./views/searchview/search-view.js');
      switchNavbarLayout(false, true);
      setNavigationDrawerVisibility(false);
      setLogoSource('/src/assets/img/buddhanexus.jpg');
    },
  },
  {
    path: '(.*)',
    component: 'not-found-view',
    action: () => {
      import('./views/not-found-view');
      switchNavbarLayout(true, true);
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
  //this is commented out because we need to change the menu bar first
  // const vaadinTabs = getMainLayout().querySelectorAll('vaadin-tab');
  // vaadinTabs.forEach(item => {
  //   item.removeAttribute('selected');
  // });

  // vaadinTabs[TABS_IN_ORDER.indexOf(tabName)].setAttribute('selected', 'true');
   }
}

export default BNRouter;
