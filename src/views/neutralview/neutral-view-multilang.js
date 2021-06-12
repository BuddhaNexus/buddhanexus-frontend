import { customElement, html, LitElement } from 'lit-element';

import sharedDataViewStyles from '../data/data-view-shared.styles';
import styles from './neutral-view.styles';

@customElement('neutral-view-multilang')
export class NeutralViewChinese extends LitElement {
  static get styles() {
    return [styles, sharedDataViewStyles];
  }

  render() {
    return html`
      <div class="static-page-container lang_chn">
        <div class="main-border">
          <div class="main-content">
            <h2>Multilingual Sankrit &lt;&gt; Tibetan</h2>
            <p>
              This category offers a view mode dedicated to the display of
              multilingual textual matches of the selected Inquiry Text in a
              tabular format. This category is currently only available for
              Sanskrit texts and their Tibetan translations. The Inquiry Text
              could be either the Sanskrit original or its Tibetan translation,
              while the matches shown would be in Tibetan or Sanskrit,
              respectively.
            </p>
            <p>
              The multilingual data presented in BuddhaNexus is created by
              automatically generating sentence alignment between a given
              Sanskrit text and its Tibetan translation. Note that the
              multilingual alignments currently offered do not encompass all
              texts that are available in both Sanskrit and Tibetan, but merely
              those texts for which relatively good results could be achieved.
            </p>
            <p>
              The Sanskrit texts used have their origin either in the
              <a
                href="http://gretil.sub.uni-goettingen.de/gretil.html"
                class="content-link"
                target="_blank"
                >GRETIL</a
              >
              or
              <a
                href="https://www.dsbcproject.org/"
                class="content-link"
                target="_blank"
                >DSBC</a
              >
              collections and the Tibetan texts in the
              <a
                href="https://asianclassics.org/"
                class="content-link"
                target="_blank"
                >ACIP</a
              >
              collection. More information on the used resources is found in the
              descriptions of the pertinent language category.
            </p>
            <p>
              Upon a selection of an Inquiry Text, the multilingual matches will
              be displayed in a tabular form. To be noted is that the automatic
              alignment process produces occasional misalignment of sentences or
              parts of sentences. This is, among other reasons, due to the fact
              that the Sanskrit and Tibetan digital texts used follow at times
              different conventions for sentence division and segmentation
              marks.
            </p>
            <p>
              While the algorithm was optimized to produce as little
              misalignment as possible, no attempt has been made to manually
              improve the alignments. For the user’s convenience, a similarity
              score for each match is provided in the multilingual table view.
              Those multilingual matches that show only little similarity, and
              might therefore be cases of misalignment, have been filtered out
              in the default setting. In order to view those matches that were
              filtered out the similarity setting in the filter menu should be
              decrease as desired.
            </p>
            <p>
              In addition to the display of the multilingual matches in a
              tabular form, all other view modes offered in the pertinent
              language category are also available.
            </p>
            <p>
              Moreover, by clicking on the arrow symbol to the right of the
              filename of each match, one is automatically led to a text view of
              the Hit Text in question at that specific position. In the
              monolingual Sanskrit and Tibetan categories, those texts for which
              multilingual alignments are available are indicated by icons (in
              the colour of the respective language) found to the right of the
              filename in the dropdown and the sidebar menus. The multilingual
              data is also included in the text view of these texts, where they
              are shown at the top of each list of the matches displayed.
            </p>
          </div>
        </div>
      </div>
    `;
  }
}
