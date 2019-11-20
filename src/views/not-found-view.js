import { customElement, html } from 'lit-element';

import { LightDOMElement } from './light-dom-element.js';

@customElement('not-found-view')
export class NotFoundView extends LightDOMElement {
  render() {
    return html`
      <h1>View not found!</h1>
      <p>
        Please check your URL.
      </p>
    `;
  }
}
