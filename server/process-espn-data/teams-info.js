const getTeamInfo = (
    week, 
    { 
        location,
        logo,
        nickname,
        id: teamId
    }
) => ({
    location,
    logo,
    nickname,
    teamId,
    week
});

export const getTeamsInfo = (week, { teams }) => (
    teams.map(t => getTeamInfo(week, t))
);