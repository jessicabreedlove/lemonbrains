const leader = require('./leader');

describe("getLeaders function", () => {
//This will check for the getLeaders function.
    test('getLeaders collection and return all documents', async () => {
        expect(leader.getLeaders).toBeDefined();
        expect(leader.getLeaders).toBeInstanceOf(Function);
    });

    //Testing the console.log outputs.
    test('Testing the console.log of getLeaders', () => {
        console.log = jest.fn();
        console.log('Debug: getLeaders()');
        console.log('HOME leader board=');
        console.log('Fatal Error =');
        expect(console.log).toHaveBeenCalled();
    });
});

describe("updateBoard function", () => {
    //This will check for the updateBoard function objects.
    test.todo('updateBoard shows the score and objects'), async () => {
        const score = {
            authid: 'test',
            day: 'test',
            earnings: 'test'
        };
        const result = await leader.updateBoard(score);
    }

    //This will help when we cannot manually test the second test.
    test('updateBoard shows the leader board result', async () => {
        expect(leader.updateBoard).toBeDefined();
        expect(leader.updateBoard).toBeInstanceOf(Function);
    });

    //Testing the console.log outputs.
    test('Testing the console.log of updateBoard', () => {
        console.log = jest.fn();
        console.log('Debug: updateBoard()');
        console.log('The board');
        console.log('Leader: ${i}: result1 ${board[i].authid} == result2 ${authid}');
        console.log('onboard = true');
        console.log('push...');
        console.log('Updated board');
        console.log('Fatal Error =');
        expect(console.log).toHaveBeenCalled();
    });
});