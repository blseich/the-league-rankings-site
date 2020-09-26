import { getSeasonStats } from '../season-stats';
import { getSeasonDataForWeek } from '../../../util/mongodb';
import adjustedVictories from 'espn-ff-utilities/lib/adjusted-victories';

const prevWeekData = [
    {   
        teamId: 1,
        record: {
            wins: 0,
            losses: 0,
        },
        highestWeeklyScore: 100,
        lowestWeeklyScore: 100,
        adjustedVictories: 5,
        pointsFor: 100,
        bestPossibleScore: 150,
    },
    {
        teamId: 2,
        record: {
            wins: 0,
            losses: 0,
        },
        highestWeeklyScore: 100,
        lowestWeeklyScore: 100,
        adjustedVictories: 5,
        pointsFor: 100,
        bestPossibleScore: 150,
    },
];

const weekData = [];

jest.mock('../../../util/mongodb');
getSeasonDataForWeek.mockReturnValue(Promise.resolve(prevWeekData));

const scoringPeriodId = 2;

describe('Get Compiled Stats', () => {
    it('should get current season stats from previous week', async done => {
        await getSeasonStats(scoringPeriodId, []);
        expect(getSeasonDataForWeek).toHaveBeenCalledWith(scoringPeriodId-1);
        done();
    });

    it('should create an entry for every team', async done => {
        const weekData = [{
            teamId: 1
        }, {
            teamId: 2
        }];
        const result = await getSeasonStats(scoringPeriodId, weekData);
        expect(result).toEqual(expect.arrayContaining([
            expect.objectContaining({ teamId: 1 }),
            expect.objectContaining({ teamId: 2 }),
        ]));
        done();
    });

    it('should place scoringPeriodId onto each object as a week identifier', async done => {
        const weekData = [{
            teamId: 1
        }, {
            teamId: 2
        }];
        const result = await getSeasonStats(scoringPeriodId, weekData);
        expect(result[0].week).toEqual(scoringPeriodId);
        expect(result[1].week).toEqual(scoringPeriodId);
        done();
    });

    describe('combining record', () => {
        it('should increase wins in record if team won that week', async done => {
            const weekData = [{
                teamId: 1,
                didWin: true
            }];
            const result = await getSeasonStats(scoringPeriodId, weekData);
            expect(result[0].record.wins).toEqual(1);
            done();
        });
        it('should not increase losses in record if team won that week', async done => {
            const weekData = [{
                teamId: 1,
                didWin: true
            }];
            const result = await getSeasonStats(scoringPeriodId, weekData);
            expect(result[0].record.losses).toEqual(0);
            done();
        });
        it('should increase losses in record if team did not win that week', async done => {
            const weekData = [{
                teamId: 1,
                didWin: false
            }];
            const result = await getSeasonStats(scoringPeriodId, weekData);
            expect(result[0].record.losses).toEqual(1);
            done();
        });
        it('should not increases wins in record if team did not win that week', async done => {
            const weekData = [{
                teamId: 1,
                didWin: false
            }];
            const result = await getSeasonStats(scoringPeriodId, weekData);
            expect(result[0].record.wins).toEqual(0);
            done();
        });
    });

    describe('set highest/loweset score', () => {
        const weekWithHigherPointsForData = [{
            teamId: 1,
            pointsFor: 125,
        }];
        const weekWithLowerPointsForData = [{
            teamId: 1,
            pointsFor: 75,
        }];
        it('should store higher score as highest weekly score', async done => {
            const result = await getSeasonStats(scoringPeriodId, weekWithHigherPointsForData);
            expect(result[0].highestWeeklyScore).toEqual(125);
            done();
        });
        it('should not store higher score as lowest weekly score', async done => {
            const result = await getSeasonStats(scoringPeriodId, weekWithHigherPointsForData);
            expect(result[0].lowestWeeklyScore).toEqual(100);
            done();
        });
        it('should not store lower score as highest weekly score', async done => {
            const result = await getSeasonStats(scoringPeriodId, weekWithLowerPointsForData);
            expect(result[0].highestWeeklyScore).toEqual(100);
            done();
        });
        it('should store lower score as lowest weekly score', async done => {
            const result = await getSeasonStats(scoringPeriodId, weekWithLowerPointsForData);
            expect(result[0].lowestWeeklyScore).toEqual(75);
            done();
        });
    });

    describe('combine adjusted victories', () => {
        const weekWithAdjustedVictoriesData = [{
            teamId: 1,
            adjustedVictories: 5,
        }];

        it('should add together adjusted victories', async done => {
            const result = await getSeasonStats(scoringPeriodId, weekWithAdjustedVictoriesData);
            expect(result[0].adjustedVictories).toEqual(10);
            done();
        });
    });

    describe('combine points for', () => {
        const weekWithPointsForData = [{
            teamId: 1,
            pointsFor: 100,
        }];

        it('should add together points for', async done => {
            const result = await getSeasonStats(scoringPeriodId, weekWithPointsForData);
            expect(result[0].pointsFor).toEqual(200);
            done();
        });

        it('should round the result to 2 decimal places', async done => {
            weekWithPointsForData[0].pointsFor = 100.2500000000001;
            const result = await getSeasonStats(scoringPeriodId, weekWithPointsForData);
            expect(result[0].pointsFor).toEqual(200.25);
            done();
        });
    });

    describe('combine best possible score', () => {
        const weekWithBestPossibleScoreData = [{
            teamId: 1,
            bestPossibleScore: 150,
        }];

        it('should add together points for', async done => {
            const result = await getSeasonStats(scoringPeriodId, weekWithBestPossibleScoreData);
            expect(result[0].bestPossibleScore).toEqual(300);
            done();
        });

        it('should round the result to 2 decimal places', async done => {
            weekWithBestPossibleScoreData[0].bestPossibleScore = 150.2500000000001;
            const result = await getSeasonStats(scoringPeriodId, weekWithBestPossibleScoreData);
            expect(result[0].bestPossibleScore).toEqual(300.25);
            done();
        });
    });

    describe('initialization', () => {
        it('should set season data to week data if scoringPeriodId is 1', async done => {
            const week1Data = [{
                teamId: 1,
                bestPossibleScore: 150,
                pointsFor: 100,
                didWin: true,
                adjustedVictories: 7,
            }];
            const result = await getSeasonStats(1, week1Data);
            expect(result[0]).toEqual(expect.objectContaining({
                teamId: 1,
                bestPossibleScore: 150,
                highestWeeklyScore: 100,
                lowestWeeklyScore: 100,
                pointsFor: 100,
                record: {
                    wins: 1,
                    losses: 0,
                },
                week: 1,
            }));
            done();
        });
    })
});