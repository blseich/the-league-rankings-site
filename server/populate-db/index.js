import { fetchEspnData } from './fetch-espn-data';
import { compileWeeklyStats } from './compile-weekly-stats';
// import { connectToDatabase } from '../../util/mongodb';

const rankingsFormula = ({
    teamId, 
    pointsFor,
    highestWeeklyScore,
    lowestWeeklyScore,
    bestPossibleScore,
    adjustedVictories,
    record,
    week,
}) => {
    const avgPoints = pointsFor / week;
    const winningPerc = record.wins / week;
    const adjustedVictoriesPerc = adjustedVictories / (11 * week);
    const consistencyMod = highestWeeklyScore + lowestWeeklyScore;
    const coachingMod = bestPossibleScore - pointsFor;

    if (teamId === 99) return 0;
    return ((avgPoints * 5) + ((winningPerc * 150) + (adjustedVictoriesPerc * 50)) * 3 + coachingMod + consistencyMod) / 10;
}

const populateDb = async (scoringPeriodId) => {
    const espnData = await fetchEspnData(scoringPeriodId);
    const teams = getTeamInfo(scoringPeriodId, espnData);
    console.log(espnData.teams.map(({ id, location, nickname }) => ({ id, location, nickname })));
    const weeklyStats = compileWeeklyStats(scoringPeriodId, espnData);

    return weeklyStats;
}

export default populateDb;


const testFormula = async () => {
    const week1Data = await populateDb(1);
    const week2Data = await populateDb(2);
    console.log(week2Data);
    const compiledData = week1Data.map(team => {
        const week2TeamData = week2Data.find(t => team.teamId === t.teamId);
        return {
            week: 2,
            teamId: team.teamId,
            record: {
                wins: [team.didWin, week2TeamData.didWin].reduce((prev, didWin) => didWin ? prev+1 : prev, 0),
                losses: [team.didWin, week2TeamData.didWin].reduce((prev, didWin) => !didWin ? prev+1 : prev, 0),
            },
            highestWeeklyScore: team.pointsFor > week2TeamData.pointsFor ? team.pointsFor : week2TeamData.pointsFor,
            lowestWeeklyScore: team.pointsFor < week2TeamData.pointsFor ? team.pointsFor : week2TeamData.pointsFor,
            bestPossibleScore: Number(Math.round((team.bestPossibleScore + week2TeamData.bestPossibleScore)+'e2')+'e-2'),
            pointsFor: Number(Math.round((team.pointsFor + week2TeamData.pointsFor)+'e2')+'e-2'),
            adjustedVictories: team.adjustedVictories + week2TeamData.adjustedVictories
        }
    }).map(team => ({
        ...team,
        rankingsMod: rankingsFormula(team),
    }));



    const rankings = compiledData.sort((team1, team2) => {
        return team1.rankingsMod > team2.rankingsMod ? -1 : 1;
    }).map((team, index) => ({
        ...team,
        rank: index+1,
    }));

    console.log(rankings);
}

testFormula();


