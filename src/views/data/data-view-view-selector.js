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

        .visibility-filters vaadin-radio-button {
          text-transform: capitalize;
        }

        vaadin-select,
        vaadin-radio-button {
          --material-primary-color: var(--bn-dark-red);
          --material-primary-text-color: var(--bn-dark-red);
        }

        vaadin-select {
          display: none;
        }

        vaadin-ratio-group {
          display: inline-flex;
        }

        @media screen and (max-width: 1380px) {
          vaadin-select[lang='pli'] {
            display: inline-flex;
            width: 100px;
          }

          vaadin-radio-group[lang='pli'] {
            display: none;
          }
        }

        @media screen and (max-width: 1040px) {
          vaadin-select[lang='chn'] {
            display: inline-flex;
            width: 100px;
          }

          vaadin-radio-group[lang='chn'] {
            display: none;
          }
        }

        @media screen and (max-width: 1040px) {
          vaadin-select[lang='skt'] {
            display: inline-flex;
            width: 100px;
          }

          vaadin-radio-group[lang='skt'] {
            display: none;
          }
        }

        @media screen and (max-width: 1040px) {
          vaadin-select[lang='multi'] {
            display: inline-flex;
            width: 100px;
          }

          vaadin-radio-group[lang='multi'] {
            display: none;
          }
        }

        @media screen and (max-width: 1040px) {
          vaadin-select[lang='tib'] {
            display: inline-flex;
            width: 100px;
          }

          vaadin-radio-group[lang='tib'] {
            display: none;
          }
        }
      `,
    ];
  }

  render() {
    return html`
      <vaadin-select
        value="${this.viewMode}"
        label="Choose view:"
        lang="${this.language}"
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

      <vaadin-radio-group
        label="Choose view:"
        class="visibility-filters"
        value="${this.viewMode}"
        lang="${this.language}"
        @value-changed="${e => this.handleViewModeChanged(e.target.value)}"
      >
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
