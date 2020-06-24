import { pick } from 'lodash';
import { CBCheckoutParams } from '../interfaces/cb-types';
import { UrlTransformer } from '../helpers/UrlTransformer';

export class CBCheckout {
  build(props: CBCheckoutParams) {
    let options = pick(props, ALLOWED_URL_OPTIONS);
    const queryParams = UrlTransformer.encode(options);
    return this.buildBaseUrl(props.site, props.planName) + queryParams;
  }

  buildBaseUrl(site: string, planName: string) {
    return `https://${site}.chargebee.com/hosted_pages/plans/${planName}?`;
  }
}

const ALLOWED_URL_OPTIONS = [
  'addons',
  'couponIds',
  'customer',
  'subscription',
  'billingAddress',
  'shippingAddress',
];
