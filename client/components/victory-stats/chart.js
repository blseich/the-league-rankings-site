/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { useState } from 'react';
import {
    XAxis,
    YAxis,
    LineChart,
    Tooltip,
    ResponsiveContainer,
    Line,
    CartesianGrid,
    Dot,
    ReferenceLine,
    Label
} from 'recharts';
import { colors } from '../../../shared/theming';

const VictoryIndicator = props => (
    <Dot 
        {...props}
        fill={props.payload.didWin ? colors.positive : colors.negative}
        r={5}
        stroke={props.payload.didWin ? colors.positive : colors.negative}
        strokeWidth={3}
    />
);

const BadBeatIndicator = ({ viewBox }) => (
    <text
        x={viewBox.width}
        y={viewBox.y-6}
        stroke={colors.negative}
        fill={colors.negative}
        textAnchor={"start"}
        fontSize={14}
    >
        ↑ Tough Loss
    </text>
)
const LuckyWinIndicator = ({ viewBox }) => (
        <text
            x={viewBox.width}
            y={viewBox.y+14}
            stroke={colors.positive}
            fill={colors.positive}
            textAnchor={"start"}
            fontSize={14}
        >
            ↓ Lucky Win
        </text>
    )

const Chart = ({ weeks }) => {
    const data = weeks.map(({ single: {week, adjustedVictories, didWin} }) => ({
        week,
        adjustedVictories,
        didWin,
    })).sort((d1, d2) => d1.week-d2.week);;

    return (
        <ResponsiveContainer height="50%" aspect={1.25}>
            <LineChart data={data} margin={{
                left: 0,
                right: 50,
                bottom: 20,
                top: 20
            }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="week" tickCount={weeks.length -1}/>
                <YAxis domain={[0, 12]} tickCount={12} interval="preserveStart"/>
                <Line dataKey="adjustedVictories" stroke={colors.secondary} strokeWidth={3} dot={VictoryIndicator} isAnimationActive={false} />
                <ReferenceLine y={6} stroke="black" strokeDasharray="4 2">
                    <Label position="top" content={BadBeatIndicator}/>
                    <Label position="bottom" content={LuckyWinIndicator}/>
                </ReferenceLine>
            </LineChart>
        </ResponsiveContainer>
    );
};

export default Chart;