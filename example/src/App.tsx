import React from 'react';

import { StyleSheet, View, Button } from 'react-native';
import Chargebee from '@chargebee/react-native-chargebee';

export default function App() {
  const site = 'site';
  const apiKey = 'apiKey';
  const sdkKey = 'sdkKey';

  React.useEffect(() => {
    configure(site, apiKey, sdkKey);
  }, []);

  return (
    <View style={styles.container}>
      <Button
        title="Configure"
        onPress={() => configure(site, apiKey, sdkKey)}
      />
      <Button
        title="Retrieve Product Identifers"
        onPress={retrieveProductIdentifiers}
      />
    </View>
  );
}

const retrieveProductIdentifiers = () => {
  const queryParams = new Map<string, string>();
  queryParams.set('limit', '100');
  Chargebee.retrieveProductIdentifiers(queryParams)
    .then((result) => {
      console.log(result);
    })
    .catch((e) => {
      console.error(e);
    });
};

const configure = (site: string, apiKey: string, sdkKey: string) => {
  Chargebee.configure({
    site: site,
    publishableApiKey: apiKey,
    sdkKey: sdkKey,
  });
};

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
