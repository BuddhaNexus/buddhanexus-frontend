import { css } from 'lit-element';

export default css`
        .formatted-file-name:hover:after {
          content: attr(name);
          background-color: var(--bn-dark-red);
          border-radius: 4px;
          box-shadow: 0 4px 8px #888888;
          color: var(--color-menu-items);
          opacity: 0.9;
          font-size: 14px;
          padding: 4px 8px;
          margin-top: 24px;
          position: absolute;
          z-index: 999;
          font-weight: bold;
        }

        .formatted-file-name.right:hover:after {
          margin-top: 36px;
          right: 24px;
        }

        .formatted-file-name {
          font-size: 1.05em;
          margin-left: 8px;
        }
  }
`;
