import { css } from 'emotion';
import { Combined, Logo, FirstPlace, SecondPlace, ThirdPlace, Leaders, LeaderTitlePrimary, LeaderTitleSecondary } from '../shared/styles';
import { connectToDatabase } from '../util/mongodb';

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
        <FirstPlace>
          <LeaderTitlePrimary>{first.location}</LeaderTitlePrimary>
          <LeaderTitleSecondary>{first.nickname}</LeaderTitleSecondary>
          <Logo src={first.logo} />
          <div className={css`
            font-family: 'Roboto', serif;
            font-weight: bolder;
            background: gold;
            width: 20%;
            text-align: center;
            padding: .1rem;
            box-sizing: border-box;
            border-radius: 1rem;
            color: white;
            margin-top: .25rem;
          `}>1st</div>
        </FirstPlace>
        <SecondPlace>
          <LeaderTitlePrimary>{second.location}</LeaderTitlePrimary>
          <LeaderTitleSecondary>{second.nickname}</LeaderTitleSecondary>
          <Logo src={second.logo} />
          <div className={css`
            font-family: 'Roboto', serif;
            font-weight: bolder;
            background: silver;
            width: 20%;
            text-align: center;
            padding: .1rem;
            box-sizing: border-box;
            border-radius: 1rem;
            color: white;
            margin-top: .25rem;
          `}>2nd</div>
        </SecondPlace>
        <ThirdPlace>
          <LeaderTitlePrimary>{third.location}</LeaderTitlePrimary>
          <LeaderTitleSecondary>{third.nickname}</LeaderTitleSecondary>
          <Logo src={third.logo} />
          <div className={css`
            font-family: 'Roboto', serif;
            font-weight: bolder;
            background: #cd7f32;
            width: 20%;
            text-align: center;
            padding: .1rem;
            box-sizing: border-box;
            border-radius: 1rem;
            color: white;
            margin-top: .25rem;
          `}>3rd</div>
        </ThirdPlace>
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
