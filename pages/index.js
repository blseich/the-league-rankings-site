/** @jsx jsx */
import { useState } from 'react';
import { jsx, css } from '@emotion/core'
import { Leaders, Rest } from '../shared/styles';
import { connectToDatabase } from '../util/mongodb';
import TeamCard from '../client/components/team-card';

export default function Home({ teams }) {
  const [
    first,
    second,
    third,
    ...rest
  ] = teams.map((team, i) => Object.assign(team, { ranking: i+1 }));

  const [selectedTeam, setSelectedTeam] = useState();
  const toggleSelectedTeam = team => {
    setSelectedTeam(prevTeam => {
      prevTeam === team ? setSelectedTeam(undefined) : setSelectedTeam(team)
    });
  };

  const highlightedTeams = selectedTeam ? [] : [first, second, third];
  const regularTeams = selectedTeam ? [first, second, third, ...rest] : rest;

  return (
    <div className="container">
      <div css={css`
        max-width: ${selectedTeam ? '30%' : '100%'};
        transition-duration: .3s;
        transition-property: max-width;
        transition-timing-function: ease-in-out;
      `}>
        <Leaders>
          {highlightedTeams.map(team => (
            <TeamCard team={team} selectedTeam={selectedTeam ? selectedTeam.id : undefined} callback={toggleSelectedTeam}/>
          ))}
        </Leaders>
        <Rest>
          {regularTeams.map(team => (
            <TeamCard team={team} selectedTeam={selectedTeam ? selectedTeam.id : undefined} callback={toggleSelectedTeam}/>
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
