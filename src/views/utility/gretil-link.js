import { customElement, html, LitElement, property } from 'lit-element';
import { getGretilLink } from '../../api/actions';
import { getLanguageFromFilename } from './views-common';

@customElement('gretil-link')
export class FormattedFileName extends LitElement {
  @property({ type: String }) filename;
  @property({ type: String }) gretilLink = '';
  @property({ type: Function }) allowFetching = false;
  @property({ type: Function }) fetchLoading = false;
  @property({ type: String }) fetchError;

  updated() {
    this.fetchData();
    this.lang = getLanguageFromFilename(this.filename);
  }

  async fetchData() {
    const { gretilLink, error } = await getGretilLink({
      fileName: this.filename,
    });
    this.gretilLink = gretilLink;
    this.fetchLoading = false;
    this.fetchError = error;
  }

  render() {
    if (this.fetchLoading || this.lang != 'skt') {
      return;
    }
    // prettier-ignore
    return html`<span class="gretil-link" title="For the original GRETIL file including full header information, click here."><a href="${this.gretilLink}">GRETIL</a></span>`
  }
}
