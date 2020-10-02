/** @jsx jsx */
import { jsx, css } from '@emotion/core'

const stats = css`
    align-self: flex-end;
    margin-top: .5rem;
    width: 100%;

    @media (min-width: 1028px) {
        width: 60%;
        margin: auto 0 auto auto;
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
            font-family: 'Roboto', sans-serif;
            margin: auto;
        }
    }
`;

const leaderStats = css`
    @media (min-width: 1028px) {
        background: #b0e4f9;
        border-radius: 0 0 .5rem .5rem;
        width: 100%;
        height: 2rem;
        order: 99;
        margin: 0;
        width: 100%;

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

const Stats = ({record, pointsFor, delta, powerRanking, selectedTeam}) => (
    <div css={[
        stats,
        (powerRanking < 4 ? leaderStats : ''),
        css`display: ${selectedTeam !== undefined ? 'none' : 'flex'};`
    ]}>
        <div className={'stat'}>
            <h4 className={'stat--header'}>Win / Loss</h4>
            <p className={'stat--value'}>{record.wins} - {record.losses}</p>
        </div>
        <div className={'stat stat-middle'}>
            <h4 className={'stat--header'}>Points For</h4>
            <p className={'stat--value'}>{pointsFor}</p>
        </div>
        <div className={'stat'}>
            <h4 className={'stat--header'}>Delta</h4>
            <p className={'stat--value'} css={css`
                    color: ${delta > 0 ? 'green' : delta < 0 ? 'red' : '' };
            `}>{delta === 0 ? '-' : delta > 0 ? `⇧${delta}` : `⇩${Math.abs(delta)}`}</p>
        </div>
    </div>
)

export default Stats;