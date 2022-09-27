import { css, Global } from '@emotion/react'
import { colors } from './theming';

export const globalStyles = (
  <Global
    styles={css`
      html,
      body {
        padding: 3rem 0;
        margin: 0;
        background: #f3f3f3;
        min-height: 100%;
        font-family: 'Roboto', Helvetica, Arial, sans-serif;
        color: ${colors.font};
        @media (min-width: 1028px) {
          font-size: 24px;
        }
      }
    `}
  />
);