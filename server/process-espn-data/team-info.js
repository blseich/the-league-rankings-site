export const getTeamInfo = (
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