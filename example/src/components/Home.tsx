import { Button, View } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { CBCheckoutParams } from '@chargebee/react-native-chargebee';

export default function Home() {
  const navigation = useNavigation();

  return (
    <View>
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

function buildPlans() {
  const planWithCoupons: CBCheckoutParams = {
    couponIds: ['cbdemo_earlybird', 'cbdemo_launchoffer'],
    items: [
      { planPricePointId: 'HBProduct-USD-Monthly' },
      { planPricePointId: 'cbdemo_additional-analytics-USD-monthly' },
    ],
    site: 'hbcompany-test',
  };

  const basePlan = {
    items: [{ planPricePointId: 'HBProduct-USD-Monthly' }],
    site: 'hbcompany-test',
  };

  const planWithAddons = {
    items: [
      { planPricePointId: 'HBProduct-USD-Monthly' },
      { planPricePointId: 'cbdemo_additional-analytics-USD-monthly' },
      { planPricePointId: 'cbdemo_additional-users-USD-monthly', quantity: 2 },
    ],
    site: 'hbcompany-test',
  };
  const prefilledOptions = {
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
  const customFieldOptions = {
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
  const planWith3DS = {
    couponIds: ['cbdemo_earlybird', 'cbdemo_launchoffer'],
    site: 'hbcompany-test',
    items: [
      { planPricePointId: 'HBProduct-USD-Monthly' },
      { planPricePointId: 'cbdemo_additional-analytics-USD-monthly' },
      { planPricePointId: 'cbdemo_additional-users-USD-monthly', quantity: 2 },
    ],
  };
  const singlePageCheckout = {
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
  ];
}
