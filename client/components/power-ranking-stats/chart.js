/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useState } from 'react';
import {
    XYPlot, LineMarkSeries, XAxis, YAxis, HorizontalGridLines, VerticalGridLines, Hint
} from 'react-vis';
import { colors } from '../../../shared/theming';

const Tooltip = ({ tooltipData }) => (
    <div css={css`
        font-size: .75rem;
        background: black;
        box-sizing: border-box;
        padding: .25rem;
        color: white;
    `}>
        <p css={css`margin: 0;`}>Week: {tooltipData.x}</p>
        <p css={css`margin: 0;`}>Ranking: {Math.abs(tooltipData.y)}</p>
    </div>
);

const Chart = ({ weeks }) => {
    const [ tooltipData, setTooltipData ] = useState(null);
    const data = weeks.map(({ cumulative }) => ({
        x: cumulative.week,
        y: 0-cumulative.powerRanking,
    })).sort((d1, d2) => d2.x-d1.x);;
    return (
        <div css={css`
            margin: auto;
            padding: .5rem;
            width: 350px;
        `}>
            <XYPlot
                yDomain={[-12, -1]}
                onMouseLeave={() => setTooltipData(null)}
                width={350}
                height={350}
            >
                <HorizontalGridLines />
                <LineMarkSeries
                    data={data}
                    onNearestXY={(value) => setTooltipData(value)}
                    lineStyle={{ stroke: colors.primary, strokeWidth: 4 }}
                    markStyle={{ stroke: colors.secondary, fill: colors.secondary }}
                />
                <XAxis 
                    tickTotal={data.length-1}
                    style={{
                        text: { fontSize: '1rem',  },
                        line: { strokeWidth: 4, stroke: colors.secondary },
                    }}
                    title={'Week'}
                />
                <YAxis 
                    tickFormat={(val) => Math.abs(val)}
                    style={{
                        text: { fontSize: '1rem' },
                        line: { strokeWidth: 4, stroke: colors.secondary },
                    }}
                    title={'Power Ranking'}
                />
                {tooltipData && (
                    <Hint value={tooltipData}>
                        <Tooltip tooltipData={tooltipData} />
                    </Hint>
                )}
            </XYPlot>
        </div>
    );
};

export default Chart;