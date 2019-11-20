import { LitElement } from 'lit-element';

/**
 * If you don't want to use shadow DOM, you can overwrite the
 * `createRenderRoot` method. By default, LitElement sets the
 * render root to the shadowDom.
 * This is usually used for small leaf-components.
 */
export class LightDOMElement extends LitElement {
  createRenderRoot() {
    return this;
  }
}
