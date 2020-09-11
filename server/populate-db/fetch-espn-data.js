import fetch from 'node-fetch';

const ESPN_TEAMS_URL="https://fantasy.espn.com/apis/v3/games/ffl/seasons/2020/segments/0/leagues/1092538?view=modular&view=mTeam";

export async function fetchEspnData() {
    const res = await fetch(ESPN_TEAMS_URL, {
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
