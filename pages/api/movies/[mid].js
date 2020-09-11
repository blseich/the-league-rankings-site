import { ObjectID } from "mongodb";
import { connectToDatabase } from "../../../util/mongodb";

export default async (req, res) => {
  const { db } = await connectToDatabase();
  const { mid } = req.query;

  const movie = await db
    .collection("movies")
    .find({"_id": ObjectID(mid)})
    .toArray();

  res.json(movie[0]);
};