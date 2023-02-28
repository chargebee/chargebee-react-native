import type { Subscription } from '@chargebee/react-native-chargebee';
import React, { useEffect, useState } from 'react';
import CoursesScreen from './CoursesScreen';
import PurchasesScreen from './PurchasesScreen';

const HomeScreen = ({ route, navigation }) => {
  const [subscriptions, setSubscriptions] = useState<Array<Subscription>>([]);
  const [customerId, setCustomerId] = useState<string>('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    setSubscriptions(route.params.subscriptions);
  }, [route.params.subscriptions]);

  useEffect(() => {
    setCustomerId(route.params.customerId);
  }, [route.params.customerId]);

  useEffect(() => {
    setIsSubscribed(subscriptions.length > 0);
  }, [subscriptions]);

  return (
    <>
      {isSubscribed ? (
        <CoursesScreen />
      ) : (
        <PurchasesScreen navigation={navigation} customerId={customerId} />
      )}
    </>
  );
};

export default HomeScreen;