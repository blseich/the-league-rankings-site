import { rankingsForScoringPeriod } from './rankings-for-scoring-period';

export default async (req, res) => {
    const { scoringPeriodId } = req.query;

    const rankingsResults = await rankingsForScoringPeriod(parseInt(scoringPeriodId));

    res.json(rankingsResults);
}