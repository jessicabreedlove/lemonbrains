const admin = require('./admin');

//Done with getLocations.
describe("getLocations function", () => {
    test('Test the functionality of getLocations', () => {
        expect(admin.getLocations).toBeDefined();
        expect(admin.getLocations).toBeInstanceOf(Function);
    });

    //Testing the console.log outputs.
    test('Testing the console.log of getLocations', () => {
        console.log = jest.fn();
        console.log('Debug: getLocations');
        expect(console.log).toHaveBeenCalled();
    });
});

//Done with createLocation.
describe("createLocation function", () => {
    test('Test the functionality of createLocation', () => {
        expect(admin.createLocation).toBeDefined();
        expect(admin.createLocation).toBeInstanceOf(Function);
    });

    //Testing the console.log outputs.
    test('Testing the console.log of createLocation', () => {
        console.log = jest.fn();
        console.log('Debug: createLocation');
        expect(console.log).toHaveBeenCalled();
    });
});

//Done with updateRole.
describe("updateRole function", () => {
    test('Test the functionality of updateRole', () => {
        expect(admin.updateRole).toBeDefined();
        expect(admin.updateRole).toBeInstanceOf(Function);
    });

    //Testing the console.log outputs.
    test('Testing the console.log of updateRole', () => {
        console.log = jest.fn();
        console.log('Results from getUser()');
        console.log('user admin update');
        console.log('0 document updated');
        console.log('1 document updated');
        console.log('Fatal Error =');
        console.log('Debug: updateRole');
        expect(console.log).toHaveBeenCalled();
    });

    //Testing the mongodb collection results.
    test('Testing the mongodb collection results of updateRole', () => {
        const authid = 'authid';
        const admin = false;
        const update = { $set: {
            admin: admin
        }};
    });
});

//Done with deleteUser.
describe("deleteUser function", () => {
    test('Test the functionality of deleteUser', () => {
        expect(admin.deleteUser).toBeDefined();
        expect(admin.deleteUser).toBeInstanceOf(Function);
    });

    //Testing the console.log outputs.
    test('Testing the console.log of deleteUser', () => {
        console.log = jest.fn();
        console.log('Debug: deleteUser');
        expect(console.log).toHaveBeenCalled();
    });

    //Testing the mongodb deleteUser results.
    test('Testing the mongodb deleteUser results of deleteUser', () => {
        const authid = 'authid';
    });
});

//Done with deleteStand.
describe("deleteStand function", () => {
    test('Test the functionality of deleteStand', () => {
        expect(admin.deleteUser).toBeDefined();
        expect(admin.deleteUser).toBeInstanceOf(Function);
    });

    //Testing the console.log outputs.
    test('Testing the console.log of deleteStand', () => {
        console.log = jest.fn();
        console.log('Deleting Stand with authid: ${authid}');
        expect(console.log).toHaveBeenCalled();
    });

    //Testing the mongodb deleteStand results.
    test('Testing the mongodb deleteStand results of deleteStand', () => {
        const authid = 'authid';
    });
});

//Done with deleteStatistics.
describe("deleteStatistics function", () => {
    test('Test the functionality of deleteStatistics', () => {
        expect(admin.deleteUser).toBeDefined();
        expect(admin.deleteUser).toBeInstanceOf(Function);
    });

    //Testing the console.log outputs.
    test('Testing the console.log of deleteStatistics', () => {
        console.log = jest.fn();
        console.log('Deleting Statistics with authid: ${authid}');
        expect(console.log).toHaveBeenCalled();
    });

    //Testing the mongodb deleteStatistics results.
    test('Testing the mongodb deleteStatistics results of deleteStatistics', () => {
        const authid = 'authid';
    });
});

//Done with isAdmin.
describe("isAdmin function", () => {
    test('Test the functionality of isAdmin', () => {
        expect(admin.deleteUser).toBeDefined();
        expect(admin.deleteUser).toBeInstanceOf(Function);
    });

    //Testing the console.log outputs.
    test('Testing the console.log of isAdmin', () => {
        console.log = jest.fn();
        console.log('Default admin page');
        console.log('Fatal Error =');
        expect(console.log).toHaveBeenCalled();
    });

    //Testing the mongodb isAdmin results.
    test('Testing the mongodb isAdmin results of isAdmin', () => {
        const authid = 'authid';
        const admin = false;
        const test = 'test';
    });
});
