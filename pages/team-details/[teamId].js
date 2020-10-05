/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { Fragment } from 'react';
import absoluteUrl from 'next-absolute-url';
import { colors } from '../../shared/theming';
import PowerRankingStats from './power-ranking-stats';
import VictoryStats from './victory-stats';
import CoachingStats from './coaching-stats';

export default function TeamDetails({ team }) {
    return (
        <Fragment>
            <div css={css`
                display: flex;
                justify-content: space-evenly;
                padding: 0 1rem;
                max-width: 786px;
                width: 100%;
                margin: auto;
                box-sizing: border-box;
            `}>
                <img 
                    css={css`
                        border: .25rem solid ${colors.primary};
                        border-radius: 100%;
                        height: 4rem;
                        width: 4rem;
                        background: white;
                        @media(min-width: 1028px) {
                            height: 6rem;
                            width: 6rem;
                        }
                    `}
                    src={team.logo} 
                />
                <div css={css`
                    font-size: 2rem;
                    font-weight: bolder;
                    font-family: 'Patua One', sans-serif;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-evenly;
                    @media (min-width: 1028px) {
                        font-size: 2rem;
                    }
                `}>
                    <h1 css={css`margin: 0;font-size:inherit;`}>{team.location}<br />{team.nickname}</h1>
                </div>
            </div>
            <div
                css={css`
                    margin-top: 1rem;
                `}
            >
                <PowerRankingStats team={team} />
                <VictoryStats team={team} />
                <CoachingStats team={team} />
            </div>
        </Fragment>
    )
}

export async function getServerSideProps({ req, query }) {
    const { protocol, host } = absoluteUrl(req, 'localhost:3000');

    const { teamId } = query;
    const teamReq = await fetch(`${protocol}//${host}/api/team/${teamId}`);
    const team = await teamReq.json();
    return {
      props: { team },
    };
  }
  