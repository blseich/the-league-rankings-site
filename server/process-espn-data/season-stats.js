import { getSeasonDataForWeek } from '../../util/mongodb';

const {
    min,
    max,
    round,
} = Math;

const initTeam = {
    adjustedVictories: 0,
    bestPossibleScore: 0,
    pointsFor: 0,
    highestWeeklyScore: 0,
    lowestWeeklyScore: 10000,
    record: {
        wins: 0,
        losses: 0,
    },
};

const initSeasonData = () => (
    new Array(12).fill({})
    .map((t, ind) => ({
        ...initTeam,
        teamId: ind + 1,
    }))
);

export const getSeasonStats = async (scoringPeriodId, weekStats) => {
    const prevWeekData = scoringPeriodId > 1 ? 
        await getSeasonDataForWeek(scoringPeriodId - 1) : initSeasonData();

    return weekStats.map(({
        adjustedVictories,
        bestPossibleScore,
        didWin,
        pointsFor,
        teamId,
    }) => {
        const prevWeekTeamData = prevWeekData.find(t => t.teamId === teamId);
        return {
            adjustedVictories: adjustedVictories + prevWeekTeamData.adjustedVictories,
            bestPossibleScore: Number(round(bestPossibleScore + prevWeekTeamData.bestPossibleScore+'e2')+'e-2'),
            highestWeeklyScore: max(pointsFor, prevWeekTeamData.highestWeeklyScore),
            lowestWeeklyScore: min(pointsFor, prevWeekTeamData.lowestWeeklyScore),
            pointsFor: Number(round(pointsFor + prevWeekTeamData.pointsFor + 'e2')+'e-2'),
            record: {
                wins: prevWeekTeamData.record.wins + (didWin ? 1 : 0),
                losses: prevWeekTeamData.record.losses + (didWin ? 0 : 1),
            },
            teamId,
            week: scoringPeriodId,
        };
    });
};
