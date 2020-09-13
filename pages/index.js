/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { Combined, Leaders, Rest } from '../shared/styles';
import { connectToDatabase } from '../util/mongodb';
import TeamCard from '../client/components/team-card';

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
        <TeamCard team={first} place={1} />
        <TeamCard team={second} place={2} />
        <TeamCard team={third} place={3} />
        {/* <LeaderCard team={first} place={"first"} />
        <LeaderCard team={second} place={"second"} />
        <LeaderCard team={third} place={"third"} /> */}
      </Leaders>
      <Rest>
        {rest.map((team, i) => (
          <TeamCard team={team} place={i+4} />
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
