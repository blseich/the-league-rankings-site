import rankingsFormula from '../rankings-formula';
import getPowerRankings from '../';

const teams = [
    {
      teamId: 1,
    },
    {
        teamId: 2,
    },
    {
        teamId: 3,
    },
];

jest.mock('../rankings-formula');
rankingsFormula.mockImplementation(({ teamId }) => {
    switch(teamId) {
        case 1:
            return 100;
            break;
        case 2:
            return 150;
            break;
        case 3:
            return 125;
            break;
        default:
            return 0;
            break;
    }
});

describe('Get Power Rankigns', () => {
    it('apply a power rankings index based on the power rankings formula to every team', () => {
        const result = getPowerRankings(teams);
        expect(result).toEqual(expect.arrayContaining([
            expect.objectContaining({ teamId: 1, powerRankingIndex: 100 }),
            expect.objectContaining({ teamId: 2, powerRankingIndex: 150 }),
            expect.objectContaining({ teamId: 3, powerRankingIndex: 125 }),
        ]))
    });
    it('should rank each team based on their power ranking index from highest to lowest', () => {
        const result = getPowerRankings(teams);
        expect(result).toEqual(expect.arrayContaining([
            expect.objectContaining({ teamId: 1, powerRanking: 3 }),
            expect.objectContaining({ teamId: 2, powerRanking: 1 }),
            expect.objectContaining({ teamId: 3, powerRanking: 2 }),
        ]))
    });
});