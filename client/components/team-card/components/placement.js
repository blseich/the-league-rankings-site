/** @jsx jsx */
import { jsx, css } from '@emotion/core'

const placement = css`
    color: white;
    border-radius: 1rem;
    box-sizing: border-box;
    font-family: 'Roboto', serif;
    margin: auto 0 auto 0;
    padding: .1rem;
    text-align: center;
    background: #b0e4f9;
    font-size: .75rem;
    transition-property: width;
    transition-duration: .3s;
`;

const leaderPlacementStyles = (place) => (css`
    @media (min-width: 1028px) {
        font-weight: bolder;
        margin: auto;
        width: 33%;
        order: 3;
        background: ${place === 1 ? 'gold' : place === 2 ? 'silver' : '##cd7f32'};
        margin-top: ${place > 1 ? '.5rem' : 'auto'};
        margin-bottom: ${place > 1 ? '.5rem' : 'auto'};
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
        css`
            width: ${selectedTeam !== undefined ? '12.5%' : '6.25%'};
        `,
        (powerRanking < 4 && !selectedTeam ? leaderPlacementStyles(powerRanking) : ''),
        
    ]}>
        {parsePlace(powerRanking)}
    </div>
)

export default Placement;