import populateDb from '../../../server/populate-db';

export default async (req, res) => {
    const { scoringPeriodId } = req.query;
    try {
        await populateDb(parseInt(scoringPeriodId));
        res.send(`Week ${scoringPeriodId} data successfully written to database`);
    } catch(e) {
        res.send(`Error writing data for week ${scoringPeriodId}:\n\n${e.message}`)
    }
}