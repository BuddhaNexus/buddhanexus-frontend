import { customElement, html, LitElement } from 'lit-element';

import styles from './../static-view.styles';

@customElement('contact-view')
export class ContactView extends LitElement {
  static get styles() {
    return [styles];
  }

  render() {
    return html`
      <div class="static-page-container">
        <div class="main-border">
          <div class="main-content">
            <h1>Contact</h1>
            <h2>BuddhaNexus</h2>
            Universität Hamburg<br />
            Asien-Afrika-Institut<br />
            Abt. für Kultur und Geschichte Indiens und Tibets<br />

            Khyentse Center for Tibetan Buddhist Textual Scholarship<br />
            Alsterterrasse 1<br />
            20354 Hamburg<br />
            Germany<br />
            <h3>Project Management</h3>

            Dr. Orna Almogi<br />

            Sebastian Nehrdich, MA (PhD candidate)<br />

            Prof. Dr. Dorji Wangchuk<br />

            Email:
            <a href="mailto:buddhanexus-info@gmail.com"
              >buddhanexus-info@gmail.com</a
            >
          </div>
        </div>
      </div>
    `;
  }
}
