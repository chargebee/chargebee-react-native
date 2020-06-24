import { Subscription } from '../interfaces/cb-types';
import { omit } from 'lodash';
import { BaseBuilder } from './BaseBuilder';
import { UrlTransformer } from '../helpers/UrlTransformer';

export class SubscriptionBuilder extends BaseBuilder {
  constructor(private subscription: Subscription, private keyName: string) {
    super();
  }

  toUrl() {
    const customAttributes = this.mapCustomAttributes(
      this.subscription.customFields
    );
    const baseAttributes = this.mapBaseAttributes(
      omit(this.subscription, 'customFields')
    );
    return UrlTransformer.encodePlainObject(this.keyName, {
      ...customAttributes,
      ...baseAttributes,
    });
  }

  protected getAttributeMap() {
    return {
      planQuantity: 'plan_quantity',
      startDate: 'start_date',
    };
  }
}
