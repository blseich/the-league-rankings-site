/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import Stats from './components/stats';
import Placement from './components/placement';

const teamCard = css`
    background: white;
    border-radius: .5rem;
    box-shadow: .15rem .15rem .2rem .2rem #e3e3e3;
    box-sizing: border-box;
    display: flex;
    flex-flow: wrap;
    margin-bottom: 1rem;
    padding: .5rem;
    transition-duration: .3s;
    transition-property: transform;
    cursor: pointer;
    
    @media (min-width: 1028px) {
        &:hover {
            transform: scale(1.05); 
        }
        flex-flow: nowrap;
    }

    .logo {
        border: .15rem solid #b0e4f9;
        border-radius: 100%;
        height: 2rem;
        width: 2rem;
        margin: auto .5rem;
    }

    .team-name {
        align-items: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        font-size: 1rem;
        font-family: 'Patua One', sans-serif;
        flex-grow: 4;
        flex-basis: 0;
        font-weight: 400;
        color: #282828;

       @media(min-width: 1028px) {
           align-items: flex-start;
           font-size: .75rem;
       }

        * {
            margin: 0;
        }
    }
`;

const leaderCard = css`
    @media (min-width: 1028px) {
        align-items: center;
        flex-basis: 0;
        flex-flow: column nowrap;
        margin: 0 .5rem .5rem 1rem;
        padding: 1rem 0 0 0;

        .logo {
            border: .3rem solid #b0e4f9;
            height: 4.5rem;
            width: 4.5rem;
            order: 2;
        }

        .team-name {
            font-weight: 800;
            font-size: 1.25rem;
            order: 1;
            
            * {
                margin: 0 auto;
            }
        }
    }
`;

const firstStyles = css`
    @media (min-width: 1028px) {
        flex-grow: 4;
        order: 2;
        margin-bottom: 0;
        
        .primary {
            font-size: 1.5rem;
        }
    }
`;

const secondStyles = css`
    @media (min-width: 1028px) {
        flex-grow: 3;
        margin-bottom: 1rem;
        margin-top: 1rem;
        order: 1;
    }
`;

const thirdStyles = css`
    @media (min-width: 1028px) {
        flex-grow: 3;
        margin-bottom: 1rem;
        margin-top: 1rem;
        order: 3;
    }
`;

const placeStyles = {
    "1": firstStyles,
    "2": secondStyles,
    "3": thirdStyles,
};

const TeamCard = ({ team, selectedTeam, callback}) => (
    <div 
        css={[
            teamCard,
            (team.powerRanking < 4 ? leaderCard : ''),
            placeStyles[`${team.powerRanking}`],
        ]}
        key={team.teamId}
    >
        <Placement {...team} />
        <img className={'logo'} src={team.logo} />
        <div className={'team-name'}>
            <h3 className={'primary'}>{team.location}</h3>
            <h3 className={'secondary'}>{team.nickname}</h3>
        </div>
        <Stats {...team}  />
</div>
);

export default TeamCard;