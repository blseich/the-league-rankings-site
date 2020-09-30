import { connectToDatabase } from "../../../util/mongodb";

export const rankingsForScoringPeriod = async scoringPeriodId => {
    const { db } = await connectToDatabase();
    const teams = await db.collection("teams").find({ week: scoringPeriodId }).toArray();
    const rankingsStats = await db.collection("season_stats").find({ week: scoringPeriodId }).toArray();
    
    const rankingsResults = rankingsStats.map(ranking => ({
        ...ranking,
        ...(teams.find(team => team.teamId === ranking.teamId)),
    }));

    return rankingsResults;
}