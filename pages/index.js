import { Fragment } from 'react';
import styled from '@emotion/styled'
import absoluteUrl from 'next-absolute-url';
import TeamCard from '../client/components/team-card';

const Leaders = styled('div')`
  @media (min-width: 1028px) {
    display: flex;
    justify-content: space-between;
    margin-bottom: 2rem;
    padding: 0 0;
    width: 100%;
  }
  padding: 0 5%;
  margin: auto;
  max-width: 1028px;
`

const Rest = styled('div')`
  width: 100%;
  padding: 0 5%;
  max-width: 1028px;
  margin: 0 auto;
  box-sizing: border-box;
`;

export default function Home({ teams }) {
  const [
    first,
    second,
    third,
    ...rest
  ] = teams.sort((t1, t2) => t1.powerRanking - t2.powerRanking);

  return (
    <Fragment>
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
    </Fragment>
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
