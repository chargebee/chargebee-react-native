import { NativeModules, Platform } from 'react-native';
import Chargebee, {
  RetrieveProductIdentifiersRequest,
  SubscriptionsRequest,
} from '../index';

describe('Chargebee React Native', () => {
  describe('Configuring Chargebee React Native SDK with Site, Publishable API key and SDK Key', () => {
    const testSite = 'testsite';
    const testPublishableApiKey = 'test-PublishableApiKey';
    const androidSdkKey = 'androidSdkKey';
    const iOsSdkKey = 'iOsSdkKey';

    it('for Android', () => {
      Platform.OS = 'android';

      Chargebee.configure({
        site: testSite,
        publishableApiKey: testPublishableApiKey,
        androidSdkKey: androidSdkKey,
        iOsSdkKey: iOsSdkKey,
      });

      expect(NativeModules.ChargebeeReactNative.configure).toHaveBeenCalledWith(
        testSite,
        testPublishableApiKey,
        androidSdkKey
      );
    });

    it('for iOS', () => {
      Platform.OS = 'ios';

      Chargebee.configure({
        site: testSite,
        publishableApiKey: testPublishableApiKey,
        androidSdkKey: androidSdkKey,
        iOsSdkKey: iOsSdkKey,
      });

      expect(NativeModules.ChargebeeReactNative.configure).toHaveBeenCalledWith(
        testSite,
        testPublishableApiKey,
        iOsSdkKey
      );
    });

    it('for Unsupported Platform', () => {
      Platform.OS = 'web';

      let configure = () => {
        Chargebee.configure({
          site: testSite,
          publishableApiKey: testPublishableApiKey,
          androidSdkKey: androidSdkKey,
          iOsSdkKey: iOsSdkKey,
        });
      };

      expect(configure).toThrowError('Platform not supported.');
    });
  });

  it('retrieve Product Identifiers for the configured SDK', async () => {
    const queryParams: RetrieveProductIdentifiersRequest = {
      limit: '100',
      offset: '1',
    };
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

  it('retrieve subscriptions by Subscription ID, Subscription status or Customer ID', async () => {
    const customerId = 'customer-id-1';
    const queryParams: SubscriptionsRequest = { customer_id: customerId };
    await Chargebee.retrieveSubscriptions(queryParams);

    expect(
      NativeModules.ChargebeeReactNative.retrieveSubscriptions
    ).toBeCalledTimes(1);
    expect(
      NativeModules.ChargebeeReactNative.retrieveSubscriptions
    ).toHaveBeenCalledWith(queryParams);
  });
});
