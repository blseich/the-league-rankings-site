import ScoringPeriodId from '../../../pages/api/populate-db/[scoringPeriodId]';
import slamDefenderTeamIds from './slam-defender-ids';

const upcomingSlamMatchups = (scoringPeriodId, schedule, teamId) => {
    return schedule
        .filter( ({ away, home, matchupPeriodId }) => matchupPeriodId > scoringPeriodId
            && (
                (away.teamId === teamId && slamDefenderTeamIds.includes(home.teamId))
                || (home.teamId === teamId && slamDefenderTeamIds.includes(away.teamId))
            )
        )
        .map(({matchupPeriodId, home, away}) => ({
                week: matchupPeriodId,
                opponent: home.teamId === teamId ? away.teamId : home.teamId,
            })
        )
};

export default upcomingSlamMatchups;