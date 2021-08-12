import { chain } from 'lodash';
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

  build(isV2) {
    const queryParams = this.buildQueryParams();
    return queryParams ? `${this.baseUrl(isV2)}?${queryParams}` : this.baseUrl();
  }

  private baseUrl(isV2) {
    if (!isV2){
      return `https://${this.props.site}.chargebee.com/hosted_pages/plans/${this.planResource()}`;
    }
    else {
      console.log("This is v2 plan")
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
