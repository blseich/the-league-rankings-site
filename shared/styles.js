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
        font-size: 24px;
      }
    `}
  />
)

export const basicStyles = css`
  background-color: white;
  color: cornflowerblue;
  border: 1px solid lightgreen;
  border-right: none;
  border-bottom: none;
  box-shadow: 5px 5px 0 0 lightgreen, 10px 10px 0 0 lightyellow;
  transition: all 0.1s linear;
  margin: 3rem 0;
  padding: 1rem 0.5rem;
`

export const hoverStyles = css`
  &:hover {
    color: white;
    background-color: lightgray;
    border-color: aqua;
    box-shadow: -15px -15px 0 0 aqua, -30px -30px 0 0 cornflowerblue;
  }
`
export const bounce = keyframes`
  from {
    transform: scale(1.01);
  }
  to {
    transform: scale(0.99);
  }
`

export const Basic = styled('div')`
  ${basicStyles};
`

export const Combined = styled('div')`
  ${basicStyles};
  ${hoverStyles};
  & code {
    background-color: linen;
  }
`
export const Animated = styled('div')`
  ${basicStyles};
  ${hoverStyles};
  & code {
    background-color: linen;
  }
  animation: ${(props) => props.animation} 0.2s infinite ease-in-out alternate;
`

export const Logo = styled('img')`
  height: 100px;
  width: 100px;
  border-radius: 100%;
  border: .3rem solid #e3e3e3;
`

const leaderCard = css`
  box-shadow: .15rem .15rem .2rem .2rem #e3e3e3;
  border-radius: .5rem;
  margin: 0 .5rem;
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem 0;
`

export const Leaders = styled('div')`
  display: flex;
  justify-content: space-between;
  margin: auto;
  max-width: 60%;
`

export const FirstPlace = styled('div')`
  ${leaderCard};
  flex-grow: 4;
  order: 2;
`
export const SecondPlace = styled('div')`
  ${leaderCard};
  margin-top: 1rem;
  margin-bottom: 1rem;
  flex-grow: 3;
  order: 1;
`
export const ThirdPlace = styled('div')`
  ${leaderCard};
  margin-top: 1rem;
  margin-bottom: 1rem;
  flex-grow: 3;
  order: 3;
`
const leaderTitle = css`
  font-family: 'Patua One', sans-serif;
  margin: 0;
  font-weight: 800;
`

export const LeaderTitlePrimary = styled('h3')`
  ${leaderTitle};
  font-size: 1.5rem;
`
export const LeaderTitleSecondary = styled('h3')`
  ${leaderTitle};
  font-size: 1.25rem;
`