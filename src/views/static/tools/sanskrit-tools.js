import { customElement, property, html, css, LitElement } from 'lit-element';

import '@vaadin/vaadin-text-field/theme/material/vaadin-text-area';
import '@vaadin/vaadin-button/theme/material/vaadin-button';
import '../../utility/LoadingSpinner';
// import { getOutputData } from '../../api/actions';

import styles from './../static-view.styles';

@customElement('sanskrit-tools')
export class SanskritTools extends LitElement {
  @property({ type: String }) fetchLoading = false;
  @property({ type: String }) hideForm = 'hidden';
  @property({ type: String }) outputText;

  static get styles() {
    return [
      styles,
      css`
        #input-form {
          display: flex;
          flex-direction: column;
          min-height: 300px;
        }

        #submit-button {
          display: flex;
          color: var(--bn-dark-red);
          background-color: var(--color-light-chartbar);
          margin-top: 24px;
        }

        #input-stemmer {
          display: flex;
          height: 150px;
          --material-primary-color: var(--bn-dark-red);
        }
      `,
    ];
  }

  submitFormInput() {
    let inputText = this.shadowRoot.querySelector('#input-stemmer').value;
    this.fetchData(inputText);
  }

  async fetchData(inputText) {
    if (!inputText) {
      this.hideForm = 'hidden';
      return;
    }
    console.log(inputText);

    this.fetchLoading = true;

    // const outputText = await getOutputData({
    //   inputText: inputText,
    // });
    // this.outputText= outputText;

    this.outputText = inputText;
    if (this.outputText) {
      this.hideForm = 'visible';
    }

    this.fetchLoading = false;
  }

  render() {
    return html`
      <div class="static-page-container">
        <div class="main-border">
          <div class="main-content">
            <h1>SANSKRIT</h1>
            <bn-card light id="input-form">
              <vaadin-text-area
                label="Description"
                placeholder="Write here ..."
                id="input-stemmer"
              >
              </vaadin-text-area>
              <vaadin-button id="submit-button" @click="${this.submitFormInput}"
                >Submit</vaadin-button
              >
            </bn-card>

            ${this.fetchLoading
              ? html`
                  <bn-loading-spinner></bn-loading-spinner>
                `
              : null}

            <bn-card
              light
              id="output-form"
              style="visibility: ${this.hideForm}"
            >
              ${this.outputText}
            </bn-card>
          </div>
        </div>
      </div>
    `;
  }
}
