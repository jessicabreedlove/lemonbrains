const statistics = require('./statistics');

describe("updateStat function", () => {
    //Test the updateStat function
    //I need to test the update.
    test('updateStat function', async () => {
        const update = {
            authid: 'test',
            op: 'test',
            count: 'test',
            correct: 'test'
        };
        expect(statistics.updateStat).toBeDefined();
        expect(statistics.updateStat).toBeInstanceOf(Function);
    });

    //I need to add a function for the updateStat collection results.
});
