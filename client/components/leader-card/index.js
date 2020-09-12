/** @jsx jsx */
import React from 'react';
import { jsx, css } from '@emotion/core'

const first = css`
    flex-grow: 4;
    order: 2;

    h3.primary {
        font-size: 1.5rem;
    }

    h3.seconday {
        font-size: 1.25rem;
    }

    .place {
        margin: auto;
        background: gold;
    }

    .stats {
        height: 2.5rem;
        margin-top: 0;
    }
`;

const second = css`
    flex-grow: 3;
    margin-bottom: 1rem;
    margin-top: 1rem;
    order: 1;

    .place {
        margin: .5rem auto .5rem;
        background: silver;
    }
`;

const third = css`
    flex-grow: 3;
    margin-bottom: 1rem;
    margin-top: 1rem;
    order: 3;
    
    .place {
        margin: .5rem auto .5rem;
        background: #cd7f32;
    }
`;

const card = css`
    align-items: center;
    background: white;
    border-radius: .5rem;
    box-shadow: .15rem .15rem .2rem .2rem #e3e3e3;
    display: flex;
    flex-basis: 0;
    flex-flow: column nowrap;
    margin: 0 .5rem;
    padding-top: 1rem;
    color: #282828;
`;

const teamName = css`
    font-family: 'Patua One', sans-serif;
    font-size: 1.25rem;
    font-weight: 800;
    margin: 0;
`;

const logo = css`
    border: .3rem solid #b0e4f9;
    border-radius: 100%;
    height: 4.5rem;
    width: 4.5rem;
`;

const placement = css`
    color: white;
    border-radius: 1rem;
    box-sizing: border-box;
    font-family: 'Roboto', serif;
    font-weight: bolder;
    margin: auto;
    padding: .1rem;
    text-align: center;
    width: 20%;
`;

const stats = css`
    align-self: flex-end;
    background: #b0e4f9;
    border-radius: 0 0 .5rem .5rem;
    width: 100%;
    height: 2rem;
    display: flex;
    margin-top: auto;
`;

const stat = css`
    width: 33.3%;
    border-top: .125rem solid #90c4d9;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-content: center;
    font-family: 'Patua One', sans-serif;

    * {
        margin: auto;
    }
    
    h4 {
        color: #90c4d9;
        font-size: .5rem;
        font-weight: 400;
    }

    p {
        color: #ffffff;
        font-size: 1rem;
        font-family: 'Roboto', sans-serif;
    }
`;

const leftStat = css`
    border-right: .125rem solid #90c4d9;
`;

const rightStat = css`
    border-left: .125rem solid #90c4d9;
`;

const stylesForPlace = {
    first,
    second,
    third
};

const parsedPlace = {
    first: "1st",
    second: "2nd",
    third: "3rd",
};

const LeaderCard = ({ team, place }) => (
    <div css={[card, stylesForPlace[place]]}>
        <h3 css={teamName} className={"primary"}>{team.location}</h3>
        <h3 css={teamName} className={"secondary"}>{team.nickname}</h3>
        <img css={logo} src={team.logo} />
        <div css={placement} className={"place"}>{parsedPlace[place]}</div>
        <div css={stats} className={"stats"}>
            <div css={[stat, leftStat]}>
                <h4>Win / Loss</h4>
                <p>{team.record.overall.wins} - {team.record.overall.losses}</p>
            </div>
            <div css={stat}>
                <h4>Points For</h4>
                <p>{team.record.overall.pointsFor}</p>
            </div>
            <div css={[stat, rightStat]}>
                <h4>Delta</h4>
                <p>🡑3</p>
            </div>
        </div>
    </div>
);

export default LeaderCard;