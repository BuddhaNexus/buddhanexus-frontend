import { css, customElement, html, LitElement, property } from 'lit-element';
import { DATA_VIEW_MODES } from './data-view-filters-container';

import '@vaadin/vaadin-select/theme/material/vaadin-select';

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
          width: 100px;
        }

        vaadin-select {
          --material-primary-color: var(--bn-dark-red);
          --material-primary-text-color: var(--bn-dark-red);
        }
      `,
    ];
  }

  render() {
    return html`
      <vaadin-select
        value="${this.viewMode}"
        label="Choose view:"
        class="visibility-filters"
        @value-changed="${e => this.handleViewModeChanged(e.target.value)}"
      >
        <template>
          <vaadin-list-box>
            ${Object.values(DATA_VIEW_MODES).map(filter => {
              if (
                (filter !== 'numbers' ||
                  this.language === 'pli' ||
                  this.language === 'chn') &&
                filter !== 'neutral' &&
                (filter !== 'multiling' || this.language === 'multi') &&
                filter !== 'text-search' &&
                (filter !== 'english' || this.language === 'pli')
              ) {
                return html`
                  <vaadin-item style="text-transform: capitalize"
                    >${filter}</vaadin-item
                  >
                `;
              }
            })}
          </vaadin-list-box>
        </template>
      </vaadin-select>
    `;
  }
}
