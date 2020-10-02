/** @jsx jsx */
import { useState } from 'react';
import { jsx, css } from '@emotion/core';
import fetch from 'node-fetch';
import absoluteUrl from 'next-absolute-url';
import { Leaders, Rest } from '../shared/styles';
import TeamCard from '../client/components/team-card';

export default function Home({ teams }) {
  const [
    first,
    second,
    third,
    ...rest
  ] = teams.sort((t1, t2) => t1.powerRanking - t2.powerRanking);

  return (
    <div className="container">
          <Leaders>
            {[first,second,third].map(team => (
              <TeamCard key={team.teamId} team={team} />
            ))}
          </Leaders>
        <Rest>
          {rest.map(team => (
            <TeamCard key={team.teamId} team={team} />
          ))}
        </Rest>
    </div>
  )
}

export async function getServerSideProps({ req }) {
  const { protocol, host } = absoluteUrl(req, 'localhost:3000') 
  const teamsReq = await fetch(`${protocol}//${host}/api/rankings`);
  const teams = await teamsReq.json();  
  return {
    props: { teams },
  };
}
