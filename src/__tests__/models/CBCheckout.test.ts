import { CBCheckout } from '../../models/CBCheckout';
import { CBCheckoutParams } from '../../interfaces/cb-types';

describe('Checkout Url Builder', () => {
  let planWithOptions: CBCheckoutParams;
  let itemWithOptions: CBCheckoutParams;

  beforeEach(() => {
    planWithOptions = {
      addons: [{ id: 'extra-comic-book', quantity: 3 }],
      billingAddress: {
        firstName: 'Ellie',
        lastName: 'Joel',
        company: 'Naughty Dog',
        line1: '12340 Boggy Creek Road',
        city: 'Orlando',
        zip: '32824',
        stateCode: 'FL',
        country: 'US',
      },
      customer: {
        email: 'prabu@chargebeeinc.com',
        firstName: 'Prabu',
        lastName: 'K',
        customFields: [{ name: 'test', value: 'testing' }],
      },
      subscription: {
        customFields: [{ name: 'sub_test', value: 'subscription value' }],
      },
      planName: 'comics-box',
      site: 'honeycomics-v3-test',
    };

    itemWithOptions = {
      billingAddress: {
        firstName: 'Ellie',
        lastName: 'Joel',
        company: 'Naughty Dog',
        line1: '12340 Boggy Creek Road',
        city: 'Orlando',
        zip: '32824',
        stateCode: 'FL',
        country: 'US',
      },
      customer: {
        email: 'prabu@chargebeeinc.com',
        firstName: 'Prabu',
        lastName: 'K',
        customFields: [{ name: 'test', value: 'testing' }],
      },
      subscription: {
        customFields: [{ name: 'sub_test', value: 'subscription value' }],
      },
      planName: 'comics-box',
      site: 'honeycomics-v3-test',
      items: [{ planPricePointId: 'HBProduct-USD-Monthly' }],
    };
  });

  test('should generate a proper url for a simple plan, using planId', () => {
    const simplePlan = {
      planId: 'comics-box',
      site: 'honeycomics-v3-test',
    };
    const url = new CBCheckout(simplePlan).build();

    expect(url).toBe(
      'https://honeycomics-v3-test.chargebee.com/hosted_pages/plans/comics-box'
    );
  });

  test('should generate a proper url for a simple plan with V2, using items', () => {
    const simplePlan = {
      items: [{ planPricePointId: 'HBProduct-USD-Monthly' }],
      site: 'honeycomics-v3-test',
    };
    const url = new CBCheckout(simplePlan).build(true);

    expect(url).toBe(
      'https://honeycomics-v3-test.chargebee.com/hosted_pages/checkout?subscription_items[item_price_id][0]=HBProduct-USD-Monthly'
    );
  });

  test('should generate a proper url for a simple plan, using planName', () => {
    const simplePlan = {
      planName: 'comics-box',
      site: 'honeycomics-v3-test',
    };
    const url = new CBCheckout(simplePlan).build();

    expect(url).toBe(
      'https://honeycomics-v3-test.chargebee.com/hosted_pages/plans/comics-box'
    );
  });

  test('should generate a proper url for a plan with options', () => {
    const url = new CBCheckout(planWithOptions).build();

    expect(url).toBe(
      'https://honeycomics-v3-test.chargebee.com/hosted_pages/plans/comics-box?addons[id][0]=extra-comic-book&' +
        'addons[quantity][0]=3&billing_address[first_name]=Ellie&billing_address[last_name]=Joel&' +
        'billing_address[company]=Naughty%20Dog&billing_address[line1]=12340%20Boggy%20Creek%20Road&' +
        'billing_address[city]=Orlando&billing_address[zip]=32824&billing_address[state_code]=FL&' +
        'billing_address[country]=US&customer[test]=testing&customer[email]=prabu@chargebeeinc.com&' +
        'customer[first_name]=Prabu&customer[last_name]=K&subscription[sub_test]=subscription%2520value'
    );
  });

  test('should generate a proper url for a item with options', () => {
    const url = new CBCheckout(itemWithOptions).build(true);

    expect(url).toBe(
      'https://honeycomics-v3-test.chargebee.com/hosted_pages/checkout?billing_address[first_name]=Ellie&billing_address[last_name]=Joel&' +
        'billing_address[company]=Naughty%20Dog&billing_address[line1]=12340%20Boggy%20Creek%20Road&' +
        'billing_address[city]=Orlando&billing_address[zip]=32824&billing_address[state_code]=FL&' +
        'billing_address[country]=US&customer[test]=testing&customer[email]=prabu@chargebeeinc.com&' +
        'customer[first_name]=Prabu&customer[last_name]=K&subscription[sub_test]=subscription%2520value&' +
        'subscription_items[item_price_id][0]=HBProduct-USD-Monthly'
    );
  });
});
