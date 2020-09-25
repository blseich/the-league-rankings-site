import { connect } from 'mongodb';
import { getSeasonDataForWeek } from '../../util/mongodb';

export const getSeasonStats = async (scoringPeriodId, weekStats) => {
    const prevWeekData = getSeasonDataForWeek(scoringPeriodId - 1);
};
