import espnUtilities from 'espn-ff-utilities';
import slamDefenderTeamIds from './slam-defender-ids';

const isSlamElligble = (scoringPeriod, schedule, teamId) => (
    espnUtilities.recordVersus(scoringPeriod, teamId, slamDefenderTeamIds, schedule).losses === 0
);

export default isSlamElligble;
