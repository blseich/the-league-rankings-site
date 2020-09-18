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

  return (
    <div className="container" css={css`display: flex;`}>
      <div css={css`
        width: ${selectedTeam ? '0%' : '100%'};
        @media (min-width: 1028px) {
          width: ${selectedTeam ? '33.3%' : '100%'};
        }
        transition-duration: .3s;
        transition-property: width;
        transition-timing-function: ease-in-out;
        display: inline-block;
        background: #f3f3f3;
        z-index: 1;
      `}>
        {
          !selectedTeam ? (
            <Leaders>
              {[first,second,third].map(team => (
                <TeamCard team={team} selectedTeam={selectedTeam ? selectedTeam.id : undefined} callback={toggleSelectedTeam}/>
              ))}
            </Leaders>
          ) : ''
        }
        <Rest>
          {(selectedTeam ? [first,second,third, ...rest] : rest).map(team => (
            <TeamCard team={team} selectedTeam={selectedTeam ? selectedTeam.id : undefined} callback={toggleSelectedTeam}/>
          ))}
        </Rest>
      </div>
      <div
        css={css`
          width: ${selectedTeam ? '100%' : '0%'};
          @media (min-width: 1028px) {
            width: ${selectedTeam ? '66.6%' : '0%'};
          }
          transition-duration: .3s;
          transition-property: width;
          transition-timing-function: ease-in-out;
          display: inline-block;
          background: white;
          box-shadow: inset 0.15rem 0.15rem 0.2rem 0.2rem #efefef;
          border-radius: .5rem;
          position: sticky;
          top: 5vh;
          height: 90vh;
        `}
      ></div>
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
