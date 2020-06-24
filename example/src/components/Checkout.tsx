import { CheckoutCart } from 'react-native-chargebee';
import * as React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { get } from 'lodash';

export default function Checkout() {
  const navigation = useNavigation();
  const route = useRoute();
  const couponIds = get(route, 'params.couponIds', []);
  const addons = get(route, 'params.addons', []);
  const billingAddress = get(route, 'params.billingAddress', {});
  const customer = get(route, 'params.customer', {});
  const subscription = get(route, 'params.subscription', {});
  const planName = get(route, 'params.planName', '');
  const site = get(route, 'params.site', '');

  const successfulPurchase = (hostedPageId: string) => {
    console.log('successfully purchased', hostedPageId);
    navigation.navigate('Success');
  };

  const handleStep = (stepName: string) => {
    console.log('Currently in step', stepName);
  };

  return (
    <CheckoutCart
      success={(hostedPageId: string) => successfulPurchase(hostedPageId)}
      step={(stepName: string) => handleStep(stepName)}
      site={site}
      planName={planName}
      couponIds={couponIds}
      addons={addons}
      customer={customer}
      subscription={subscription}
      billingAddress={billingAddress}
    />
  );
}
