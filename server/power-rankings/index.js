import rankingsFormula from './rankings-formula';

const getPowerRankings = (seasonStats) => (
    seasonStats
        .map(team => ({
            ...team,
            powerRankingIndex: rankingsFormula(team),
        }))
        .sort((t1, t2) => t2.powerRankingIndex - t1.powerRankingIndex)
        .map((team, index) => ({
            ...team,
            delta: team.powerRanking - (index + 1),
            powerRanking: index + 1,
        }))
);

export default getPowerRankings;