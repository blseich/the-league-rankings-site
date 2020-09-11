import { connectToDatabase } from "../../../util/mongodb";

export default async (req, res) => {
  const { db } = await connectToDatabase();
  const { teamId } = req.query;

  const team = await db
    .collection("teams")
    .find({"id": parseInt(teamId)})
    .toArray();

  res.json(team[0]);
};
