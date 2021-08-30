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
        }

        vaadin-select {
          --material-primary-color: var(--bn-dark-red);
          --material-primary-text-color: var(--bn-dark-red);
          width: 100px;
        }
      `,
    ];
  }

  render() {
    const shouldShowRadioButtons =
      this.language !== 'pli' && this.language !== 'chn';
    return html`
      ${shouldShowRadioButtons
        ? html`
            <vaadin-radio-group
              label="Choose view:"
              class="visibility-filters"
              value="${this.viewMode}"
              @value-changed="${e =>
                this.handleViewModeChanged(e.target.value)}"
            >
              ${Object.values(DATA_VIEW_MODES).map(filter => {
                if (
                  filter !== 'numbers' &&
                  filter !== 'neutral' &&
                  (filter !== 'multiling' || this.language === 'multi') &&
                  filter !== 'text-search' &&
                  filter !== 'english'
                ) {
                  return html`
                    <vaadin-radio-button value="${filter}">
                      ${filter}
                    </vaadin-radio-button>
                  `;
                }
              })}
            </vaadin-radio-group>
          `
        : html`
            <vaadin-select
              value="${this.viewMode}"
              label="Choose view:"
              class="visibility-filters"
              @value-changed="${e =>
                this.handleViewModeChanged(e.target.value)}"
            >
              <template>
                <vaadin-list-box>
                  ${Object.values(DATA_VIEW_MODES).map(filter => {
                    if (
                      filter !== 'neutral' &&
                      filter !== 'multiling' &&
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
          `}
    `;
  }
}
