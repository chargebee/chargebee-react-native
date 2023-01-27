import * as React from 'react';

import { StyleSheet, View, Text } from 'react-native';
import { configure } from '@chargebee/react-native-chargebee';

export default function App() {
  const [result, setResult] = React.useState<number | undefined>();

  React.useEffect(() => {
    console.log("Configuring Site with: Site, apiKey, sdkKey")
    configure("Site", "apiKey", "sdkKey")
  }, []);

  return (
    <View style={styles.container}>
      <Text>Result: {result}</Text>
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
