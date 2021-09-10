import { Button, View } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  CBCheckoutParams,
  CBSelfServeParams,
} from '../../../src/interfaces/cb-types';

export default function Home() {
  const navigation = useNavigation();

  return (
    <View>
      <Button
        title={'Self Serve'}
        onPress={() => navigation.navigate('SelfServe', selfServeParams)}
      />
      {buildPlans().map((p) => (
        <Button
          title={p.displayName}
          onPress={() => navigation.navigate('Checkout', p.option)}
          key={p.displayName}
        />
      ))}
    </View>
  );
}

const selfServeParams: CBSelfServeParams = {
  site: 'deepsentinel-test',
  customer: { email: 'travis@deepsentinel.com' },
};

function buildPlans() {
  const planWithCoupons: CBCheckoutParams = {
    couponIds: ['cbdemo_earlybird'],
    planId: 'comics-box',
    site: 'honeycomics-v3-test',
  };

  const basePlan = {
    planId: 'comics-box',
    site: 'honeycomics-v3-test',
  };

  const planWithAddons = {
    addons: [{ id: 'extra-comic-book', quantity: 2 }],
    planId: 'comics-box',
    site: 'honeycomics-v3-test',
  };
  const prefilledOptions = {
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
      email: 'prabuk@chargebee.com',
      firstName: 'Prabu',
      lastName: 'K',
    },
    planId: 'comics-box',
    site: 'honeycomics-v3-test',
  };
  const customFieldOptions = {
    addons: [{ id: 'extra-comic-book', quantity: 3 }],
    customer: {
      customFields: [{ name: 'test', value: 'testing' }],
      firstName: 'Prabu',
      lastName: 'K',
    },
    subscription: {
      customFields: [{ name: 'sub_test', value: 'subscription value' }],
    },
    planId: 'comics-box',
    site: 'honeycomics-v3-test',
  };
  const planWith3DS = {
    planId: 'cbdemo_scale',
    addons: [{ id: 'cbdemo_conciergesupport', quantity: 1 }],
    couponIds: ['cbdemo_holidays'],
    site: 'test-ashwin1-test',
  };
  const singlePageCheckout = {
    planId: 'cbdemo_scale',
    addons: [{ id: 'cbdemo_conciergesupport' }],
    couponIds: ['cbdemo_holidays'],
    site: 'test-ashwin4-test',
  };

  const v2planWithCoupons: CBCheckoutParams = {
    couponIds: ['cbdemo_earlybird', 'cbdemo_launchoffer'],
    items: [
      { planPricePointId: 'HBProduct-USD-Monthly' },
      { planPricePointId: 'cbdemo_additional-analytics-USD-monthly' },
    ],
    site: 'hbcompany-test',
  };

  const v2basePlan = {
    items: [{ planPricePointId: 'HBProduct-USD-Monthly' }],
    site: 'hbcompany-test',
    // apikey: 'test_rODRSf0YSfJJJzyy6bjUp16dZ9Kl0i1B:',
  };

  const v2planWithAddons = {
    items: [
      { planPricePointId: 'HBProduct-USD-Monthly' },
      { planPricePointId: 'cbdemo_additional-analytics-USD-monthly' },
      { planPricePointId: 'cbdemo_additional-users-USD-monthly', quantity: 2 },
    ],
    site: 'hbcompany-test',
  };
  const v2prefilledOptions = {
    items: [
      { planPricePointId: 'HBProduct-USD-Monthly' },
      { planPricePointId: 'cbdemo_additional-analytics-USD-monthly' },
      { planPricePointId: 'cbdemo_additional-users-USD-monthly', quantity: 2 },
    ],
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
      email: 'HB@chargebee.com',
      firstName: 'Prabu',
      lastName: 'K',
    },
    site: 'hbcompany-test',
  };
  const v2customFieldOptions = {
    items: [{ planPricePointId: 'HBProduct-USD-Monthly' }],
    // Prefix Custom Field with cf_  for Customer
    customer: {
      customFields: [{ name: 'cf_test', value: 'testing' }],
      firstName: 'Prabu',
      lastName: 'K',
    },
    // Prefix Custom Field with cf_ for Subscription
    subscription: {
      customFields: [{ name: 'cf_sub_test', value: 'subscriptionvalue' }],
    },
    site: 'hbcompany-test',
  };
  const v2planWith3DS = {
    couponIds: ['cbdemo_earlybird', 'cbdemo_launchoffer'],
    site: 'hbcompany-test',
    items: [
      { planPricePointId: 'HBProduct-USD-Monthly' },
      { planPricePointId: 'cbdemo_additional-analytics-USD-monthly' },
      { planPricePointId: 'cbdemo_additional-users-USD-monthly', quantity: 2 },
    ],
  };
  return [
    { option: planWithCoupons, displayName: 'Coupon Code Plan' },
    { option: basePlan, displayName: 'Paid Plan' },
    { option: planWithAddons, displayName: 'Paid Plan - With Addons' },
    { option: prefilledOptions, displayName: 'Billing Address Pre-filled' },
    { option: customFieldOptions, displayName: 'Custom Fields Pre-filled' },
    { option: planWith3DS, displayName: 'With 3DS' },
    { option: singlePageCheckout, displayName: 'V2 Single Page Checkout' },
    { option: v2planWithCoupons, displayName: 'v2 Coupon Code Plan' },
    { option: v2basePlan, displayName: 'v2 Paid Plan' },
    { option: v2planWithAddons, displayName: 'v2 Paid Plan - With Addons' },
    {
      option: v2prefilledOptions,
      displayName: 'v2 Billing Address Pre-filled',
    },
    {
      option: v2customFieldOptions,
      displayName: 'v2 Custom Fields Pre-filled',
    },
    { option: v2planWith3DS, displayName: 'v2 With 3DS' },
    // { option: v2singlePageCheckout, displayName: 'v2 V2 Single Page Checkout' },
  ];
}
