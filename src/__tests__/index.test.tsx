import { NativeModules, Platform } from 'react-native';
import Chargebee, {
  Customer,
  EntitlementsRequest,
  ProductIdentifiersRequest,
  ProductType,
  SubscriptionsRequest,
  Product,
  Offer,
} from '../index';

describe('Chargebee React Native', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  const offer: Offer = {
    id: 'offerId',
    price: 0,
  };

  const product: Product = {
    id: 'id',
    baseProductId: 'baseProductId',
    offer: offer,
    offerToken: 'offerToken',
    title: 'title',
    price: 99,
    currencyCode: 'INR',
  };

  const productWithoutOfferToken: Product = {
    id: 'id',
    baseProductId: 'baseProductId',
    offer: null,
    offerToken: null,
    title: 'title',
    price: 99,
    currencyCode: 'INR',
  };

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

  it('purchase Product by Product and Customer ID for the configured Android SDK ', async () => {
    Platform.OS = 'android';
    const customerId = 'customer-id-1';
    const customer: Customer = {
      id: customerId,
      firstName: 'Bruce',
      lastName: 'Wayne',
      email: 'bruce@wayne.com',
    };
    await Chargebee.purchaseProduct(product, customer);

    expect(NativeModules.ChargebeeReactNative.purchaseProduct).toBeCalledTimes(
      1
    );
    expect(
      NativeModules.ChargebeeReactNative.purchaseProduct
    ).toHaveBeenCalledWith(product.id, 'offerToken', customer);
  });

  it('purchase Product by Product and Customer ID for the configured iOS SDK ', async () => {
    Platform.OS = 'ios';
    const customerId = 'customer-id-1';
    const customer: Customer = {
      id: customerId,
      firstName: 'Bruce',
      lastName: 'Wayne',
      email: 'bruce@wayne.com',
    };
    await Chargebee.purchaseProduct(productWithoutOfferToken, customer);

    expect(NativeModules.ChargebeeReactNative.purchaseProduct).toBeCalledTimes(
      1
    );
    expect(
      NativeModules.ChargebeeReactNative.purchaseProduct
    ).toHaveBeenCalledWith(productWithoutOfferToken.id, null, customer);
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
    const customerId = 'customer-id-1';
    const customer: Customer = {
      id: customerId,
      firstName: 'Bruce',
      lastName: 'Wayne',
      email: 'bruce@wayne.com',
    };
    await Chargebee.restorePurchases(includeInactivePurchases, customer);
    expect(NativeModules.ChargebeeReactNative.restorePurchases).toBeCalledTimes(
      1
    );
    expect(
      NativeModules.ChargebeeReactNative.restorePurchases
    ).toHaveBeenCalledWith(includeInactivePurchases, customer);
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
    const request: EntitlementsRequest = {
      subscriptionId: 'subscription-id-1',
    };
    await Chargebee.retrieveEntitlements(request);

    expect(
      NativeModules.ChargebeeReactNative.retrieveEntitlements
    ).toBeCalledTimes(1);
    expect(
      NativeModules.ChargebeeReactNative.retrieveEntitlements
    ).toHaveBeenCalledWith(request);
  });

  it('Purchase one time product', async () => {
    const productType = ProductType.NON_CONSUMABLE;
    const customer: Customer = {
      id: 'rn-test',
      firstName: 'Bruce',
      lastName: 'Wayne',
      email: 'bruce@wayne.com',
    };
    await Chargebee.purchaseNonSubscriptionProduct(
      product,
      productType,
      customer
    );

    expect(
      NativeModules.ChargebeeReactNative.purchaseNonSubscriptionProduct
    ).toBeCalledTimes(1);
    expect(
      NativeModules.ChargebeeReactNative.purchaseNonSubscriptionProduct
    ).toHaveBeenCalledWith(product.id, productType, customer);
  });

  it('validate non subscription receipt by Product ID, Product Type and Customer', async () => {
    const productId = 'product-id-1';
    const productType = ProductType.NON_CONSUMABLE;
    const customer: Customer = {
      id: 'rn-test',
      firstName: 'Bruce',
      lastName: 'Wayne',
      email: 'bruce@wayne.com',
    };

    await Chargebee.validateReceiptForNonSubscriptions(
      productId,
      productType,
      customer
    );

    expect(
      NativeModules.ChargebeeReactNative.validateReceiptForNonSubscriptions
    ).toBeCalledTimes(1);
    expect(
      NativeModules.ChargebeeReactNative.validateReceiptForNonSubscriptions
    ).toHaveBeenCalledWith(productId, productType, customer);
  });
});
