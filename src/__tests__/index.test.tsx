import { NativeModules } from 'react-native';
import Chargebee from '../index';

describe('Chargebee React Native', () => {
  it('configures the CB RN SDK with Site, Publishable API key and SDK Key', () => {
    const testSite = 'testsite';
    const testPublishableApiKey = 'test-PublishableApiKey';
    const sdkKey = 'sdkKey';

    Chargebee.configure({
      site: testSite,
      publishableApiKey: testPublishableApiKey,
      sdkKey: sdkKey,
    });

    expect(NativeModules.ChargebeeReactNative.configure).toHaveBeenCalledWith(
      testSite,
      testPublishableApiKey,
      sdkKey
    );
  });

  it('retrieve Product Identifiers for the configured SDK', async () => {
    const queryParams = new Map<string, string>();
    queryParams.set('limit', '100');
    await Chargebee.retrieveProductIdentifiers(queryParams);

    expect(
      NativeModules.ChargebeeReactNative.retrieveProductIdentifiers
    ).toBeCalledTimes(1);
    expect(
      NativeModules.ChargebeeReactNative.retrieveProductIdentifiers
    ).toHaveBeenCalledWith(queryParams);
  });

  it('retrieve Products by Product IDs for the configured SDK', async () => {
    const productIds = ['product-id-1'];
    await Chargebee.retrieveProducts(productIds);

    expect(NativeModules.ChargebeeReactNative.retrieveProducts).toBeCalledTimes(
      1
    );
    expect(
      NativeModules.ChargebeeReactNative.retrieveProducts
    ).toHaveBeenCalledWith(productIds);
  });

  it('purchase Product by Product ID and Customer ID for the configured SDK', async () => {
    const productId = 'product-id-1';
    const customerId = 'customer-id-1';
    await Chargebee.purchaseProduct(productId, customerId);

    expect(NativeModules.ChargebeeReactNative.purchaseProduct).toBeCalledTimes(
      1
    );
    expect(
      NativeModules.ChargebeeReactNative.purchaseProduct
    ).toHaveBeenCalledWith(productId, customerId);
  });
});
