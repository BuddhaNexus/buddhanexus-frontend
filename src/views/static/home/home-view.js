import { customElement, html, LitElement } from 'lit-element';

import styles from '../static-view.styles';

@customElement('home-view')
export class HomeView extends LitElement {
  static get styles() {
    return [styles];
  }

  render() {
    //prettier-ignore
    return html`
      <div class="static-page-container">
        <div class="main-border">
          <div class="main-content">
            <h1>BuddhaNexus</h1>
            <p>
              A database devoted to the study of Buddhist texts and literary
              corpora in Pāli, Sanskrit, Tibetan, and Chinese, with particular
              emphasis on evolution of scriptures, formation of canons, and
              intellectual networks.
            </p>
          </div>
          <div class="box-languages">
            <a href="/pli/neutral" class="link">
              <img
                src="./src/assets/img/buddhanexus_pli.jpg"
                class="lang-img"
                alt="Buddha Nexus" />
                <br /><span class="link-description">Pāli</span>
            </a>
            <a href="/skt/neutral" class="link">
              <img
                src="./src/assets/img/buddhanexus_skt.jpg"
                class="lang-img"
                alt="Buddha Nexus" />
                <br /><span class="link-description">Sanskrit</span>
            </a>
            <a href="/tib/neutral" class="link">
              <img
                src="./src/assets/img/buddhanexus_tib.jpg"
                class="lang-img"
                alt="Buddha Nexus" />
                <br /><span class="link-description">Tibetan</span>
            </a>
            <a href="/chn/neutral" class="link">
              <img
                src="./src/assets/img/buddhanexus_vio.jpg"
                class="lang-img"
                alt="Buddha Nexus" />
                <br /><span class="link-description">Chinese</span>
            </a>
          </div>
        </div>

        <div class="backgroundpanel" @click="${this.closePopup}">&nbsp;</div>
      </div>
    `;
  }
}
