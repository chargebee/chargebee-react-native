import { CheckoutCart } from '@chargebee/react-native-chargebee';
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
  const planId = get(route, 'params.planId', '');
  const site = get(route, 'params.site', '');
  const items = get(route, 'params.items', '');

  const successfulPurchase = (hostedPageId: string) => {
    console.log('successfully purchased', hostedPageId);
    navigation.navigate('Success');
  };

  const handleStep = (stepName: string) => {
    console.log('Currently in step', stepName);
  };

  return (
    <CheckoutCart
      onSuccess={(hostedPageId: string) => successfulPurchase(hostedPageId)}
      onEachStep={(stepName: string) => handleStep(stepName)}
      site={site}
      planId={planId}
      couponIds={couponIds}
      addons={addons}
      customer={customer}
      subscription={subscription}
      billingAddress={billingAddress}
      items={items}
    />
  );
}
