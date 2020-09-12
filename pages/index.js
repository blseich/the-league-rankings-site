import { Combined, Logo, Leaders } from '../shared/styles';
import { connectToDatabase } from '../util/mongodb';
import LeaderCard from '../client/components/leader-card';

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
      {rest.map(team => (
        <Combined className="team" id={team.id}>
          <h3>{team.location}</h3>
          <h3>{team.nickname}</h3>
          <Logo src={team.logo} />
        </Combined>
      ))}
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
