import { LitElement, html, css, customElement, property } from 'lit-element';

import '@polymer/paper-slider/paper-slider';

@customElement('data-view-filter-sliders')
export default class DataViewFilterSliders extends LitElement {
  @property({ type: Number }) score;
  @property({ type: String }) viewMode;
  @property({ type: Function }) updateScore;
  @property({ type: Number }) quoteLength;
  @property({ type: Number }) minLength;
  @property({ type: Function }) updateQuoteLength;

  static get styles() {
    return [
      css`
        :host {
          width: 100%;
        }

        .data-view-filter-sliders {
          display: flex;
          flex-direction: column;
          flex: 1;
          width: 100%;
          margin-right: 0;
        }

        paper-slider {
          --paper-slider-height: 4px;
          --paper-slider-container-color: var(--color-background);
          --paper-slider-active-color: var(--bn-dark-red);
          --paper-slider-knob-color: var(--bn-dark-red);
          --paper-input-container-focus-color: var(--bn-dark-red);
          width: calc(var(--side-sheet-width) - 48px);

          flex: 1;
        }

        #slider-label {
          color: var(--color-text-secondary);
          font-size: 12px;
        }

        #slider-container {
          flex-wrap: wrap;
          position: relative;
          flex: 1;
          min-width: 100%;
        }

        #slider-container[name]:hover:after,
        .segment-header:hover:after {
          content: attr(name);
          background-color: var(--bn-dark-red);
          border-radius: 4px;
          box-shadow: 0 4px 8px #888888;
          color: var(--color-menu-items);
          opacity: 0.9;
          font-size: 14px;
          padding: 4px 8px;
          position: absolute;
          z-index: 99;
          font-weight: bold;
        }
      `,
    ];
  }
    shouldShowAll() {
	return this.viewMode != 'multilang';
    }

  render() {
    //prettier-ignore
    return html`
      <div class="data-view-filter-sliders">
        <div
          id="slider-container"
          name="set 100% for highest similarity, 0% to see all">
          <div id="slider-label">Similarity Score:</div>
          <paper-slider
            id="score-cutoff"
            value="${this.score}"
            @change="${this.updateScore}"
            max="100"
            editable>
          </paper-slider>
        </div>
        <div
          style="display: ${
            this.shouldShowAll() ? 'block' : 'none'
          }"
          id="slider-container"
          name="set min. length of quoted segment in characters">
          <div id="slider-label">Min. Match Length:</div>
          <paper-slider
            id="quote-length"
            value="${this.quoteLength}"
            @change="${this.updateQuoteLength}"
            max="300"
            min="${this.minLength.toString()}"
            editable>
          </paper-slider>
        </div>
        <div
          style="display: ${
            this.shouldShowAll() ? 'block' : 'none'
          }"
          id="slider-container"
          name="set the number of times a parallel is contained within other parallels">
          <div id="slider-label">Nr. co-occurences:</div>
          <paper-slider
            id="co-occurences"
            value="${this.cooccurance}"
            @change="${this.updateCooccurance}"
            max="30"
            min="1"
            editable>
          </paper-slider>
        </div>
      </div>
    `;
  }
}
