import { css, customElement, html, LitElement, property } from 'lit-element';
import { DATA_VIEW_MODES } from './data-view-filters-container';

@customElement('data-view-view-selector')
export class DataViewViewSelector extends LitElement {
  @property({ type: String }) viewMode;
  @property({ type: String }) language;
  @property({ type: Array }) multiLingualMode;
  @property({ type: Function }) handleViewModeChanged;

  static get styles() {
    return [
      css`
        .visibility-filters {
          margin-left: 0;
          margin-right: 2em;
        }

        .visibility-filters vaadin-radio-button {
          text-transform: capitalize;
        }

        vaadin-radio-button {
          --material-primary-color: var(--bn-dark-red);
          --material-primary-text-color: var(--bn-dark-red);
        }
      `,
    ];
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
          if (
            (filter !== 'numbers' || (this.language !== 'tib' && this.language !== 'skt' && this.language !== 'multi')) &&
            filter !== 'neutral' &&
            (filter !== 'multilang' || (this.language !== 'skt' && this.language !== 'tib' && this.language !== 'chn' && this.language !== 'pli')) &&
            filter !== 'text-search' &&
            (filter !== 'english' || (this.language !== 'skt' && this.language !== 'tib' && this.language !== 'chn'))
          ) {
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
