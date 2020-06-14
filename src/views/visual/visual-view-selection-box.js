import { customElement, html, LitElement, property } from 'lit-element';
import styles from '../static/static-view.styles';


@customElement('visual-view-selection-box')
export class VisualViewSelectionBox extends LitElement {
  static get styles() {
	   return [styles];
  }

  render() {
    return html`
      <div class="static-page-container">
        <div class="main-border">
          <div class="main-content">
          <p>
            The Visual Charts display the intertextuality between collections, sections within collections, and single texts using a Sankey diagram. A click on a single text leads you to Text View, displaying the matches of the selected text (Inquiry Text).
          </p>
          <p>Choose language for the visualization:</p>
          </div>
          <div class="box-languages">
            <a href="/visual/pli" class="link">
              <img
                src="../src/assets/img/buddhanexus_pli.jpg"
                class="lang-img"
                alt="Buddha Nexus"
              /><br /><span class="link-description">Pāli</span></a
            >
            <a href="/visual/skt" class="link"
              ><img
                src="../src/assets/img/buddhanexus_skt.jpg"
                class="lang-img"
                alt="Buddha Nexus"
              /><br /><span class="link-description">Sanskrit</span></a
            >
            <a href="/visual/tib" class="link"
              ><img
                src="../src/assets/img/buddhanexus_tib.jpg"
                class="lang-img"
                alt="Buddha Nexus"
              /><br /><span class="link-description">Tibetan</span></a
            >
            <a href="/visual/chn" class="link"
              ><img
                src="../src/assets/img/buddhanexus_vio.jpg"
                class="lang-img"
                alt="Buddha Nexus"
              /><br /><span class="link-description">Chinese</span></a
            >
          </div>
</div>
</div>
    `;
  }
}
