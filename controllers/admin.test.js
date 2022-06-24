const admin = require('./admin');

test('Test the functionality of getLocations', () => {
    expect(admin.getLocations).toBeDefined();
    expect(admin.getLocations).toBeInstanceOf(Function);
});

test('Test the functionality of createLocation', () => {
    expect(admin.createLocation).toBeDefined();
    expect(admin.createLocation).toBeInstanceOf(Function);
});

test('Test the functionality of updateRole', () => {
    expect(admin.updateRole).toBeDefined();
    expect(admin.updateRole).toBeInstanceOf(Function);
});

test('Test the functionality of deleteUser', () => {
    expect(admin.deleteUser).toBeDefined();
    expect(admin.deleteUser).toBeInstanceOf(Function);
});