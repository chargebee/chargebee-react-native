import React, { useEffect } from 'react';

import { StyleSheet, View, Button } from 'react-native';
import Chargebee from '@chargebee/react-native-chargebee';

export default function App() {
  const site = 'site';
  const apiKey = 'apiKey';
  const sdkKey = 'sdkKey';

  let productIdentifiers: string[] = [];

  useEffect(() => {
    configure(site, apiKey, sdkKey);
  }, []);

  const retrieveProductIdentifiers = async () => {
    const queryParams = new Map<string, string>();
    queryParams.set('limit', '1');
    try {
      const result = await Chargebee.retrieveProductIdentifiers(queryParams);
      console.log(result);
      productIdentifiers = result;
    } catch (error) {
      console.error(error);
    }
  };

  // TODO: Refactor Examples
  const retrieveProducts = async () => {
    try {
      const result = await Chargebee.retrieveProducts(productIdentifiers);
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  const configure = (site: string, apiKey: string, sdkKey: string) => {
    Chargebee.configure({
      site: site,
      publishableApiKey: apiKey,
      sdkKey: sdkKey,
    });
  };

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
      <Button title="Retrieve Products" onPress={retrieveProducts} />
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
