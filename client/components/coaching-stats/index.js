/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { Fragment } from 'react';
import { colors } from '../../../shared/theming';
import Chart from './chart';
import Stats from './stats';
import MoreInfo from './more-info';

const CoachingStats = ({ team }) => (
    <Fragment>
        <h2 css={css`
            font-size: 1.5rem;
            font-weight: bolder;
            font-family:' Patua One', sans-serif;
            color: ${colors.blackish};
            margin: auto;
            text-align: center;
        `}>Coaching Stats</h2>
        <Chart {...team} />
        <Stats team={team} />
        <MoreInfo />
    </Fragment>
)

export default CoachingStats;