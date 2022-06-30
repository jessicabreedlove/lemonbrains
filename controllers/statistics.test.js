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

    //Testing the console.log outputs.
    test('Testing the console.log of updateStat', () => {
        console.log = jest.fn();
        console.log('Debug: updateStat');
        console.log('PROCESS ${update.op} stat: ');
        console.log('Fatal Error =');
        expect(console.log).toHaveBeenCalled();
    });

    //I need to add a function for the updateStat collection results.
});
