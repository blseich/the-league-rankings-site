/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { Fragment, useState } from 'react';
import {
    XYPlot, LineMarkSeries, LabelSeries, LineSeries, XAxis, YAxis, HorizontalGridLines, VerticalGridLines, Hint
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
        <p css={css`margin: 0;`}>Adjusted Wins: {Math.abs(tooltipData.y)}</p>
        <p css={css`margin: 0;`}>{week.didWin ? 'Won' : 'Lost'}</p>
    </div>
);

const Chart = ({ weeks }) => {
    const [ tooltipData, setTooltipData ] = useState(null);
    const data = weeks.map(({ single }) => ({
        x: single.week,
        y: single.adjustedVictories,
        color: single.didWin ? 0 : 1,
    })).sort((d1, d2) => d2.x-d1.x);;

    const badBeatLine = (new Array(data.length).fill({}).map((el, i) => ({
        x: i+1,
        y: 6,
    })));

    const colorRange = [colors.positive, colors.negative];
    return (
        <div css={css`margin: auto; padding: .5rem; width: 350px;`}>
            <XYPlot
                yDomain={[0, 12]}
                onMouseLeave={() => setTooltipData(null)}
                width={350}
                height={350}
            >
                <HorizontalGridLines />
                <LineMarkSeries
                    data={data}
                    onNearestXY={(value) => setTooltipData(value)}
                    lineStyle={{ stroke: colors.primary, strokeWidth: 4 }}
                    // markStyle={{ stroke: colors.secondary, fill: colors.secondary }}
                    colorRange={colorRange}
                />
                <LabelSeries
                    data={[
                        {x: weeks.length, y: 7, label: "Tough Losses", style: {fontSize: '.75rem', fill: colors.negative}},
                        {x: weeks.length, y: 5, label: "Lucky Wins", style: {fontSize: '.75rem', fill: colors.positive}}
                    ]} />
                <LineSeries
                    data={badBeatLine}
                    style={{ stroke: '#9e9e9e', strokeWidth: 2}}
                    strokeStyle={'dashed'}
                    
                    // markStyle={{ stroke: colors.secondary, fill: colors.secondary }}
                    colorRange={colorRange}
                />
                <XAxis 
                    tickTotal={data.length-1}
                    style={{
                        text: { fontSize: '1rem' },
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
                    title={'Adjusted Victories'}
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