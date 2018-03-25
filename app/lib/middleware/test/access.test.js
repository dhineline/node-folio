const {access} = require('./../access');

describe('Test Role Based Access Business Logic', () => {
  test('admins should be do anything with items except change the ids of existing items', () => {
    let permission1 = access.can('admin').createOwn('item');
    expect(permission1.granted).toBe(true);

    let permission2 = access.can('admin').createAny('item');
    expect(permission2.granted).toBe(true);

    let permission3 = access.can('admin').readOwn('item');
    expect(permission3.granted).toBe(true);

    let permission4 = access.can('admin').readAny('item');
    expect(permission4.granted).toBe(true);

    let permission5 = access.can('admin').updateOwn('item');
    expect(permission5.granted).toBe(true);
    expect(permission5.attributes).toEqual(expect.arrayContaining(['!item.id']));

    let permission6 = access.can('admin').updateAny('item');
    expect(permission6.granted).toBe(true);
    expect(permission6.attributes).toEqual(expect.arrayContaining(['!item.id']));

    let permission7 = access.can('admin').deleteOwn('item');
    expect(permission7.granted).toBe(true);

    let permission8 = access.can('admin').deleteAny('item');
    expect(permission8.granted).toBe(true);

  })

  test('admins should be able to edit anything about a user except the id and token', () => {
    let permission1 = access.can('admin').createOwn('user');
    expect(permission1.granted).toBe(true);

    let permission2 = access.can('admin').createAny('user');
    expect(permission2.granted).toBe(true);

    let permission3 = access.can('admin').readOwn('user');
    expect(permission3.granted).toBe(true);

    let permission4 = access.can('admin').readAny('user');
    expect(permission4.granted).toBe(true);

    let permission5 = access.can('admin').updateOwn('user');
    expect(permission5.granted).toBe(true);
    expect(permission5.attributes).toEqual(expect.arrayContaining(['!user.id']));
    expect(permission5.attributes).toEqual(expect.arrayContaining(['!user.token']))

    let permission6 = access.can('admin').updateAny('user');
    expect(permission6.granted).toBe(true);

    let permission7 = access.can('admin').deleteOwn('user');
    expect(permission7.granted).toBe(true);

    let permission8 = access.can('admin').deleteAny('user');
    expect(permission8.granted).toBe(true);

  })

  test('users should be able to read any item but create or modify only thier own, but not the id', () => {
    let permission1 = access.can('user').createOwn('item');
    expect(permission1.granted).toBe(true);

    let permission2 = access.can('user').createAny('item');
    expect(permission2.granted).toBe(false);

    let permission3 = access.can('user').readOwn('item');
    expect(permission3.granted).toBe(true);

    let permission4 = access.can('user').readAny('item');
    expect(permission4.granted).toBe(true);

    let permission5 = access.can('user').updateOwn('item');
    expect(permission5.granted).toBe(true);
    expect(permission5.attributes).toEqual(expect.arrayContaining(['!item.id']));

    let permission6 = access.can('user').updateAny('item');
    expect(permission6.granted).toBe(false);

    let permission7 = access.can('user').deleteOwn('item');
    expect(permission7.granted).toBe(true);

    let permission8 = access.can('user').deleteAny('item');
    expect(permission8.granted).toBe(false);

  })

});
