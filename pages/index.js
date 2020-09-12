import { Combined, Leaders, Rest } from '../shared/styles';
import { connectToDatabase } from '../util/mongodb';
import LeaderCard from '../client/components/leader-card';
import RegularCard from '../client/components/regular-card';

export default function Home({ teams }) {
  const [
    first,
    second,
    third,
    ...rest
  ] = teams;

  return (
    <div className="container">
      <Leaders>
        <LeaderCard team={first} place={"first"} />
        <LeaderCard team={second} place={"second"} />
        <LeaderCard team={third} place={"third"} />
      </Leaders>
      <Rest>
        {rest.map((team, i) => (
          <RegularCard team={team} place={i+4} />
        ))}
      </Rest>
    </div>
  )
}

export async function getServerSideProps(context) {
  const { db } = await connectToDatabase();

  const teams = await db.collection("teams")
    .find({})
    .toArray();

  return {
    props: { teams: JSON.parse(JSON.stringify(teams)) },
  }
}
