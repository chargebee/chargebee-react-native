import { Customer } from '../interfaces/cb-types';
import { omit } from 'lodash';
import { BaseBuilder } from './BaseBuilder';
import { UrlTransformer } from '../helpers/UrlTransformer';

export class CustomerBuilder extends BaseBuilder {
  constructor(private customer: Customer, private keyName: string) {
    super();
  }

  toUrl() {
    const customAttributes = this.mapCustomAttributes(
      this.customer.customFields
    );
    const baseAttributes = this.mapBaseAttributes(
      omit(this.customer, 'customFields')
    );
    return UrlTransformer.encodePlainObject(this.keyName, {
      ...customAttributes,
      ...baseAttributes,
    });
  }

  protected getAttributeMap() {
    return {
      id: 'id',
      firstName: 'first_name',
      email: 'email',
      lastName: 'last_name',
      company: 'company',
      locale: 'locale',
      phone: 'phone',
      vatNumber: 'vat_number',
    };
  }
}
