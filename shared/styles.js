import { keyframes, css, Global } from '@emotion/core'
import styled from '@emotion/styled'

export const globalStyles = (
  <Global
    styles={css`
      html,
      body {
        padding: 3rem 1rem;
        margin: 0;
        background: #f3f3f3;
        min-height: 100%;
        font-family: Helvetica, Arial, sans-serif;
        @media (min-width: 1028px) {
          font-size: 24px;
        }
      }
    `}
  />
);