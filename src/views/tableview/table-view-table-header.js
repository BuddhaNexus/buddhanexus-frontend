import { customElement, LitElement, property, html, css } from 'lit-element';

import styles from '../data/data-view.styles';
import sharedStyles from '../data/data-view-shared.styles';
import { FormattedFileName } from '../utility/common-components';

@customElement('table-view-table-header')
class TableViewTableHeader extends LitElement {
  @property({ type: String }) fileName;

  static get styles() {
    return [
      css`
        .table-header-container {
          display: flex;
          flex: 1;
        }

        .segment-header {
          background-color: var(--color-light-grey);
          margin: 6px 0 6px 6px;
          padding: 12px;
          flex: 2;
        }

        .segment-header.start-segment {
          flex: 1;
          margin: 6px 6px 6px 0;
        }
      `,
      styles,
      sharedStyles,
    ];
  }

  render() {
    return html`
      <div class="table-header-container">
        <div class="start-segment segment-header material-card">
          Segment in ${FormattedFileName({ fileName: this.fileName })}
        </div>
        <div class="segment-header material-card">
          Parallel segments and probabilities
        </div>
      </div>
    `;
  }
}

export default TableViewTableHeader;
