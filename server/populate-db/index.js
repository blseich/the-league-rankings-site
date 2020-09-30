import { connectToDatabase } from '../../util/mongodb';
import { fetchEspnData } from './fetch-espn-data';
import { 
    getTeamsInfo,
    getWeekStats,
    getSeasonStats,
 } from '../process-espn-data';
 import getPowerRankings from '../power-rankings';


const populateDb = async scoringPeriodId => {
    const { db } = await connectToDatabase();

    const hasWeekBeenProcessed = await db.collection('teams').find({week: scoringPeriodId}).count() > 0;
    
    if (hasWeekBeenProcessed) {
        throw new Error(`Overwrite Error: There seems to already be data in the database for that scoringPeriodId=${scoringPeriodId}. Please check the database and make any modifications using the admin db client`);
    } else {
        const espnData = await fetchEspnData(scoringPeriodId);
        const teamsInfo = getTeamsInfo(scoringPeriodId, espnData);
        const weekStats = getWeekStats(scoringPeriodId, espnData);
        const seasonStatsWithRankings = getPowerRankings(
            await getSeasonStats(scoringPeriodId, weekStats)
        );

        await db.collection('teams').insertMany(teamsInfo);
        await db.collection('week_stats').insertMany(weekStats);
        await db.collection('season_stats').insertMany(seasonStatsWithRankings);
    }
}