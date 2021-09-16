/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { Fragment, useState } from 'react';
import {
    XYPlot, LineMarkSeries, XAxis, YAxis, HorizontalGridLines, Hint, AreaSeries
} from 'react-vis';
import { colors } from '../../../shared/theming';

const Tooltip = ({ tooltipData, week }) => (
    <div css={css`
        font-size: .75rem;
        background: black;
        box-sizing: border-box;
        padding: .25rem;
        color: white;
    `}>
        <p css={css`margin: 0;`}>Week: {tooltipData.x}</p>
        <p css={css`margin: 0;`}>Best Score: {week.bestPossibleScore}</p>
        <p css={css`margin: 0;`}>Real Score: {week.pointsFor}</p>
    </div>
);

const Chart = ({ weeks }) => {
    const [ tooltipData, setTooltipData ] = useState(null);
    const data1 = weeks.map(({ single }) => ({
        x: single.week,
        y: single.bestPossibleScore,
    })).sort((d1, d2) => d2.x-d1.x);

    const data2 = weeks.map(({ single }) => ({
        x: single.week,
        y: single.pointsFor,
    })).sort((d1, d2) => d2.x-d1.x);

    return (
        <div css={css`margin: auto; padding: .5rem; width: 350px;`}>
            <XYPlot
                yDomain={[70, 200]}
                onMouseLeave={() => setTooltipData(null)}
                width={350}
                height={350}
            >
                <HorizontalGridLines />
                <AreaSeries
                    data={data1}
                    onNearestX={(value) => setTooltipData(value)}
                    color={colors.negative}
                />
                <AreaSeries
                    data={data2}
                    onNearestX={(value) => setTooltipData(value)}
                    color={colors.positive}
                />
                <XAxis 
                    tickTotal={data1.length-1}
                    style={{
                        text: { fontSize: '1rem' },
                        line: { strokeWidth: 4, stroke: colors.secondary },
                    }}
                    title={'Week'}
                />
                <YAxis 
                    tickFormat={(val) => Math.abs(val)}
                    style={{
                        text: { fontSize: '16px' },
                        line: { strokeWidth: 4, stroke: colors.secondary },
                    }}
                    title={'Points'}
                />
                {tooltipData && (
                    <Hint value={tooltipData}>
                        <Tooltip tooltipData={tooltipData} week={weeks.find(week => week.single.week === tooltipData.x).single}/>
                    </Hint>
                )}
            </XYPlot>
        </div>
    );
};

export default Chart;