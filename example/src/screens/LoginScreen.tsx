import React, { useEffect, useState } from 'react';
import { Text } from '@ui-kitten/components';
import LoginForm from '../components/LoginForm.';
import { StyleSheet } from 'react-native';
import type { LoginFunction } from '../types/CBee';
import Chargebee, {
  Subscription,
  SubscriptionsRequest,
} from '@chargebee/react-native-chargebee';

const LoginScreen = ({ navigation }) => {
  const [subscriptions, setSubscriptions] = useState<Array<Subscription>>([]);

  useEffect(() => {
    navigation.navigate('Home', subscriptions);
  }, [subscriptions, navigation]);

  const login: LoginFunction = async (userId, password) => {
    console.log('Try Login');
    const loggedInUserId = await loginUser(userId, password);
    fetchSubscriptionsForUser(loggedInUserId);
  };

  const loginUser = (userId: string, _: string) => {
    // Assume successful auth and login
    return userId;
  };

  const fetchSubscriptionsForUser = (userId: string) => {
    const subscriptionRequests: SubscriptionsRequest = { customer_id: userId };
    Chargebee.retrieveSubscriptions(subscriptionRequests)
      .then((subscriptions: Array<Subscription>) => {
        setSubscriptions(subscriptions);
      })
      .catch((error) => {
        console.error(error);
        console.log('No Subscriptions found for User');
        setSubscriptions([]);
      });
  };

  return (
    <>
      <Text style={styles.text} category="h1">
        Welcome to CBeeHive
      </Text>
      <Text style={styles.text} category="s1">
        Login to to start learning
      </Text>
      <LoginForm login={login} />
    </>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
  },
});
