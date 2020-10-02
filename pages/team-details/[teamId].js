import absoluteUrl from 'next-absolute-url';

export default function TeamDetails({ team }) {
    return (
        <div>
            <h1>{team.location}</h1>
            <h2>{team.nickname}</h2>
            <img src={team.logo} />
        </div>
    )
}

export async function getServerSideProps({ req, query }) {
    const { protocol, host } = absoluteUrl(req, 'localhost:3000');

    const { teamId } = query;
    const teamReq = await fetch(`${protocol}//${host}/api/team/${teamId}`);
    const team = await teamReq.json();
    return {
      props: { team },
    };
  }
  