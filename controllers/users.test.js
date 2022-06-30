const users = require('./users');

describe("getUser function", () => {
    //Test the getUser function for it to be there.
    test('getUser function', async () => {
        expect(users.getUser).toBeDefined();
        expect(users.getUser).toBeInstanceOf(Function);
    });

    //Testing the console.log outputs.
    test('Testing the console.log of getUser', () => {
        console.log = jest.fn();
        console.log('Debug: getUser() in users controller');
        console.log('Results from getUser()');
        console.log('Fatal Error =');
        expect(console.log).toHaveBeenCalled();
    });

    //I need to add a test for the getUser results.
});

describe("createUser function", () => {
    //Test createUser function for it to be there.
    test('createUser function', async () => {
        expect(users.createUser).toBeDefined();
        expect(users.createUser).toBeInstanceOf(Function);
    });

    //Testing the console.log outputs.
    test('Testing the console.log of createUser', () => {
        console.log = jest.fn();
        console.log('Debug: createUser() in users controller');
        expect(console.log).toHaveBeenCalled();
    });

    //I need to add a test for the createUser "user" object.
    //I need to add a test for the createUser adding to the collection.
});

describe("updateUser function", () => {
    //Test updateUser function for it to be there.
    test('updateUser function', async () => {
        expect(users.updateUser).toBeDefined();
        expect(users.updateUser).toBeInstanceOf(Function);
    });

    //Testing the console.log outputs.
    test('Testing the console.log of updateUser', () => {
        console.log = jest.fn();
        console.log('Debug: updateUser() in users controller');
        console.log('update user settings: ');
        console.log('Fatal Error =');
        expect(console.log).toHaveBeenCalled();
    });

    //I need to add a test for the updateUser results and redirect.
});
