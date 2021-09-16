/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { colors } from '../../../shared/theming';

const stats = css`
    align-self: flex-end;
    margin-top: .5rem;
    width: 100%;
    display: flex;

    @media (min-width: 1028px) {
        width: 75%;
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

const averagePointsFor = ({ week, weeks}) => (
   Number(Math.round((weeks.find(w => (w.cumulative || {}).week === week).cumulative.pointsFor / week)+'e2')+'e-2')
);

const averageBestPossible = ({ week, weeks}) => (
    Number(Math.round((weeks.find(w => (w.cumulative || {}).week === week).cumulative.bestPossibleScore / week)+'e2')+'e-2')
)

const Stats = ({ team }) => (
    <div css={[
        stats,
    ]}>
        <div className={'stat'}>
            <h3 className={'stat--header'}>Average<br />Scored</h3>
            <p className={'stat--value'}>{averagePointsFor(team)}</p>
        </div>
        <div className={'stat stat--middle'}>
            <h3 className={'stat--header'}>Average<br />Best</h3>
            <p className={'stat--value'}>{averageBestPossible(team)}</p>
        </div>
        <div className={'stat'}>
            <h3 className={'stat--header'}>Average<br />Missed</h3>
<span className={'stat--value'}>{Number(Math.round(averageBestPossible(team) - averagePointsFor(team) + 'e2')+'e-2')}</span>
        </div>
    </div>
)

export default Stats;