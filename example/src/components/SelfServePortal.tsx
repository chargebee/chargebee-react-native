import { SelfServe } from '../../../src/components/SelfServe';
import * as React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { get } from 'lodash';

export default function SelfServePortal() {
  const navigation = useNavigation();
  const route = useRoute();
  const customer = get(route, 'params.customer', {});
  const site = get(route, 'params.site', '');

  console.log('Customer: ' + customer);

  const successfulPurchase = (hostedPageId: string) => {
    console.log(hostedPageId);
    navigation.navigate('Success');
  };

  const handleStep = (stepName: string) => {
    console.log('Currently in step', stepName);
  };

  return (
    <SelfServe
      success={(hostedPageId: string) => successfulPurchase(hostedPageId)}
      step={(stepName: string) => handleStep(stepName)}
      site={site}
      customer={customer}
    />
  );
}
