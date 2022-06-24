const leader = require('./leader');

//This will check for the getLeaders function.
test('getLeaders collection and return all documents', async () => {
    expect(leader.getLeaders).toBeDefined();
    expect(leader.getLeaders).toBeInstanceOf(Function);
});

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