/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { useMemo } from 'react';
import { XAxis, YAxis, LineChart, Tooltip, ResponsiveContainer, Line, CartesianGrid } from 'recharts';
import { colors } from '../../../shared/theming';


const PowerRankingChart = ({ weeks }) => {
    const data =weeks.map(({ cumulative: { week, powerRanking } }) => ({
            week,
            powerRanking,
        })).sort((a, b) => a.week - b.week);
    return (
        <ResponsiveContainer heighy='50%' aspect={1.25}>
            <LineChart data={data} margin={{
                left: 0,
                right: 50,
                bottom: 20,
                top: 20
            }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="week" tickCount={weeks.length -1}/>
                <YAxis domain={[1, 12]} reversed={true} tickCount={12} interval="preserveStart"/>
                <Tooltip />
                <Line dataKey="powerRanking" stroke={colors.secondary} strokeWidth={3} dot={{ r:5 }} isAnimationActive={false} />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default PowerRankingChart;