/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { colors } from '../../../../shared/theming';

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
            font-size: .5rem;
            font-weight: 400;
            font-family: 'Patua One', sans-serif;
            margin: auto;
        }

        &--middle {
            border-left: .125rem solid ${colors.secondary};
            border-right: .125rem solid ${colors.secondary};
        }

        &--value {
            font-family: 'Roboto', sans-serif;
            margin: auto;
        }
    }
`;

const leaderStats = css`
    @media (min-width: 1028px) {
        background: ${colors.primary};
        border-radius: 0 0 .5rem .5rem;
        border: 0;
        width: 100%;
        height: 2rem;
        order: 99;
        margin: 0;
        width: 100%;

        .stat {
            border-left: 0;
            border-top: .125rem solid ${colors.secondary};
        
            &--middle {
                border-left: .125rem solid ${colors.secondary};
                border-right: .125rem solid ${colors.secondary};
            }

            &--value {
                color: #ffffff;
            }
        }
    }
`;

const DeltaSymbol = ({ delta }) => (
   delta === 0 ? '-' : <i className={`fas fa-arrow-${delta > 0 ? 'up' : 'down'}`}></i>
)

const Stats = ({record, pointsFor, delta, powerRanking }) => (
    <div css={[
        stats,
        (powerRanking < 4 ? leaderStats : ''),
    ]}>
        <div className={'stat'}>
            <h4 className={'stat--header'}>Win / Loss</h4>
            <p className={'stat--value'}>{record.wins} - {record.losses}</p>
        </div>
        <div className={'stat stat--middle'}>
            <h4 className={'stat--header'}>Points For</h4>
            <p className={'stat--value'}>{pointsFor}</p>
        </div>
        <div className={'stat'}>
            <h4 className={'stat--header'}>Delta</h4>
            <span className={'stat--value'} css={css`
                    color: ${delta > 0 ? colors.positive : delta < 0 ? colors.negative : '' };
            `}><DeltaSymbol delta={delta}/>{delta !== 0 ? Math.abs(delta) : ''}</span>
        </div>
    </div>
)

export default Stats;