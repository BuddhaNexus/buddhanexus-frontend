import { customElement, property, html, css, LitElement } from 'lit-element';

import '@vaadin/vaadin-text-field/theme/material/vaadin-text-area';
import '@vaadin/vaadin-button/theme/material/vaadin-button';
import '../../utility/LoadingSpinner';
import { getTaggedSanskrit } from '../../../api/actions';
import { preprocessTaggedString } from "./sanskritToolsUtils";


import styles from './../static-view.styles';

@customElement('sanskrit-tools')
export class SanskritTools extends LitElement {
  @property({ type: String }) fetchLoading = false;
  @property({ type: String }) hideForm = 'hidden';
  @property({ type: String }) taggedSanskritText = "";
  @property({ type: String }) fetchError;

    
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

    this.fetchLoading = true;
    const { tagged, error } = await getTaggedSanskrit({
      query: inputText,
    });
    this.fetchLoading = false;
      this.taggedSanskritText = tagged;
      this.hideForm = "visible";
      this.fetchLoading = false;
      this.fetchError = error;

  }

  render() {
    return html`
      <div class="static-page-container">
        <div class="main-border">
          <div class="main-content">
            <h1>Sanskrit Language Tools</h1>
            <bn-card light id="input-form">
              <vaadin-text-area
                label="Sanskrit Stemmer + Tagger"
                maxlength=100
                placeholder="Enter Sanskrit text here (max. 100 characters, unicode)..."
                id="input-stemmer"
              >
              </vaadin-text-area>
              <vaadin-button id="submit-button" @click="${this.submitFormInput}"
                >Run stemmer+tagger</vaadin-button
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
            ><b>Tagged Result:</b><br/>
              ${preprocessTaggedString(this.taggedSanskritText)}
            </bn-card>
          </div>
        </div>
      </div>
    `;
  }
}
