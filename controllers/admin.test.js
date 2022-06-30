const admin = require('./admin');

describe("getLocations function", () => {
    test('Test the functionality of getLocations', () => {
        expect(admin.getLocations).toBeDefined();
        expect(admin.getLocations).toBeInstanceOf(Function);
    });
})

describe("createLocation function", () => {
    test('Test the functionality of createLocation', () => {
        expect(admin.createLocation).toBeDefined();
        expect(admin.createLocation).toBeInstanceOf(Function);
    });
});

describe("updateRole function", () => {
    test('Test the functionality of updateRole', () => {
        expect(admin.updateRole).toBeDefined();
        expect(admin.updateRole).toBeInstanceOf(Function);
    });
});

describe("deleteUser function", () => {
    test('Test the functionality of deleteUser', () => {
        expect(admin.deleteUser).toBeDefined();
        expect(admin.deleteUser).toBeInstanceOf(Function);
    });
});