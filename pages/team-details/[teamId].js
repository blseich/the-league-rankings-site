/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import absoluteUrl from 'next-absolute-url';
import { colors } from '../../shared/theming';

export default function TeamDetails({ team }) {
    return (
        <div css={css`
            display: flex;
            justify-content: space-evenly;
            padding: 0 1rem;
            max-width: 786px;
            width: 100%;
            margin: auto;
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
                font-size: 1.5rem;
                font-weight: bolder;
                font-family: 'Patua One', sans-serif;
                display: flex;
                flex-direction: column;
                justify-content: space-evenly;
                @media (min-width: 1028px) {
                    font-size: 2rem;
                }
            `}>
                <div>{team.location}</div>
                <div>{team.nickname}</div>
            </div>
        </div>
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
  