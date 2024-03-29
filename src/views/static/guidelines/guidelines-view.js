import { customElement, html, LitElement } from 'lit-element';
import '@vaadin/vaadin-icons/vaadin-icons.js';

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
              BuddhaNexus will publish the textual matches of the various languages and textual corpora gradually, 
              as work progresses. It will also keep on improving the algorithms so as to improve the results of both 
              the monolingual textual matches and their respective translingual alignments. For the upload of new data, 
              major improvements of existing functions, and introduction of new functions, see
              <a href="/news" class="content-link">News</a>.
              In general, the biggest challenge has been to set “gold standards” in order to get the best results, 
              on the one hand, and avoid “noise,” on the other. While striving to optimize the default “gold standards,” 
              BuddhaNexus understands that such standards may fluctuate depending on the text under inquiry, 
              research questions, and personal interests, so it allows the user to manually set several of the parameters. 
              Moreover, in order to facilitate analyses from different perspectives, several view options are possible.   
            </p>
            <p>
              The textual corpora used in BuddhaNexus were obtained from various institutions (for details, see the 
              individual languages). Due to the huge amount of material, there has been no attempt by BuddhaNexus to 
              improve the quality of the texts (e.g. removing typos and the like). Occasionally, however, some minor 
              changes to the texts were made for technical reasons (e.g. standardization of transliterations or formats). 
              As our algorithms search for approximate (and not exact) matches, we believe that in most cases variants 
              resulting from typos, or from different orthographies and the like, should not pose major problems in 
              detecting textual matches. 
            </p>
            <h2>Enter the Database</h2>
            <p>
              In order to enter the database, select the language of your choice by either clicking on the respective 
              symbol or selecting it from the top menu bar, under “Database.” 
            </p>
            <h3>Submit an Inquiry</h3>
            <p>
              In order to submit an inquiry select a text from the dropdown list by using their respective catalogue 
              numbers (for details, see the guidelines to the individual languages). Once the matches have been generated 
              (Text View), you can view them by either scrolling down and up or by selecting the passage you are interested 
              in by selecting the respective folio number from the dropdown list. You may alternatively select a text from
              the sidebar (opens upon clicking on the triple bar symbol
              <iron-icon class="info-icon" icon="vaadin:vaadin:menu"></iron-icon> situated on the left side of the menu bar),
              which offers an overview of the available texts according to thematic sections of various kinds.
            </p>
            <h3>Global Text Search</h3>
            <p>
              The Global Text Search offers a search by a text passage. Upon typing in a text passage (max. length 150 characters), 
              a list with the pertinent hits will be displayed. Hits for which a multilingual data is available are listed on
              first and are marked as such (“MULTILINGUAL DATA VAILABLE”). A click on any of the results will display the full
              text in the Text View mode. The total number of possible search results is limited to 200 items.
            </p>
            <h3>Filter Options</h3>
            <p>
              <ul>
                <li><b>Similarity Score:</b> Uses string edit distance as a base for calculation. These can vary between 
                0 and 100%. The value 100 means a perfect match, while a lower value indicates less similarity. The default 
                value varies from one language to another.</li>
                <li><b>Minimum Match Length:</b> Filters by minimum length of the matches based on the match’s number of 
                characters, excluding punctuation signs. The default value varies from one language to another.</li>
                <li><b>Number of Co-occurrences:</b> This score represents how many times a match is contained within other 
                matches. A higher co-occurrence means that the pertinent passage is probably a standard phrase, which is thus 
                less likely to be a meaningful match. The default value is not to filter any matches based on co-occurrence.</li>
                <li><b>Exclude Collections:</b> Does not display the matches found in the excluded collections (or sections).</li>
                <li><b>Exclude Files:</b> Does not display the matches found in the excluded files.</li>
                <li><b>Limit to Collections:</b> Displays the matches found only in the selected collections (or sections).</li>
                <li><b>Limit to Files:</b> Displays the matches found only in the selected files.</li>
              </ul>
            </p>
            <h3>View options</h3>
            <p>
              <ul>
                <li><b>Text View</b>: Upon selecting a file, the entire Inquiry Text with the passages for which matches are
                found is shown. The presence of matches in the Inquiry Text is indicated by colours. To view the matches use
                the scrollbar, to go back to the beginning of the Inquiry Text click the
                <iron-icon class="info-icon" icon="vaadin:vaadin:arrow-circle-up-o"></iron-icon> symbol, 
                to display the Inquiry Text in a new tab, click the 
                <iron-icon class="info-icon" icon="vaadin:external-link"></iron-icon> symbol. 
                Upon selecting (by clicking) any of the coloured positions, the matches found in various Hit Texts for that
                position will be displayed in a new column. Whenever multilingual alignment (Sanskrit &lt;&gt; Tibetan) is available
                for the Inquiry Text, the multilingual match would be displayed first, followed by the various monolingual 
                matches found in other texts. (An option for disabling the multilingual match display is available in the filter.)
                By clicking on any of these matches the respective Hit Text will be displayed in yet another column, with the 
                match in question highlighted. All matches with the Inquiry Text 
                found in the displayed Hit Text are coloured. To display the Hit Text in a new tab, click the
                <iron-icon class="info-icon" icon="vaadin:external-link"></iron-icon> symbol.</li>
                <li><b>Table View</b>: Displays a table of the matches found for the current Inquiry Text. The results can be sorted 
                in three different ways: (1) by their position in the Inquiry Text, (2) by their position in the Hit Text(s), and (3) 
                by the length of the match in the Hit Text. </li>
                <li><b>Numbers View</b>: Displays a table with the segment numbers of the matches found for the current Inquiry Text. 
                This view mode is only available for Pāli and Chinese texts, where the segment numbers represent the PTS and Taisho
                numbers, respectively.</li>
                <li><b>Multilingual View</b>: Displays automatically generated sentence alignment between a given Sanskrit text 
                and its Tibetan translation in a table form. This view mode is available only under the category “Multilingual”.</li>
                <li><b>Graph View</b>: Displays various graphs visualizing the (approximate) matches found for the Inquiry Text. 
                The pie graph displays the distribution of the (approximate) matches according to the collection’s sections. 
                The histogram shows the distribution of the top files that have matches with the Inquiry Text based on the 
                accumulated length of the approximate matches. A maximum of 50 Hit Texts are shown.</li>
                <li><b>English View</b>: This view-mode is only available for Pāli texts. It displays the original text
                together with a machine translation into English created by the
                <a target="_blank" class="content-link" href="https://github.com/tensorflow/tensor2tensor">Transformer machine learning model</a>.
                This model is based on the English translations by Bhikkhu Sujato (Suttas) or Bhikkhu Bhahmali (Vinaya).
                Additionally, the original English translation is also offered if available.</li>
              </ul>
            </p>
            <h3>Links</h3>
            <p>
            BuddhaNexus makes effort to provide useful links of various kinds. These include, whenever possible, links of the
            individual files to the websites from which the digital texts were obtained and to websites offering cataloguing data.
            Currently links with the following websites are available:
            <a target="_blank" class="content-link" href="https://suttacentral.net">SuttaCentral</a> and
            <a target="_blank" class="content-link" href="https://tipitaka.org/">VRI</a> for Pāli,
            <a target="_blank" class="content-link" href="http://gretil.sub.uni-goettingen.de/gretil.html">GRETIL</a>,
            <a target="_blank" class="content-link" href="http://www.dsbcproject.org">DSBC</a> and
            <a target="_blank" class="content-link" href="https://suttacentral.net">SuttaCentral</a> for Sanskrit,
            <a target="_blank" class="content-link" href="https://www.bdrc.io/buda-archive/">BUDA</a> and
            <a target="_blank" class="content-link" href="https://www.istb.univie.ac.at/kanjur/rktsneu/sub/index.php">rKTs</a> for Tibetan, and
            <a target="_blank" class="content-link" href="https://cbeta.org">CBETA</a>, <a target="_blank" class="content-link" href="https://suttacentral.net">SuttaCentral</a> and
            <a target="_blank" class="content-link" href="https://dazangthings.nz/cbc/">CBC@</a> for Chinese.
            </p>
            <h3>Visual Charts</h3>
            <p>
              The Visual Charts display the intertextuality between collections, sections within collections, and single 
              texts using a Sankey diagram. To choose a language, click on the respective symbol. Upon selecting the Inquiry 
              and Hit collections, a Sankey diagram displaying the distribution of the matches will be generated. The display 
              colouring scheme is available in three options: gradient, according to the Inquiry Collection, or according to 
              the Hit Collection. You can reduce the display to a single section (by clicking on the left fringe of that section),
              and then further to a single text. A click on the left fringe of the selected text leads you to Text View,
              where the matches of the selected text (Inquiry Text) are displayed.
            </p>
          </div>
        </div>
      </div>
    `;
  }
}
