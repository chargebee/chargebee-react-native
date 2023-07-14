import { NativeModules, Platform } from 'react-native';
import Chargebee, {
  Customer,
  ProductIdentifiersRequest,
  SubscriptionsRequest,
} from '../index';

describe('Chargebee React Native', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('Configuring Chargebee React Native SDK with Site, Publishable API key and SDK Key', () => {
    const testSite = 'testsite';
    const testPublishableApiKey = 'test-PublishableApiKey';
    const androidSdkKey = 'androidSdkKey';
    const iOsSdkKey = 'iOsSdkKey';

    it('for Android', async () => {
      Platform.OS = 'android';

      await Chargebee.configure({
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

    it('for iOS', async () => {
      Platform.OS = 'ios';

      await Chargebee.configure({
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

      let configure = async () => {
        await Chargebee.configure({
          site: testSite,
          publishableApiKey: testPublishableApiKey,
          androidSdkKey: androidSdkKey,
          iOsSdkKey: iOsSdkKey,
        });
      };

      expect(configure).rejects.toThrow('Platform not supported.');
      expect(NativeModules.ChargebeeReactNative.configure).not.toBeCalled();
    });
  });

  it('retrieve Product Identifiers for the configured SDK', async () => {
    const queryParams: ProductIdentifiersRequest = {
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
    const customer: Customer = {
      id: customerId,
      firstName: 'Bruce',
      lastName: 'Wayne',
      email: 'bruce@wayne.com',
    };
    await Chargebee.purchaseProduct(productId, customer);

    expect(NativeModules.ChargebeeReactNative.purchaseProduct).toBeCalledTimes(
      1
    );
    expect(
      NativeModules.ChargebeeReactNative.purchaseProduct
    ).toHaveBeenCalledWith(productId, customer);
  });

  it('retrieve subscriptions by Subscription ID, Subscription status or Customer ID', async () => {
    const customerId = 'customer-id-1';
    const subscriptionId = 'subscription-id-1';
    const status = 'active';
    const queryParams: SubscriptionsRequest = {
      customer_id: customerId,
      subscription_id: subscriptionId,
      status: status,
    };
    await Chargebee.retrieveSubscriptions(queryParams);

    expect(
      NativeModules.ChargebeeReactNative.retrieveSubscriptions
    ).toBeCalledTimes(1);
    expect(
      NativeModules.ChargebeeReactNative.retrieveSubscriptions
    ).toHaveBeenCalledWith(queryParams);
  });

  it('restore subscriptions', async () => {
    const includeInactivePurchases = true;
    await Chargebee.restorePurchases(includeInactivePurchases);
    expect(NativeModules.ChargebeeReactNative.restorePurchases).toBeCalledTimes(
      1
    );
  });

  it('validate receipt by Product ID, Customer', async () => {
    const customer: Customer = { id: 'customer-id-1' };
    const productId = 'product-id-1';

    await Chargebee.validateReceipt(productId, customer);

    expect(NativeModules.ChargebeeReactNative.validateReceipt).toBeCalledTimes(
      1
    );
    expect(
      NativeModules.ChargebeeReactNative.validateReceipt
    ).toHaveBeenCalledWith(productId, customer);
  });

  it('retrieve entitlements receipt by Subscription ID', async () => {
    const subscriptionId = 'subscription-id-1';

    await Chargebee.retrieveEntitlements(subscriptionId);

    expect(
      NativeModules.ChargebeeReactNative.retrieveEntitlements
    ).toBeCalledTimes(1);
    expect(
      NativeModules.ChargebeeReactNative.retrieveEntitlements
    ).toHaveBeenCalledWith(subscriptionId);
  });
});
