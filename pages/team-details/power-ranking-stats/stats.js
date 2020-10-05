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
        margin: auto 0 auto auto;
        border-left: .125rem solid ${colors.secondary};
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

const Stats = ({ team }) => (
    <div css={[
        stats,
    ]}>
        <div className={'stat'}>
            <h3 className={'stat--header'}>Current<br />Rank</h3>
            <p className={'stat--value'}>{team.weeks.sort((t1, t2) => t2.cumulative.week - t1.cumulative.week)[0].cumulative.powerRanking}</p>
        </div>
        <div className={'stat stat--middle'}>
            <h3 className={'stat--header'}>Highest<br />Rank</h3>
            <p className={'stat--value'}>{team.weeks.sort((t1, t2) => t1.cumulative.powerRanking - t2.cumulative.powerRanking)[0].cumulative.powerRanking}</p>
        </div>
        <div className={'stat'}>
            <h3 className={'stat--header'}>Lowest<br />Rank</h3>
            <span className={'stat--value'}>{team.weeks.sort((t1, t2) => t2.cumulative.powerRanking - t1.cumulative.powerRanking)[0].cumulative.powerRanking}</span>
        </div>
    </div>
)

export default Stats;