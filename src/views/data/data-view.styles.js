import { css } from 'lit-element';

export default css`
  :host {
    width: 100%;
  }

  .data-view {
    position: relative;
    display: flex;
    justify-content: space-between;
    height: calc(100vh - var(--header-height));
    max-width: 100vw;
    flex: 1;
  }

  .data-view.no-header {
    top: 0px;
    margin-top: -24px;
    height: calc(100vh + 24px);
    position: fixed;
    z-index: 99;
    width: 100%;
  }

  .settings-menu {
    display: inline-flex;
  }

  .data-view[lang='pli'][view='neutral'] {
    background-image: url('/src/assets/img/background_content_pli.jpg');
    background-size: cover;
    background-attachment: fixed;
  }

  .data-view[lang='skt'][view='neutral'] {
    background-image: url('/src/assets/img/background_content_skt.jpg');
    background-size: cover;
    background-attachment: fixed;
  }

  .data-view[lang='tib'][view='neutral'] {
    background-image: url('/src/assets/img/background_content_tib.jpg');
    background-size: cover;
    background-attachment: fixed;
  }

  .data-view[lang='chn'][view='neutral'] {
    background-image: url('/src/assets/img/background_content_chn.jpg');
    background-size: cover;
    background-attachment: fixed;
  }

  .data-view[lang='multi'][view='neutral'] {
    background-image: url('/src/assets/img/background_content_tib.jpg');
    background-size: cover;
    background-attachment: fixed;
  }

  .data-view__main-container {
    display: flex;
    flex-direction: column;
    overflow: auto;
    flex: 1;
  }

  .data-view.no-header[view='text'] .data-view__main-container,
  .data-view.no-header[view='graph'] .data-view__main-container,
  .data-view.no-header[view='numbers'] .data-view__main-container,
  .data-view.no-header[view='table'] .data-view__main-container,
  .data-view.no-header[view='multiling'] .data-view__main-container {
    background-color: var(--color-background-light);
  }

  data-view-router {
    padding: 12px 48px 0px;
  }

  .data-view.no-header .data-view__main-container data-view-router {
    padding: 16px 12px 0px;
  }

  @media screen and (max-width: 1040px) {
    data-view-router {
      font-size: 0.9em;
      padding: 12px;
    }
  }

  .data-view__main-container bn-card {
    margin-right: auto;
  }

  data-view-header {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    position: sticky;
    top: 0;
    z-index: 1;
    width: 100%;
    transition: width var(--vaadin-app-layout-transition);
  }

  side-sheet {
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    transition: width var(--vaadin-app-layout-transition),
      min-width var(--vaadin-app-layout-transition);
    background-color: white;
  }

  side-sheet.side-sheet--open {
    min-width: var(--side-sheet-width);
    width: var(--side-sheet-width);
  }

  side-sheet.side-sheet--closed {
    min-width: 0;
    width: 0;
  }
`;
