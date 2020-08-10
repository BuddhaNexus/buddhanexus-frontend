import { customElement, html, css, LitElement } from 'lit-element';
import styles from '../static/static-view.styles';

@customElement('visual-view-selection-box')
export class VisualViewSelectionBox extends LitElement {
  static get styles() {
    return [
      css`
        .visual-page-container {
          height: calc(100vh - var(--header-height));
        }

        @media screen and (max-width: 1100px) {
          .visual-page-container {
            height: calc(100vh - 50px);
          }
        }
      `,
      styles,
    ];
  }

  render() {
    //prettier-ignore
    return html`
      <div class="visual-page-container">
        <div class="main-border">
          <div class="main-content">
            <p>
              The Sankey graph displays all matches between the collections
              available in the same language that were detected by the default
              setting. To view the graphs, first select the language of your
              choice.
            </p>
            <p>Choose language for the visualization:</p>
          </div>
          <div class="box-languages">
            <a href="/visual/pli" class="link">
              <img
                src="../src/assets/img/buddhanexus_pli.jpg"
                class="lang-img"
                alt="Buddha Nexus"/>
              <br /><span class="link-description">Pāli</span>
            </a>
            <a href="/visual/skt" class="link">
              <img
                src="../src/assets/img/buddhanexus_skt.jpg"
                class="lang-img"
                alt="Buddha Nexus"/>
              <br /><span class="link-description">Sanskrit</span>
            </a>
            <a href="/visual/tib" class="link">
              <img
                src="../src/assets/img/buddhanexus_tib.jpg"
                class="lang-img"
                alt="Buddha Nexus"/>
              <br /><span class="link-description">Tibetan</span>
            </a>
            <a href="/visual/chn" class="link">
              <img
                src="../src/assets/img/buddhanexus_vio.jpg"
                class="lang-img"
                alt="Buddha Nexus"/>
              <br /><span class="link-description">Chinese</span>
            </a>
          </div>
        </div>
      </div>
    `;
  }
}
