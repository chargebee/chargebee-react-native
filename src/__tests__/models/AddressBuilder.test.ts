import { Address } from '../../interfaces/cb-types';
import { AddressBuilder } from '../../models/AddressBuilder';

describe('Address Builder', () => {
  let address: Address;
  beforeEach(() => {
    address = {
      firstName: 'John',
      lastName: 'Connor',
      email: 'hero@terminator.com',
      company: 'Terminator',
      phone: '9090909090',
      line1: 'no.23,main street',
      line2: 'Near statue',
      line3: 'landmark here',
      city: 'Chennai',
      stateCode: 'CA',
      zip: '91789',
      country: 'US',
    };
  });

  test('should convert address details with spaces to proper url format', () => {
    const urlParams = new AddressBuilder(address, 'shipping_address').toUrl();

    expect(urlParams).toBe(
      'shipping_address[first_name]=John&shipping_address[last_name]=Connor&' +
        'shipping_address[email]=hero@terminator.com&shipping_address[company]=Terminator&' +
        'shipping_address[phone]=9090909090&shipping_address[line1]=no.23,main%20street&' +
        'shipping_address[line2]=Near%20statue&shipping_address[line3]=landmark%20here&' +
        'shipping_address[city]=Chennai&shipping_address[state_code]=CA&shipping_address[zip]=91789' +
        '&shipping_address[country]=US'
    );
  });
});
