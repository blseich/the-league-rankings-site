/** @jsx jsx */
import { jsx, css } from '@emotion/core'

const teamCard = css`
    background: white;
    border-radius: .5rem;
    box-shadow: .15rem .15rem .2rem .2rem #e3e3e3;
    box-sizing: border-box;
    display: flex;
    margin-bottom: .5rem;
    padding: .5rem;
    transition-duration: .3s;
    transition-property: transform;
    cursor: pointer;
    
    @media (min-width: 1028px) {
        &:hover {
            transform: scale(1.05);
            
        }
    }

    .logo {
        border: .15rem solid #b0e4f9;
        border-radius: 100%;
        height: 2rem;
        width: 2rem;
        margin: auto .5rem;
    }

    .placement {
        color: white;
        border-radius: 1rem;
        box-sizing: border-box;
        font-family: 'Roboto', serif;
        margin: auto 0 auto 0;
        padding: .1rem;
        text-align: center;
        background: #b0e4f9;
        font-size: .75rem;
    }

    .stats {
        align-self: flex-end;
        width: 50%;
        margin: auto 0 auto auto;

        @media (min-width: 1028px) {
            width: 60%;
        }
    }

    .stat {
        width: 33.3%;
        border-left: .125rem solid #90c4d9;
        display: flex;
        flex-flow: column nowrap;
        align-content: center;
        justify-content: center;
        
        &--header {
            color: #90c4d9;
            font-size: .5rem;
            font-weight: 400;
            font-family: 'Patua One', sans-serif;
            margin: auto;
        }

        &--value {
            color: #282828;
            font-family: 'Roboto', sans-serif;
            margin: auto;
        }
    }

    .team-name {
        display: flex;
        flex-direction: column;
        justify-content: center;
        font-size: .75rem;
        font-family: 'Patua One', sans-serif;
        font-weight: 400;
        color: #282828;

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
        margin: 0 .5rem;
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

        .placement {
            font-weight: bolder;
            margin: auto;
            width: 33%;
            order: 3;
        }

        .stats {
            background: #b0e4f9;
            border-radius: 0 0 .5rem .5rem;
            width: 100%;
            height: 2rem;
            display: flex;
            order: 99;
            margin: 0;
        }

        .stat {
            border-left: 0;
            border-top: .125rem solid #90c4d9;
        
            &-middle {
                border-left: .125rem solid #90c4d9;
                border-right: .125rem solid #90c4d9;
            }

            &--value {
                color: #ffffff;
            }
        }
    }
`;

const firstStyles = css`
    .placement {
        background: gold;
    }

    @media (min-width: 1028px) {
        flex-grow: 4;
        order: 2;

        .primary {
            font-size: 1.5rem;
        }
        .stats {
            height: 2.5rem;
        }
    }
`;

const secondStyles = css`
    .placement {
        background: silver;
    }

    @media (min-width: 1028px) {
        flex-grow: 3;
        margin-bottom: 1rem;
        margin-top: 1rem;
        order: 1;

        .placement {
            margin: .5rem auto .5rem;
        }
    }
`;

const thirdStyles = css`
    .placement {
        background: #cd7f32;
    }
    @media (min-width: 1028px) {
        flex-grow: 3;
        margin-bottom: 1rem;
        margin-top: 1rem;
        order: 3; 

        .placement {
            margin: .5rem auto .5rem;
        }
    }
`;

const placeStyles = {
    "1": firstStyles,
    "2": secondStyles,
    "3": thirdStyles,
};

const parsePlace = place => {
    switch(place) {
        case 1: 
            return "1st";
            break;
        case 2:
            return "2nd";
            break;
        case 3:
            return "3rd";
            break;
        default:
            return `${place}th`;
            break;
    }
}

const TeamCard = ({ team, selectedTeam, place, callback}) => (
    <div css={[teamCard, (place < 4 ? [leaderCard, placeStyles[`${place}`]] : '')]} onClick={() => callback(team)}>
        <div className={'placement'} css={css`
            width: ${selectedTeam !== undefined ? '12.5%' : '6.25%'};
        `}>{parsePlace(place)}</div>
        <img className={'logo'} src={team.logo} />
        <div className={'team-name'}>
            <h3 className={'primary'}>{team.location}</h3>
            <h3 className={'secondary'}>{team.nickname}</h3>
        </div>
        <div className={'stats'} css={css`
            display: ${selectedTeam !== undefined ? 'none' : 'flex'};
        `}>
            {selectedTeam}
            <div className={'stat'}>
                <h4 className={'stat--header'}>Win / Loss</h4>
                <p className={'stat--value'}>{team.record.overall.wins} - {team.record.overall.losses}</p>
            </div>
            <div className={'stat stat-middle'}>
                <h4 className={'stat--header'}>Points For</h4>
                <p className={'stat--value'}>{team.record.overall.pointsFor}</p>
            </div>
            <div className={'stat'}>
                <h4 className={'stat--header'}>Delta</h4>
                <p className={'stat--value'}>&#8679;3</p>
            </div>
        </div>
    </div>
);

export default TeamCard;