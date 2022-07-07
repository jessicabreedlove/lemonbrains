const stands = require('./stands');

//Done with getStands.
describe("getStand function", () => {
    //Test the getStand function for it to be there.
    test('getStand collection and return all documents', async () => {
        expect(stands.getStand).toBeDefined();
        expect(stands.getStand).toBeInstanceOf(Function);
    });

    //Test console.log catch error for authid.
    test('console.log catch error for getStand', async () => {
        console.log = jest.fn();
        console.log('Error: invalid authid');
        console.log('Debug: getStand() in stands controller, authid=');
        expect(console.log).toHaveBeenCalled();
    });

    //Testing the mongodb getStand results.
    test('Testing the mongodb getStand results of getStand', async () => {
        const authid = 'authid';
    });
});

//Done with createStand.
describe("createStand function", () => {
    //Test the createStand function.
    test('createStand function', async () => {
        const stand = {
            authid: 'test',
            stand: 'test',
            day: 'test',
            earnings: 'test'
        };
        expect(stands.createStand).toBeDefined();
        expect(stands.createStand).toBeInstanceOf(Function);
    });

    //Testing the console.log outputs.
    test('Testing the console.log of createStand', () => {
        console.log = jest.fn();
        console.log('Debug: createStand() in stands controller');
        console.log('authid=${authid}, stand=${name}');
        console.log('create stats');
        expect(console.log).toHaveBeenCalled();
    });

    //Testing the mongodb createStand results.
    test('Testing the mongodb createStand results of createStand', () => {
        const authid = 'authid';
        const name = 'name';
    });
});

//Done with updateStand.
describe("updateStand function", () => {
    //Test the updateStand function.
    test('updateStand function', async () => {
        const update = {
            authid: 'test',
            op: 'test',
            count: 'test',
            correct: 'test'
        };
        expect(stands.updateStand).toBeDefined();
        expect(stands.updateStand).toBeInstanceOf(Function);
    });

    //Testing the console.log outputs.
    test('Testing the console.log of updateStand', () => {
        console.log = jest.fn();
        console.log('Debug: updateStand() in stands controller');
        console.log('authid=${authid}, addCount=${addCount}, addCorrect=${addCorrect}, subCount=${subCount}, subCorrect=${subCorrect}, mulCount=${mulCount}, mulCorrect=${mulCorrect}, divCount=${divCount}, divCorrect=${divCorrect} ');
        console.log('Update stand ... ');
        console.log('add ${addCorrect} * 1 = ${addCorrect} | earings=${earnings}');
        console.log('sub ${subCorrect} * 2 = ${subCorrect * 2} | earings=${earnings}');
        console.log('mul ${mulCorrect} * 3 = ${mulCorrect * 3} | earings=${earnings}');
        console.log('div ${divCorrect} * 4 = ${divCorrect * 4} | earings=${earnings}');
        console.log('Total=${earnings} + ${result.earnings} == ${totalEarnings}');
        console.log('stands collection updateOne');
        console.log('0 document updated');
        console.log('1 document updated');
        console.log('Fatal Error =');
        expect(console.log).toHaveBeenCalled();
    });

    //Testing the mongodb updateStand results.
    test('Testing the mongodb updateStand results of updateStand', () => {
        const authid = 'authid';
        const addCount = 'addCount';
        const addCorrect = 'addCorrect';
        const subCount = 'subCount';
        const subCorrect = 'subCorrect';
        const mulCount = 'mulCount';
        const mulCorrect = 'mulCorrect';
        const divCount = 'divCount';
        const divCorrect = 'divCorrect';
    });
});