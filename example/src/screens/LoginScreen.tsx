import Chargebee, {
  Subscription,
  SubscriptionsRequest,
} from '@chargebee/react-native-chargebee';
import { Text } from '@ui-kitten/components';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import LoginForm from '../components/LoginForm';
import type { LoginFunction } from '../types/CBee';

const LoginScreen = ({ navigation }) => {
  const [subscriptions, setSubscriptions] = useState<Array<Subscription>>([]);
  const [loggedInUserId, setLoggedInUserId] = useState<string>();

  useEffect(() => {
    navigation.navigate('Home', {
      subscriptions: subscriptions,
      customerId: loggedInUserId,
    });
  }, [subscriptions, navigation, loggedInUserId]);

  const login: LoginFunction = async (userId, password) => {
    console.log('Try Login');
    const successfulLogingUserId = await loginUser(userId, password);
    setLoggedInUserId(successfulLogingUserId);
    if (loggedInUserId) {
      fetchSubscriptionsForUser(loggedInUserId);
    }
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
