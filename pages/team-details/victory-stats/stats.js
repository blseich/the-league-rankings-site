/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { colors } from '../../../shared/theming';

const stats = css`
    align-self: flex-end;
    margin-top: .5rem;
    width: 100%;
    display: flex;

    @media (min-width: 1028px) {
        width: 60%;
        margin: auto;
    }

    .stat {
        width: 33.3%;
        display: flex;
        flex-flow: column nowrap;
        align-content: center;
        justify-content: center;
        
        &--header {
            color: ${colors.secondary};
            font-size: 1.25rem;
            font-weight: 400;
            font-family: 'Patua One', sans-serif;
            text-align: center;
            margin: auto;
        }

        &--middle {
            border-left: .125rem solid ${colors.secondary};
            border-right: .125rem solid ${colors.secondary};
        }

        &--value {
            font-size: 1.25rem;
            margin: auto;
        }
    }
`;

const totalAdjustedVictories = ({ week, weeks}) => (
    weeks.find(w => w.cumulative.week === week).cumulative.adjustedVictories
);

const adjustedWinPercentage = ({ week, weeks}) => (
    Number(Math.round(totalAdjustedVictories({ week, weeks }) / (week * 11)+'e3')+'e-3')
)

const Stats = ({ team }) => (
    <div css={[
        stats,
    ]}>
        <div className={'stat'}>
            <h3 className={'stat--header'}>Adjusted<br />Victories</h3>
            <p className={'stat--value'}>{totalAdjustedVictories(team)}</p>
        </div>
        <div className={'stat stat--middle'}>
            <h3 className={'stat--header'}>Adjusted<br />Win Rate</h3>
            <p className={'stat--value'}>{adjustedWinPercentage(team)}</p>
        </div>
        <div className={'stat'}>
            <h3 className={'stat--header'}>Adjusted<br />Wins/Wins</h3>
<span className={'stat--value'}>{Number(Math.round(totalAdjustedVictories(team) / team.week+'e2')+'e-2')}</span>
        </div>
    </div>
)

export default Stats;