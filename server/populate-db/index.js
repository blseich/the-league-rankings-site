import { fetchEspnData } from './fetch-espn-data';
import { 
    getTeamsInfo,
    getWeekStats,
    getSeasonStats,
 } from '../process-espn-data';
 import getPowerRankings from '../power-rankings';

const populateDb = async scoringPeriodId => {
    const espnData = await fetchEspnData(scoringPeriodId);
    const teamsInfo = getTeamsInfo(scoringPeriodId, espnData);
    const weekStats = getWeekStats(scoringPeriodId, espnData);
    const seasonStatsWithRankings = getPowerRankings(
        await getSeasonStats(scoringPeriodId, weekStats)
    );

    console.log(seasonStatsWithRankings);
}

populateDb(1);