import React, { useEffect } from 'react';

import { StyleSheet, View, Button, Alert } from 'react-native';
import Chargebee, { Product } from '@chargebee/react-native-chargebee';

export default function App() {
  const site = 'site';
  const apiKey = 'apiKey';
  const androidSdkKey = 'androidSdkKey';
  const iOsSdkKey = 'iOsSdkKey';

  let productIdentifiers: string[] = [];
  let products: Product[] = [];

  useEffect(() => {
    configure(site, apiKey, androidSdkKey, iOsSdkKey);
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
      const productId = products[0]?.id!;
      const customerId = 'customer-id';
      console.log('Purchssing ', productId, customerId);
      const result = await Chargebee.purchaseProduct(productId, customerId);
      openAlert(result);
      console.log(result);
      openAlert(result);
    } catch (error) {
      console.error(error);
    }
  };

  const configure = (
    site: string,
    apiKey: string,
    androidSdkKey: string,
    iOsSdkKey: string
  ) => {
    Chargebee.configure({
      site: site,
      publishableApiKey: apiKey,
      androidSdkKey: androidSdkKey,
      iOsSdkKey: iOsSdkKey,
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
        onPress={() => configure(site, apiKey, androidSdkKey, iOsSdkKey)}
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
