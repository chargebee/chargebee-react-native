import { Address } from '../interfaces/cb-types';
import { BaseBuilder } from './BaseBuilder';
import { UrlTransformer } from '../helpers/UrlTransformer';

export class AddressBuilder extends BaseBuilder {
  constructor(private address: Address, private keyName: string) {
    super();
  }

  toUrl() {
    const values = this.mapBaseAttributes(this.address);
    return UrlTransformer.encodePlainObject(this.keyName, values);
  }

  protected getAttributeMap() {
    return {
      firstName: 'first_name',
      lastName: 'last_name',
      email: 'email',
      company: 'company',
      phone: 'phone',
      line1: 'line1',
      line2: 'line2',
      line3: 'line3',
      city: 'city',
      stateCode: 'state_code',
      state: 'state',
      zip: 'zip',
      country: 'country',
    };
  }
}
