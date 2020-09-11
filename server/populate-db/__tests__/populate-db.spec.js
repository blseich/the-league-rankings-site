const { interopDefault } = require("next/dist/next-server/server/load-components");

import populateDb from '../';

describe('Populate Database', () => {
    it("should be a function", () => {
        expect(typeof populateDb).toBe("function");
    });
});