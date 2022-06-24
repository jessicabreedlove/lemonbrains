const users = require('./users');

//Test the getUser function for it to be there.
test('getUser function', async () => {
    expect(users.getUser).toBeDefined();
    expect(users.getUser).toBeInstanceOf(Function);
});

//I need to add a test for the getUser results.

//Test createUser function for it to be there.
test('createUser function', async () => {
    expect(users.createUser).toBeDefined();
    expect(users.createUser).toBeInstanceOf(Function);
});

//I need to add a test for the createUser "user" object.
//I need to add a test for the createUser adding to the collection.

//Test updateUser function for it to be there.
test('updateUser function', async () => {
    expect(users.updateUser).toBeDefined();
    expect(users.updateUser).toBeInstanceOf(Function);
});

//I need to add a test for the updateUser results and redirect.
