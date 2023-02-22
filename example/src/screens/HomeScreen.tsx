import React from 'react';
import { Text } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';

const HomeScreen = () => {
  return (
    <>
      <Text style={styles.text} category="h1">
        You are logged in as Bruce!
      </Text>
    </>
  );
};

export default HomeScreen;

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
