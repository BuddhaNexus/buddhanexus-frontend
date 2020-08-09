import { css } from 'lit-element';

export default css`
  :host {
    width: 100%;
  }

  .data-view {
    position: relative;
    display: flex;
    justify-content: space-between;
    height: 100%;
    max-width: 100vw;
    flex: 1;
  }

  .settings-menu[view='text'][lang='pli'],
  .settings-menu[view='text'][lang='chn'] {
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

  .data-view__main-container {
    display: flex;
    flex-direction: column;
    overflow: auto;
    flex: 1;
  }

  data-view-router {
    padding: 12px 48px 16px;
    height: 100%;
  }

  @media screen and (max-width: 900px) {
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
