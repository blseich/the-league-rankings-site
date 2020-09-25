import { getTeamInfo } from '../team-info';

const espnData = {
    location: "location",
    logo: "http://logo.url.com/123abc",
    nickname: "nickname",
    id: 1,
    extra: "stuff",
    exclude: "this",
}

const scoringPeriodId = 1;

describe('Get Team Info', () => {
    it('should return necessary info from espnData', () => {
        expect(getTeamInfo(scoringPeriodId, espnData)).toEqual(expect.objectContaining({
            location: espnData.location,
            logo: espnData.logo,
            nickname: espnData.nickname,
            teamId: espnData.id,
        }));
    });

    it('should not include unnecessary information', () => {
        expect(getTeamInfo(scoringPeriodId, espnData)).toEqual(expect.not.objectContaining({
            extra: espnData.extra,
            exclude: espnData.exclude,
        }));
    });

    it('should set the week to the scoringPeriodId', () => {
        expect(getTeamInfo(scoringPeriodId, espnData)).toEqual(expect.objectContaining({
            week: scoringPeriodId,
        }));
    });
});