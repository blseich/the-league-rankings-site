import fetch from '@vercel/fetch';

const ESPN_TEAMS_URL="https://fantasy.espn.com/apis/v3/games/ffl/seasons/2022/segments/0/leagues/1092538?view=modular&view=mTeam&view=mBoxscore&view=mMatchupScore&view=mSettings";

export async function fetchEspnData(scoringPeriodId) {
    const res = await fetch(`${ESPN_TEAMS_URL}&scoringPeriodId=${scoringPeriodId}`, {
        headers: {
            cookie: `SWID=${process.env.ESPN_SWID}; espn_s2=${process.env.ESPN_ESPN_S2};`,
        },
    });

    if (!res.ok) {
        const errorResponse = await res.json();
        throw Error(`Error retrieving ESPN data: ${errorResponse.messages[0]}`);
    }

    return await res.json();
};
