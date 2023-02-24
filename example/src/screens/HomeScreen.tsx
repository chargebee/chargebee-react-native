import React, { useEffect, useState } from 'react';
import { Text } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';
import type { Subscription } from '@chargebee/react-native-chargebee';
import CoursesScreen from './CoursesScreen';

const HomeScreen = ({ route }) => {
  const [subscriptions, setSubscriptions] = useState<Array<Subscription>>([]);
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    setSubscriptions(route.params.subscriptions);
  }, [route.params.subscriptions]);

  useEffect(() => {
    setIsSubscribed(subscriptions.length > 0);
  }, [subscriptions]);

  return (
    <>
      {isSubscribed ? (
        <CoursesScreen />
      ) : (
        <Text style={styles.text} category="h1">
          You are logged in as Wayne!
        </Text>
      )}
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
  },
});
