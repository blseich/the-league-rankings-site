import { getTeamsInfo } from '../teams-info';

const espnData = {
    teams: [{
        location: "location",
        logo: "http://logo.url.com/123abc",
        nickname: "nickname",
        id: 1,
        extra: "stuff",
        exclude: "this",
    }]
};

const scoringPeriodId = 1;

describe('Get Team Info', () => {
    it('should return necessary info from espnData', () => {
        expect(getTeamsInfo(scoringPeriodId, espnData)[0]).toEqual(expect.objectContaining({
            location: espnData.teams[0].location,
            logo: espnData.teams[0].logo,
            nickname: espnData.teams[0].nickname,
            teamId: espnData.teams[0].id,
        }));
    });

    it('should not include unnecessary information', () => {
        expect(getTeamsInfo(scoringPeriodId, espnData)[0]).toEqual(expect.not.objectContaining({
            extra: espnData.teams[0].extra,
            exclude: espnData.teams[0].exclude,
        }));
    });

    it('should set the week to the scoringPeriodId', () => {
        expect(getTeamsInfo(scoringPeriodId, espnData)[0]).toEqual(expect.objectContaining({
            week: scoringPeriodId,
        }));
    });
});