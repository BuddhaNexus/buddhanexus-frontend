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
import './views/static/contact/contact-view.js';
import './views/static/tools/sanskrit-tools.js';
import {
  getMainLayout,
  setLogoSource,
  setNavigationDrawerVisibility,
  switchNavbarLayout,
} from './views/utility/utils';

const ROUTES = [
  {
    path: '/',
    animate: true,
    component: 'home-view',
    action: () => {
      switchNavbarLayout(true, true);
    },
  },
  {
    path: '/about',
    animate: true,
    component: 'about-view',
    action: () => {
      switchNavbarLayout(false, true);
      setNavigationDrawerVisibility(false);
    },
  },
  {
    path: '/introduction',
    animate: true,
    component: 'introduction-view',
    action: () => {
      switchNavbarLayout(false, true);
      setNavigationDrawerVisibility(false);
    },
  },
  {
    path: '/history',
    animate: true,
    component: 'history-view',
    action: () => {
      switchNavbarLayout(false, true);
      setNavigationDrawerVisibility(false);
    },
  },
  {
    path: '/community',
    animate: true,
    component: 'community-view',
    action: () => {
      switchNavbarLayout(false, true);
      setNavigationDrawerVisibility(false);
    },
  },
  {
    path: '/institutions',
    animate: true,
    component: 'institutions-view',
    action: () => {
      switchNavbarLayout(false, true);
      setNavigationDrawerVisibility(false);
    },
  },
  {
    path: '/people',
    animate: true,
    component: 'people-view',
    action: () => {
      switchNavbarLayout(false, true);
      setNavigationDrawerVisibility(false);
    },
  },
  {
    path: '/news',
    animate: true,
    component: 'news-view',
    action: () => {
      switchNavbarLayout(false, true);
      setNavigationDrawerVisibility(false);
    },
  },
  {
    path: '/guidelines',
    animate: true,
    component: 'guidelines-view',
    action: () => {
      switchNavbarLayout(false, true);
      setNavigationDrawerVisibility(false);
    },
  },
  {
    path: '/activities',
    animate: true,
    component: 'activities-view',
    action: () => {
      switchNavbarLayout(false, true);
      setNavigationDrawerVisibility(false);
    },
  },
  {
    path: '/events',
    animate: true,
    component: 'events-view',
    action: () => {
      switchNavbarLayout(false, true);
      setNavigationDrawerVisibility(false);
    },
  },
  {
    path: '/projects',
    animate: true,
    component: 'projects-view',
    action: () => {
      switchNavbarLayout(false, true);
      setNavigationDrawerVisibility(false);
    },
  },
  {
    path: '/presentations',
    animate: true,
    component: 'presentations-view',
    action: () => {
      switchNavbarLayout(false, true);
      setNavigationDrawerVisibility(false);
    },
  },
  {
    path: '/publications',
    animate: true,
    component: 'publications-view',
    action: () => {
      switchNavbarLayout(false, true);
      setNavigationDrawerVisibility(false);
    },
  },
  {
    path: '/sanskrit-tools',
    animate: true,
    component: 'sanskrit-tools',
    action: () => {
      switchNavbarLayout(false, true);
      setNavigationDrawerVisibility(false);
    },
  },
  {
    path: '/contact',
    animate: true,
    component: 'contact-view',
    action: () => {
      switchNavbarLayout(false, true);
      setNavigationDrawerVisibility(false);
    },
  },
  {
    path: '/pli/:viewMode?/:fileName?/:activeSegment?',
    component: 'data-view',
    action: () => {
      import('./views/data/data-view.js');
      switchNavbarLayout(false, false);
      setLogoSource('/src/assets/img/buddhanexus_pli.jpg');
    },
  },
  {
    path: '/skt/:viewMode?/:fileName?/:activeSegment?',
    component: 'data-view',
    action: () => {
      import('./views/data/data-view.js');
      switchNavbarLayout(false, false);
      setLogoSource('/src/assets/img/buddhanexus_skt.jpg');
    },
  },

  {
    path: '/tib/:viewMode?/:fileName?/:activeSegment?',
    component: 'data-view',
    action: () => {
      import('./views/data/data-view.js');
      switchNavbarLayout(false, false);
      setLogoSource('/src/assets/img/buddhanexus_tib.jpg');
    },
  },
  {
    path: '/chn/:viewMode?/:fileName?/:activeSegment?',
    component: 'data-view',
    action: () => {
      import('./views/data/data-view.js');
      switchNavbarLayout(false, false);
      setLogoSource('/src/assets/img/buddhanexus_chn.jpg');
    },
  },
  {
    path: '/multi/:viewMode?/:fileName?/:activeSegment?',
    component: 'data-view',
    action: () => {
      import('./views/data/data-view.js');
      switchNavbarLayout(false, false);
      setLogoSource('/src/assets/img/buddhanexus.jpg');
    },
  },

   {
    path: '/visual/:lang?',
    component: 'visual-view',
    action: () => {
      import('./views/visual/visual-view.js');
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
      import('./views/not-found-view.js');
      switchNavbarLayout(false, true);
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
}

export default BNRouter;
