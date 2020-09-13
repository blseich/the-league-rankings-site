/** @jsx jsx */
import React from 'react';
import { jsx, css } from '@emotion/core'

const card = css`
    background: white;
    border-radius: .5rem;
    display: flex;
    box-shadow: .15rem .15rem .2rem .2rem #e3e3e3;
    margin-bottom: .5rem;
    box-sizing: border-box;
    padding: .5rem;

    h3 {
        font-family: 'Patua One', sans-serif;
        font-weight: 400;
        color: #282828;
        margin: 0;
    }
`;

const logo = css`
    border: .15rem solid #b0e4f9;
    border-radius: 100%;
    height: 2rem;
    width: 2rem;
    margin: auto .5rem;
`;

const placement = css`
    color: white;
    border-radius: 1rem;
    box-sizing: border-box;
    font-family: 'Roboto', serif;
    margin: auto 0 auto 0;
    padding: .1rem;
    text-align: center;
    width: 8.125%;
    background: #b0e4f9;
`;

const stats = css`
    align-self: flex-end;
    display: flex;
    width: 60%;
    margin: auto 0 auto auto;
`;

const stat = css`
    width: 33%;
    border-left: .125rem solid #90c4d9;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-items: center;

    * {
        margin: auto;
    }

    h4 {
        color: #90c4d9;
        font-size: .5rem;
        font-weight: 400;
        font-family: 'Patua One', sans-serif;
    }

    p {
        color: #282828;
        font-family: 'Roboto', sans-serif;
    }
`;

const teamName = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: .75rem;
`;


const RegularCard = ({ team, place }) => (
    <div css={card}>
        <div css={placement} className={"place"}>{place}th</div>
        <img css={logo} src={team.logo} />
        <div css={teamName}>
            <h3 className={"primary"}>{team.location}</h3>
            <h3 className={"secondary"}>{team.nickname}</h3>
        </div>
        <div css={stats} className={"stats"}>
            <div css={stat}>
                <h4>Win / Loss</h4>
                <p>{team.record.overall.wins} - {team.record.overall.losses}</p>
            </div>
            <div css={stat}>
                <h4>Points For</h4>
                <p>{team.record.overall.pointsFor}</p>
            </div>
            <div css={stat}>
                <h4>Delta</h4>
                <p>&#8595;3</p>
            </div>
        </div>
    </div>
);

export default RegularCard;