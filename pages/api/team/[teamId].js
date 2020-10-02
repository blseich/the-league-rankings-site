import { connectToDatabase } from "../../../util/mongodb";

export default async (req, res) => {
    const { db } = await connectToDatabase();
    const { teamId } = req.query;
    const [ teamInfo ] = await db.collection('teams')
        .aggregate([
           { $match: { teamId: parseInt(teamId) } },
           { $sort: { week: -1 } },
        ])
        .toArray();
    const weekStats = await db.collection('week_stats')
        .aggregate([
            { $match: { teamId: parseInt(teamId) } },
            { $sort: { week: 1 } },
        ])
        .toArray();
    const seasonStats = await db.collection('season_stats')
        .aggregate([
            { $match: { teamId: parseInt(teamId) } },
            { $sort: { week: 1 } },
        ])
        .toArray();

    teamInfo.weeks = new Array(teamInfo.week)
        .fill({})
        .map((_, i) => ({
            single: weekStats[i],
            cumulative: seasonStats[i],
        }))

    res.json(teamInfo);
};