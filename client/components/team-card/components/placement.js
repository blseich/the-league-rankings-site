/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react'
import { colors } from '../../../../shared/theming';

const placement = css`
    border-radius: 1rem;
    box-sizing: border-box;
    color: ${colors.primary};
    font-family: 'Roboto', serif;
    font-size: 1.25rem;
    font-weight: bolder;
    margin: auto 0 auto 0;
    padding: .1rem;
    text-align: center;
    flex-grow: 1;
    flex-basis: 0;
    transition-property: width;
    transition-duration: .3s;

    @media (min-width: 1028px) {
        background: ${colors.primary};
        font-size: .75rem;
        color: white;
    }
`;

const leaderPlacementStyles = (place) => (css`
    background: white;
    color: ${place === 1 ? 'gold' : place === 2 ? 'silver' : '#cd7f32'};

    @media (min-width: 1028px) {
        background: ${place === 1 ? 'gold' : place === 2 ? 'silver' : '##cd7f32'};
        color: white;
        flex: 0;
        font-weight: bolder;
        width: 33%;
        order: 3;
        margin-top: ${place > 1 ? '.5rem' : '1rem'};
        margin-bottom: ${place > 1 ? '.5rem' : '1rem'};
    }
`);

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

const Placement = ({ powerRanking, selectedTeam }) => (
    <div css={[
        placement,
        (powerRanking < 4 ? leaderPlacementStyles(powerRanking) : ''),
    ]}>
        {parsePlace(powerRanking)}
    </div>
)

export default Placement;