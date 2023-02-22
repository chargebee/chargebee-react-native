import React, { useEffect } from 'react';

import { StyleSheet, View, Button, Alert } from 'react-native';
import Chargebee, { Product } from '@chargebee/react-native-chargebee';

export default function App() {
  const site = 'site';
  const apiKey = 'apiKey';
  const sdkKey = 'sdkKey';

  let productIdentifiers: string[] = [];
  let products: Product[] = [];

  useEffect(() => {
    configure(site, apiKey, sdkKey);
  });

  const retrieveProductIdentifiers = async () => {
    const queryParams = new Map<string, string>();
    queryParams.set('limit', '1');
    try {
      const result = await Chargebee.retrieveProductIdentifiers(queryParams);
      console.log(result);
      openAlert(result);
      productIdentifiers = result;
    } catch (error) {
      console.error(error);
    }
  };

  // TODO: Refactor Examples
  const retrieveProducts = async () => {
    try {
      const result = await Chargebee.retrieveProducts(productIdentifiers);
      products = result;
      openAlert(result);
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  const purchaseProduct = async () => {
    try {
      const result = await Chargebee.purchaseProduct(
        products[0]?.id!,
        'graceperiodtest3'
      );
      console.log(result);
      openAlert(result);
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
    console.log('Configured ', site);
    openAlert('Configured: ' + site);
  };

  const openAlert = (response: any) => {
    Alert.alert(JSON.stringify(response));
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
      <Button title="Purchase Product" onPress={purchaseProduct} />
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
