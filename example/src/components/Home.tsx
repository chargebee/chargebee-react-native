import { Button, View } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { CBCheckoutParams } from 'react-native-chargebee';

export default function Home() {
  const navigation = useNavigation();

  return (
    <View>
      {buildPlans().map((p) => (
        <Button
          title={p.displayName}
          onPress={() => navigation.navigate('Checkout', p.option)}
        />
      ))}
    </View>
  );
}

function buildPlans() {
  const planWithCoupons: CBCheckoutParams = {
    couponIds: ['cbdemo_earlybird'],
    planName: 'comics-box',
    site: 'honeycomics-v3-test',
  };

  const basePlan = {
    planName: 'comics-box',
    site: 'honeycomics-v3-test',
  };

  const planWithAddons = {
    addons: [{ id: 'extra-comic-book', quantity: 2 }],
    planName: 'comics-box',
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
    planName: 'comics-box',
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
    planName: 'comics-box',
    site: 'honeycomics-v3-test',
  };
  const planWith3DS = {
    planName: 'cbdemo_scale',
    addons: [{ id: 'cbdemo_conciergesupport', quantity: 1 }],
    couponIds: ['cbdemo_holidays'],
    site: 'test-ashwin1-test',
  };
  const singlePageCheckout = {
    planName: 'cbdemo_scale',
    addons: [{ id: 'cbdemo_conciergesupport' }],
    couponIds: ['cbdemo_holidays'],
    site: 'test-ashwin4-test',
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
