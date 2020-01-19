import { css, customElement, html, LitElement, property } from 'lit-element';
import { DATA_VIEW_MODES } from './data-view-filters-container';

@customElement('data-view-view-selector')
export class HomeView extends LitElement {
  @property({ type: String }) viewMode;
  @property({ type: Function }) handleViewModeChanged;

  static get styles() {
    return [css``];
  }

  render() {
    return html`
      <vaadin-radio-group
        label="Choose view:"
        class="visibility-filters"
        value="${this.viewMode}"
        @value-changed="${e => this.handleViewModeChanged(e.target.value)}"
      >
        ${Object.values(DATA_VIEW_MODES).map(filter => {
          if (filter !== 'numbers' || this.language !== 'tib') {
            return html`
              <vaadin-radio-button value="${filter}">
                ${filter}
              </vaadin-radio-button>
            `;
          }
        })}
      </vaadin-radio-group>
    `;
  }
}
