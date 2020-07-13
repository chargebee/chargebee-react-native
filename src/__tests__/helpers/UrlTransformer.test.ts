import { UrlTransformer } from '../../helpers/UrlTransformer';

describe('URL Transformer', () => {
  test('should url encode a given plain object', () => {
    const value = {
      name: 'given name',
      place: 'another place',
      email: 'some@email.com',
    };

    const encodedPlainObject = UrlTransformer.encodePlainObject(
      'custom',
      value
    );

    expect(encodedPlainObject).toBe(
      'custom[name]=given%20name&custom[place]=another%20place&custom[email]=some@email.com'
    );
  });

  test('should url encode a given plain array', () => {
    const plainArray = ['coupon_id1', 'coupon_id2'];

    const encodedPlainArray = UrlTransformer.encodePlainArray(
      'coupon',
      plainArray
    );

    expect(encodedPlainArray).toBe('coupon[0]=coupon_id1&coupon[1]=coupon_id2');
  });

  test('should url encode a given array object', () => {
    const objectArray = [
      { name: 'John', email: 'first@email.com' },
      { name: 'Connor', email: 'second@email.com' },
    ];

    const encodedArrayOfObjects = UrlTransformer.encodeArrayOfObjects(
      'users',
      objectArray
    );

    expect(encodedArrayOfObjects).toBe(
      'users[name][0]=John&users[email][0]=first@email.com&users[name][1]=Connor&' +
        'users[email][1]=second@email.com'
    );
  });
});
