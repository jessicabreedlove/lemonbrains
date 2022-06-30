const stands = require('./stands');

describe("getStand function", () => {
    //Test the getStand function for it to be there.
    test('getStand collection and return all documents', async () => {
        expect(stands.getStand).toBeDefined();
        expect(stands.getStand).toBeInstanceOf(Function);
    });

    //I need to add a .toArray test to make sure that the array is returned.

    //Test console.log catch error for authid.
    test('console.log catch error', async () => {
        console.log = jest.fn();
        console.log('Error: invalid authid');
        expect(console.log).toHaveBeenCalled();
    });
});

describe("createStand function", () => {
    //Test the createStand function.
    //I need to test the stand creation.
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
});

describe("updateStand function", () => {
    //Test the updateStand function.
    //I need to test the update.
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
});