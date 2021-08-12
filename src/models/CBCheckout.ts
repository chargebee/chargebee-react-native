import { chain } from 'lodash';
import base64 from 'react-native-base64';
import {
  Addon,
  Item,
  Address,
  CBCheckoutParams,
  CBCheckoutQueryParams,
  Customer,
  Subscription,
} from '../interfaces/cb-types';
import { AddonsBuilder } from './AddonsBuilder';
import { CouponsBuilder } from './CouponsBuilder';
import { CustomerBuilder } from './CustomerBuilder';
import { SubscriptionBuilder } from './SubscriptionBuilder';
import { AddressBuilder } from './AddressBuilder';
import { ItemsBuilder } from './ItemsBuilder';
import { BaseBuilder } from './BaseBuilder';

export class CBCheckout {
  constructor(private props: CBCheckoutParams) {}

  build(checkforV1V2) {
    let isV2 = Object.keys(this.props).includes('items');
    if (checkforV1V2) isV2 = this.checkforV1orV2(this.props);
    const queryParams = this.buildQueryParams();
    return queryParams
      ? `${this.baseUrl(isV2)}?${queryParams}`
      : this.baseUrl();
  }

  private baseUrl(isV2) {
    if (!isV2) {
      return `https://${
        this.props.site
      }.chargebee.com/hosted_pages/plans/${this.planResource()}`;
    } else {
      return `https://${this.props.site}.chargebee.com/hosted_pages/checkout`;
    }
  }

  private planResource() {
    if (this.props.planId) {
      return this.props.planId;
    }
    return this.props.planName;
  }

  private buildQueryParams() {
    return chain(this.props)
      .entries()
      .map(([key, value]: [keyof CBCheckoutQueryParams, any]) => {
        const handler = matcher[key];
        return handler ? handler(value).toUrl() : '';
      })
      .compact()
      .join('&')
      .value();
  }

  async checkforV1orV2() {
    try {
      const response = await fetch(
        `https://${this.props.site}.chargebee.com/api/v2/configurations`,
        {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization':
              'Basic ' +
              base64.encode('test_rODRSf0YSfJJJzyy6bjUp16dZ9Kl0i1B:'),
          },
        }
      );
      const json = await response.json();
      if (json.configurations[0].product_catalog_version === 'v2') return true;
      else return false;
    } catch (error) {
      console.log(error);
    }
  }
}

const matcher: {
  [k in keyof CBCheckoutQueryParams]: (value: any) => BaseBuilder;
} = {
  addons: (value: Addon[]) => new AddonsBuilder(value, 'addons'),
  items: (value: Item[]) => new ItemsBuilder(value, 'subscription_items'),
  couponIds: (value: string[]) => new CouponsBuilder(value, 'coupon_ids'),
  customer: (value: Customer) => new CustomerBuilder(value, 'customer'),
  subscription: (value: Subscription) =>
    new SubscriptionBuilder(value, 'subscription'),
  billingAddress: (value: Address) =>
    new AddressBuilder(value, 'billing_address'),
  shippingAddress: (value: Address) =>
    new AddressBuilder(value, 'shipping_address'),
};
