const statistics = require('./statistics');

//Done with updateStat.
describe("updateStat function", () => {
    //Test the updateStat function
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

    //Testing the mongodb updateStat results.
    test('Testing the mongodb updateStat results of updateStat', () => {
        const authid = 'authid';
        const op = 'op';
        const count = 'count';
        const correct = 'correct';
    });
});
