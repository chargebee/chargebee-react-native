import { Customer, CustomField } from '../../interfaces/cb-types';
import { CustomerBuilder } from '../../models/CustomerBuilder';

describe('Customer Builder', () => {
  let customer: Customer;
  beforeEach(() => {
    customer = {
      firstName: 'John',
      lastName: 'Connor',
      id: 'C123',
      email: 'john@connor.com',
      company: 'Terminator',
      locale: 'en',
      phone: '9090909009',
      vatNumber: 'VAT123',
    };
  });

  test('should convert customer details to url format', () => {
    const result = new CustomerBuilder(customer, 'customer').toUrl();
    expect(result).toBe(
      'customer[first_name]=John&customer[last_name]=Connor&customer[id]=C123&' +
        'customer[email]=john@connor.com&customer[company]=Terminator&customer[locale]=en&' +
        'customer[phone]=9090909009&customer[vat_number]=VAT123'
    );
  });

  test('should prefix custom fields in customer', () => {
    const customField: CustomField = {
      name: 'sub_test',
      value: 'professional',
    };
    customer = { customFields: [customField] };

    const urlParams = new CustomerBuilder(customer, 'customer').toUrl();
    expect(urlParams).toBe(
      `customer[cf_${customField.name}]=${customField.value}`
    );
  });
});
