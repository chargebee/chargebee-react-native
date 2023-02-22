import React from 'react';
import { Text } from '@ui-kitten/components';
import LoginForm from '../components/LoginForm.';
import { Alert, StyleSheet } from 'react-native';
import type { LoginFunction } from '../types/CBee';

const LoginScreen = ({ navigation }) => {
  const login: LoginFunction = (userId, _) => {
    console.log('Login');
    navigation.navigate('Home');
    Alert.alert(userId);
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
