const rankingsFormula = ({
    pointsFor,
    highestWeeklyScore,
    lowestWeeklyScore,
    bestPossibleScore,
    adjustedVictories,
    record: { wins },
    week,
}) => {
    const avgPoints = pointsFor / week;
    const winningPerc = wins / week;
    const adjustedVictoriesPerc = adjustedVictories / (11 * week);
    const consistencyMod = highestWeeklyScore + lowestWeeklyScore;
    const coachingMod = bestPossibleScore - pointsFor;

    return ((avgPoints * 5) + ((winningPerc * 150) + (adjustedVictoriesPerc * 50)) * 3 + coachingMod + consistencyMod) / 10;
}

export default rankingsFormula;