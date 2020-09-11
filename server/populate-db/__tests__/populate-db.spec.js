import fetch from 'node-fetch';
import populateDb from '../';

jest.mock('node-fetch');
fetch.mockReturnValue(Promise.resolve({}));

describe('Populate Database', () => {
    beforeAll(() => {
        process.env.ESPN_SWID="espn-swid-cookie-value";
        process.env.ESPN_ESPN_S2="espn-espn-s2-cookie-value";
    });

    it("should call fetch with espn url and proper header values", async (done) => {
        await populateDb();
        expect(fetch).toHaveBeenCalledWith("https://fantasy.espn.com/apis/v3/games/ffl/seasons/2020/segments/0/leagues/1092538?view=modular&view=mTeam", {
            headers: {
                cookies: `SWID=${process.env.ESPN_SWID}; espn_s2=${process.env.ESPN_ESPN_S2};`
            }
        });
        done();
    });

    afterEach(() => {
        fetch.mockClear();
    });
});