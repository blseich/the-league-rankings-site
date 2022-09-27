/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { useState } from 'react';
import {
    XAxis,
    YAxis,
    ResponsiveContainer,
    Area,
    CartesianGrid,
    AreaChart
} from 'recharts';
import { colors } from '../../../shared/theming';



const Chart = ({ weeks }) => {
    const data = weeks.map(({ single: {week, bestPossibleScore, pointsFor} }) => ({
        week,
        bestPossibleScore,
        pointsFor
    })).sort((d1, d2) => d1.week-d2.week);
    return (
        <ResponsiveContainer height="50%" aspect={1.25}>
            <AreaChart data={data} margin={{
                left: 0,
                right: 50,
                bottom: 20,
                top: 20
            }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="week" tickCount={weeks.length -1}/>
                <YAxis domain={[80, 200]} tickCount={12} interval="preserveStart"/>
                <Area dataKey="bestPossibleScore" fill={colors.negative} stroke={colors.negative} isAnimationActive={false}/>
                <Area dataKey="pointsFor" fill={colors.positive} stroke={colors.positive} isAnimationActive={false} />
            </AreaChart>
        </ResponsiveContainer>
    );
};

export default Chart;