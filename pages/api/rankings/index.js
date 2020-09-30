import { connectToDatabase } from "../../../util/mongodb";
import { rankingsForScoringPeriod } from './rankings-for-scoring-period';

export default async (req, res) => {
    const { db } = await connectToDatabase();

    const latestWeek = (await db.collection("teams").aggregate([
        { $group: { _id: { week: "$week" } } },
        { $group: { _id: null, week: { $sum: 1 } } },
    ]).toArray())[0].week;
    
    const rankingsResults = await rankingsForScoringPeriod(latestWeek)

    res.json(rankingsResults);
}