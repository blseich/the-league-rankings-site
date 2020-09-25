import { getSeasonStats } from '../season-stats';
import { getSeasonDataForWeek } from '../../../util/mongodb';

const prevWeekData = [
    {
        teamId: 1
    },
    {
        teamId: 2
    },
];

jest.mock('../../../util/mongodb');
getSeasonDataForWeek.mockReturnValue(prevWeekData)

const scoringPeriodId = 2;

describe('Get Compiled Stats', () => {
    it('should get current season stats from previous week', () => {
        getSeasonStats(scoringPeriodId);
        expect(getSeasonDataForWeek).toHaveBeenCalledWith(scoringPeriodId-1);
    });
});