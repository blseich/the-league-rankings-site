/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useState } from 'react';
import {
    XYPlot, LineMarkSeries, XAxis, YAxis, HorizontalGridLines, VerticalGridLines, Hint
} from 'react-vis';
import { colors } from '../../shared/theming';

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

export const Chart = ({ weeks }) => {
    const [ tooltipData, setTooltipData ] = useState(null);
    const data = weeks.map(({ cumulative }) => ({
        x: cumulative.week,
        y: 0-cumulative.powerRanking,
    }));
    return (
        <div css={css`width: 750px; margin: auto; padding: .5rem;`}>
            <XYPlot
                width={300}
                height={300}
                yDomain={[-12, -1]}
                onMouseLeave={() => setTooltipData(null)}
            >
                <HorizontalGridLines />
                <LineMarkSeries
                    data={data}
                    onNearestXY={(value) => setTooltipData(value)}/>
                <XAxis 
                    tickTotal={data.length-1}
                />
                <YAxis 
                    tickFormat={(val) => Math.abs(val)}
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