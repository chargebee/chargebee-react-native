import { chain } from 'lodash';
import {
  Item,
  Address,
  CBCheckoutParams,
  CBCheckoutQueryParams,
  Customer,
  Subscription,
} from '../interfaces/cb-types';
import { CouponsBuilder } from './CouponsBuilder';
import { CustomerBuilder } from './CustomerBuilder';
import { SubscriptionBuilder } from './SubscriptionBuilder';
import { AddressBuilder } from './AddressBuilder';
import { ItemsBuilder } from './ItemsBuilder';
import { BaseBuilder } from './BaseBuilder';

export class CBCheckout {
  constructor(private props: CBCheckoutParams) {}

  build() {
    const queryParams = this.buildQueryParams();
    return queryParams ? `${this.baseUrl()}?${queryParams}` : this.baseUrl();
  }

  private baseUrl() {
    return `https://${this.props.site}.chargebee.com/hosted_pages/checkout`;
  }

  private planResource() {
    if (this.props.planPricePointId) {
      return this.props.planPricePointId;
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
}

const matcher: {
  [k in keyof CBCheckoutQueryParams]: (value: any) => BaseBuilder;
} = {
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
