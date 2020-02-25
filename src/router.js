import { Router } from '@vaadin/router';

import './views/home/home-view.js';

const TABS = {
  HOME: '',
  PALI: 'pli',
  SANSKRIT: 'skt',
  TIBETAN: 'tib',
  CHINESE: 'chn',
  VISUAL: 'visual',
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
      document
        .querySelector('vaadin-drawer-toggle')
        .setAttribute('style', 'visibility: hidden');
      document
        .querySelector('.logo-buddhanexus')
        .setAttribute('style', 'visibility: hidden');

      document
        .querySelector('.logo-position')
        .classList.add('logo-position-start');
      document
        .querySelector('.logo-position')
        .classList.remove('logo-position');
    },
  },
  {
    path: '/pli/:viewMode?/:fileName?/:activeSegment?',
    component: 'data-view',
    action: () => {
      import('./views/data/data-view.js');
      BNRouter.selectTab(TABS.PALI);
      document.querySelector('vaadin-drawer-toggle').removeAttribute('style');
      document
        .querySelector('img.logo-buddhanexus')
        .setAttribute('src', '/src/assets/img/buddhanexus_pli.jpg');
      document
        .querySelector('.logo-buddhanexus')
        .setAttribute('style', 'visibility: visible');
      document.querySelector('.logo-position').setAttribute('height', '116px');

      document.querySelector('.logo-position').classList.add('logo-position');
      document
        .querySelector('.logo-position')
        .classList.remove('logo-position-start');
    },
  },
  {
    path: '/skt/:viewMode?/:fileName?/:activeSegment?',
    component: 'data-view',
    action: () => {
      import('./views/data/data-view.js');
      BNRouter.selectTab(TABS.SANSKRIT);
      document.querySelector('vaadin-drawer-toggle').removeAttribute('style');
      document
        .querySelector('img.logo-buddhanexus')
        .setAttribute('src', '/src/assets/img/buddhanexus_skt.jpg');
      document
        .querySelector('.logo-buddhanexus')
        .setAttribute('style', 'visibility: visible');
      document.querySelector('.logo-position').setAttribute('height', '116px');

      document.querySelector('.logo-position').classList.add('logo-position');
      document
        .querySelector('div[part="navbar"]')
        .classList.add('logo-position');
      document
        .querySelector('.logo-position')
        .classList.remove('logo-position-start');
      document
        .querySelector('div[part="navbar"]')
        .setAttribute('style', 'top: 80px; position: fixed;');
    },
  },

  {
    path: '/tib/:viewMode?/:fileName?/:activeSegment?',
    component: 'data-view',
    action: () => {
      import('./views/data/data-view.js');
      BNRouter.selectTab(TABS.TIBETAN);
      document.querySelector('vaadin-drawer-toggle').removeAttribute('style');
      document
        .querySelector('img.logo-buddhanexus')
        .setAttribute('src', '/src/assets/img/buddhanexus_tib.jpg');
      document
        .querySelector('.logo-buddhanexus')
        .setAttribute('style', 'visibility: visible');
      document.querySelector('.logo-position').setAttribute('height', '116px');

      document.querySelector('.logo-position').classList.add('logo-position');
      document
        .querySelector('.logo-position')
        .classList.remove('logo-position-start');
    },
  },
  {
    path: '/chn/:viewMode?/:fileName?/:activeSegment?',
    component: 'data-view',
    action: () => {
      import('./views/data/data-view.js');
      BNRouter.selectTab(TABS.CHINESE);
      document.querySelector('vaadin-drawer-toggle').removeAttribute('style');
      document
        .querySelector('img.logo-buddhanexus')
        .setAttribute('src', '/src/assets/img/buddhanexus_chn.jpg');
      document
        .querySelector('.logo-buddhanexus')
        .setAttribute('style', 'visibility: visible');
      document.querySelector('.logo-position').setAttribute('height', '116px');

      document.querySelector('.logo-position').classList.add('logo-position');
      document
        .querySelector('.logo-position')
        .classList.remove('logo-position-start');
    },
  },
  {
    path: '/visual',
    component: 'visual-view',
    action: () => {
      import('./views/visual/visual-view.js');
      BNRouter.selectTab(TABS.VISUAL);
      document
        .querySelector('vaadin-drawer-toggle')
        .setAttribute('style', 'visibility: hidden');
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
