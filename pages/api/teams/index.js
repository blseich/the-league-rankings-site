import populateDb from '../../../server/populate-db';
import { connectToDatabase } from "../../../util/mongodb";

export default async (req, res) => {
  const { db } = await connectToDatabase();

  const teams = await db
    .collection("teams")
    .find({})
    .toArray();

  res.json(teams);
};