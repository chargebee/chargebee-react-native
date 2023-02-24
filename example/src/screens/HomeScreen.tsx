import type { Subscription } from '@chargebee/react-native-chargebee';
import React, { useEffect, useState } from 'react';
import CoursesScreen from './CoursesScreen';
import PurchasesScreen from './PurchasesScreen';

const HomeScreen = ({ route, navigation }) => {
  const [subscriptions, setSubscriptions] = useState<Array<Subscription>>([]);
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    setSubscriptions(route.params.subscriptions);
  }, [route.params.subscriptions]);

  useEffect(() => {
    setIsSubscribed(subscriptions.length > 0);
  }, [subscriptions]);

  return <>{isSubscribed ? <CoursesScreen /> : <PurchasesScreen navigation={navigation} />}</>;
};

export default HomeScreen;
