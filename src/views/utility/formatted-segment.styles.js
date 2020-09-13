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
          margin-top: 36px;
          position: absolute;
          z-index: 999;
          font-weight: bold;
        }

        .formatted-file-name.left:hover:after {
          left: 48px;
        }

        .formatted-file-name.right:hover:after {
          right: 48px;
        }

        .formatted-file-name {
          font-size: 1.05em;
          margin-left: 8px;
        }

        .segment-link {
          text-decoration: none;
          color: var(--color-text-secondary);
        }

        .copy-icon {
          width: 10px;
          color: var(--color-text-secondary);
          cursor: pointer;
        }
  }
`;
