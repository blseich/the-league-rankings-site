import fetch from 'node-fetch';
import { fetchEspnData } from '../fetch-espn-data';

jest.mock('node-fetch');

const EXPECTED_JSON_RESPONSE = 'json response data';
const scoringPeriodId = 1;

describe('Fetch Espn Data', () => {
    beforeEach(() => {
        fetch.mockReturnValue(Promise.resolve({
            ok: true,
            json: () => Promise.resolve(EXPECTED_JSON_RESPONSE),
        }));
        process.env.ESPN_SWID="espn-swid-cookie-value";
        process.env.ESPN_ESPN_S2="espn-espn-s2-cookie-value";
    });

    it("should call fetch with espn url and proper header values", async (done) => {
        await fetchEspnData(scoringPeriodId);
        expect(fetch).toHaveBeenCalledWith(`https://fantasy.espn.com/apis/v3/games/ffl/seasons/2020/segments/0/leagues/1092538?view=modular&view=mTeam&view=mBoxscore&view=mMatchupScore&view=mSettings&scoringPeriodId=${scoringPeriodId}`, {
            headers: {
                cookie: `SWID=${process.env.ESPN_SWID}; espn_s2=${process.env.ESPN_ESPN_S2};`
            }
        });
        done();
    });

    it("should throw an error if response code from fetch is not 200", async (done) => {
        const RECEIVED_ERR_MESSAGE = "some error message";
        fetch.mockReturnValue(Promise.resolve({
            ok: false,
            json: () => ({
                messages: [RECEIVED_ERR_MESSAGE]
            })
        }));
        expect(fetchEspnData()).rejects.toEqual(new Error(`Error retrieving ESPN data: ${RECEIVED_ERR_MESSAGE}`));
        done();
    });

    it("should return json response body from espn call", async (done) => {
        expect(await fetchEspnData()).toEqual(EXPECTED_JSON_RESPONSE);
        done();
    });


    afterEach(() => {
        fetch.mockClear();
    });
});