import { customElement, html, LitElement } from 'lit-element';

import styles from './../static-view.styles';

@customElement('guidelines-view')
export class GuidelinesView extends LitElement {
  static get styles() {
    return [styles];
  }

  render() {
    return html`
      <div class="static-page-container">
        <div class="main-border">
          <div class="main-content">
            <h1>GUIDELINES</h1>
            <p>
              BuddhaNexus will publish the textual matches of the various languages and textual corpora gradually, as work progresses. It will also keep on improving the algorithms so as to improve the results of both the monolingual textual matches and their respective translingual alignments. For the upload of new data, major improvements of existing functions, and introduction of new functions see News. In general, the biggest challenge has been to set “gold standards” in order to get the best results, on the one hand, and avoid “noise,” on the other. While striving to optimize the default “gold standards,” BuddhaNexus understands that such standards may fluctuate depending on the text under inquiry, research questions, and personal interests, so it allows the user to manually set several of the parameters. Moreover, in order to facilitate analyses from different perspectives, several view options are possible.
            </p>
            <p>
              The textual corpora used in BuddhaNexus were obtained from various institutions (for details, see the individual languages). Due to the huge amount of material, there has been no attempt by BuddhaNexus to improve the quality of the texts (e.g. removing typos and the like). Occasionally, however, some minor changes to the texts were made for technical reasons (e.g. standardization of transliterations or formats). As our algorithms search for approximate (and not exact) matches, we believe that in most cases variants resulting from typos, or from different orthographies and the like, should not pose major problems in detecting textual matches.
            </p>
            <h2>Enter the Database</h2>
            <p>
              In order to enter the database, select the language of your choice by click on the respective symbol.
            </p>
            <h3>Submit an Inquiry</h3>
            <p>
              In order to submit an inquiry select a text from the dropdown list by using their respective catalogue numbers (for details, see the the guidelines to the individual languages). You could also limit the search to a specific folio.
            </p>
            <h3>Filter Options</h3>
            <p>
              <ul>
                <li><b>Similarity Score:</b> Uses string edit distance as a base for calculation. These can vary between 0 and 100%. The value 100 means a perfect match, while a lower value indicates less similarity. The default value varies from one language to another.</li>
                <li><b>Minimum Match Length:</b> Filters by minimum length of the matches based on the match’s number of characters, excluding punctuation signs. The default value varies from one language to another.</li>
                <li><b>Number of Co-occurrences:</b> This score represents how many times a match is contained within other matches. A higher co-occurrence means that the pertinent passage is probably a standard phrase, which is thus less likely to be a meaningful match. The default value is not to filter any matches based on co-occurrence.</li>
                <li><b>Exclude Collections:</b> Does not display the matches found in the excluded collections (or sections).</li>
                <li><b>Exclude Files:</b> Does not display the matches found in the excluded files.</li>
                <li><b>Limit to Collections:</b> Displays the matches found only in the selected collections (or sections).</li>
                <li><b>Limit to Files:</b> Displays the matches found only in the selected files.</li>
              </ul>
            </p>
            <h3>View options</h3>
            <p>
              <ul>
                <li><b>Text</b> View: Left column: Displays the entire Inquiry Text with the passages for which matches are found (coloured segments). Middle column: Displays the individual (approximate) textual matches found in various Hit Texts for a segment selected (by clicking). Right Column: Displays the Hit Texts (one at a time) in which a selected match from the middle column is found (highlighted). All matches with the Inquiry Text found in the Hit Text are coloured.</li>
                <li><b>Table</b> View: Displays a table of the matches found for the current  Inquiry Text.</li>
                <li><b>Graph</b> View: Displays various graphs visualizing the the (approximate) matches found for the Inquiry Text. The pie graph displays the distribution of the (approximate) matches according to the collection’s sections. The histogram shows the 100 Hit texts with the higher number of matches, arranged according to the matches’ length.</li>
              </ul>
            </p>
            <h3>Visual Charts</h3>
            <p>
              The Visual Charts display the intertextuality between collections, sections within collections, and single texts using a Sankey diagram. A click on a single text leads you to Text View, displaying the matches of the selected text (Inquiry Text).
            </p>
          </div>
        </div>
      </div>
    `;
  }
}
