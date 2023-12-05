import Chargebee, {
  Subscription,
  SubscriptionsRequest,
} from '@chargebee/react-native-chargebee';
import { Layout, Text } from '@ui-kitten/components';
import React, { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import { StyleSheet } from 'react-native';
import LoginForm from '../components/LoginForm';
import type { LoginFunction } from '../types/CBee';

const LoginScreen = ({ navigation }) => {
  const [subscriptions, setSubscriptions] = useState<Array<Subscription>>([]);
  const [loggedInUserId, setLoggedInUserId] = useState<string>();

  useEffect(() => {
    if (loggedInUserId) {
      navigation.navigate('Home', {
        subscriptions: subscriptions,
        customerId: loggedInUserId,
      });
    }
  }, [subscriptions, navigation, loggedInUserId]);

  const login: LoginFunction = async (userId, password) => {
    console.log('Try Login for user:', userId);
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
    console.log('Fetching Subscriptions for :', subscriptionRequests);
    Chargebee.retrieveSubscriptions(subscriptionRequests)
      .then((subscriptions: Array<Subscription>) => {
        console.log('Subscriptions found for User', subscriptions);
        setSubscriptions(subscriptions);
      })
      .catch((error) => {
        console.log('No Subscriptions found for User', error);
        console.log(
          '=========================',
          Platform.OS,
          '========================='
        );
        const errorModel = {
          code: error.code,
          message: error.message,
          userInfo: {
            message: error.userInfo?.message,
            apiErrorCode: error.userInfo?.apiErrorCode,
            httpStatusCode: error.userInfo?.httpStatusCode,
          },
        };
        console.error(errorModel);
        console.log('=========================');
        setSubscriptions([]);
      });
  };

  return (
    <>
      <Layout style={styles.container}>
        <Text style={styles.text} category="h1">
          Welcome to CBeeHive
        </Text>
        <Text style={styles.text} category="s1">
          Login to to start learning
        </Text>
        <LoginForm login={login} />
      </Layout>
    </>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
  },
  restore: {
    justifyContent: 'center',
  },
});
