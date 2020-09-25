import { initForScoringPeriod as espnFfInit} from 'espn-ff-utilities';

export const getWeekStats = (
    scoringPeriodId,
    { 
        teams,
        schedule,
        settings 
    }
) => {
    const {
        adjustedVictories,
        bestWeeklyScore,
        realWeeklyScore,
        didWin,
    } = espnFfInit(scoringPeriodId, schedule, settings);
    return teams.map(({ id }) => ({
        adjustedVictories: adjustedVictories(id),
        bestPossibleScore: Number(Math.round(bestWeeklyScore(id)+'e2')+'e-2'),
        didWin: didWin(id),
        pointsFor: Number(Math.round(realWeeklyScore(id)+'e2')+'e-2'),
        teamId: id,
        week: scoringPeriodId,
    }));
};