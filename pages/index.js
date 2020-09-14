/** @jsx jsx */
import { useState } from 'react';
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

  const [selectedTeam, setSelectedTeam] = useState();

  return (
    <div className="container">
      <div css={css`
        max-width: ${selectedTeam !== undefined ? '30%' : '100%'};
        transition-duration: .3s;
        transition-property: max-width;
      `}>
        <Leaders>
          <TeamCard team={first} place={1} />
          <TeamCard team={second} place={2} />
          <TeamCard team={third} place={3} />
        </Leaders>
        <Rest>
          {rest.map((team, i) => (
            <TeamCard team={team} selectedTeam={selectedTeam ? selectedTeam.id : undefined} place={i+4} callback={team => {
              setSelectedTeam(prevTeam => {
                prevTeam === team ? setSelectedTeam(undefined) : setSelectedTeam(team)
              });
            }}/>
          ))}
        </Rest>
      </div>
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
