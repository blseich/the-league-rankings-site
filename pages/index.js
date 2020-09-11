import { connectToDatabase } from '../util/mongodb'

export default function Home({ teams }) {
  return (
    <div className="container">
      {teams.map(team => (
        <div className="team" id={team.id}>
          <h3>{team.location}</h3>
          <h3>{team.nickname}</h3>
          <img src={team.logo} />
        </div>
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
