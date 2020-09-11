import fetch from 'node-fetch';
import { fetchEspnData } from './fetch-espn-data';
import { connectToDatabase } from '../../util/mongodb';

const ESPN_TEAMS_URL="https://fantasy.espn.com/apis/v3/games/ffl/seasons/2020/segments/0/leagues/1092538?view=modular&view=mTeam";

const populateDb = async () => {
    const espnData = await fetchEspnData();
    const { db } = await connectToDatabase();
    await db.collection('teams').insertMany(espnData.teams);
}

export default populateDb;
