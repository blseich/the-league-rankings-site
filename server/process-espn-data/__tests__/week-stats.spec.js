import { getWeekStats } from '../week-stats';
import { initForScoringPeriod as espnFfInit} from 'espn-ff-utilities';

jest.mock('espn-ff-utilities');
const adjustedVictories = jest.fn();
const bestWeeklyScore = jest.fn();
const realWeeklyScore = jest.fn();
const didWin = jest.fn();
espnFfInit.mockReturnValue({
    adjustedVictories,
    bestWeeklyScore,
    realWeeklyScore,
    didWin,
});

didWin.mockReturnValue(true);
adjustedVictories.mockReturnValue(7);
bestWeeklyScore.mockReturnValue(125.25000000000005);
realWeeklyScore.mockReturnValue(100.25999999999999);

const scoringPeriodId = 1;

const teams = [
    { id: 1 },
    { id: 2 },
    { id: 3 }
];

const settings = {};

const schedule = [];

describe('Get Week Stats', () => {
    
    const weekStats = getWeekStats(scoringPeriodId, { teams, settings, schedule });

    it('should initialize espn utilities with info from espn response', () => {
        expect(espnFfInit).toHaveBeenCalledWith(scoringPeriodId, schedule, settings);
    });

    it('should produce a result for each team in espn data', () => {
        expect(weekStats).toHaveLength(teams.length);
    });

    it('should include teamId for every team', () => {
        expect(weekStats).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ teamId: 1}),
                expect.objectContaining({ teamId: 2 }),
                expect.objectContaining({ teamId: 3 }),
            ])
        );
    });

    it('should include the week number in the team', () => {
        expect(weekStats[0].week).toEqual(scoringPeriodId);
    });

    it('should call utility functions for each team', () => {
        expect(adjustedVictories).toHaveBeenCalledTimes(3);
        expect(bestWeeklyScore).toHaveBeenCalledTimes(3);
        expect(realWeeklyScore).toHaveBeenCalledTimes(3);
        expect(didWin).toHaveBeenCalledTimes(3);
        expect(adjustedVictories).toHaveBeenCalledTimes(3);
    });

    it('should round best weekly score and real weekly score to 2 decimal places', () => {
        expect(weekStats[0].bestPossibleScore).toEqual(125.25);
        expect(weekStats[0].pointsFor).toEqual(100.26);
    });

    it('should include didWin boolean in team result', () => {
        expect(weekStats[0].didWin).toEqual(true);
    });

    it('should include didWin boolean in team result', () => {
        expect(weekStats[0].adjustedVictories).toEqual(7);
    });
});