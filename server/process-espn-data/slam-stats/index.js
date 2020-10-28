import isSlamElligble from './is-slam-elligble';
import slamDefenderTeamIds from './slam-defender-ids';
import upcomingSlamMatchups from './upcoming-slam-matchups';

export const getSlamStats = (
    scoringPeriodId, 
    { 
        teams,
        schedule
    },
) => (
    teams
        .filter( ({ id }) => !slamDefenderTeamIds.includes(id) )
        .map(({ id }) => ({
            teamId: id,
            isSlamElligble: isSlamElligble(scoringPeriodId, schedule, id),
            upcomingMatchups: upcomingSlamMatchups(scoringPeriodId, schedule, id),
        }))
        .sort( (team1, team2) => team1.isSlamElligble ? -1 : 1 )
);    
