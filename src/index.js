import '@vaadin/vaadin-tabs/theme/material/vaadin-tabs';
import '@vaadin/vaadin-tabs/theme/material/vaadin-tab';
import '@vaadin/vaadin-app-layout/theme/material/vaadin-app-layout';
import '@vaadin/vaadin-app-layout/theme/material/vaadin-drawer-toggle';

import 'normalize.css';
import './styles.css';

import BNRouter from './router';

const disableDrawer = () => {
  document.querySelector('vaadin-app-layout').drawerOpened = false;
  document
    .querySelector('vaadin-drawer-toggle')
    .setAttribute('style', 'display: none');
};

window.addEventListener('load', () => {
  disableDrawer();
  new BNRouter().init();
});
