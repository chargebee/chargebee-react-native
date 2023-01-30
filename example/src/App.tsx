import React, { useState } from 'react';

import { StyleSheet, View, Text } from 'react-native';
import Chargebee from '@chargebee/react-native-chargebee';

export default function App() {
  const [configComplete, isConfigComplete] = useState(false);
  const site = 'site';
  const apiKey = 'test_key';
  const sdkKey = 'sdk-key';

  React.useEffect(() => {
    Chargebee.configure({
      site: site,
      publishableApiKey: apiKey,
      sdkKey: sdkKey,
    });
    isConfigComplete(true);
  }, []);

  return (
    <View style={styles.container}>
      {!configComplete ? (
        <Text>Pending config</Text>
      ) : (
        <Text>Config complete</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
