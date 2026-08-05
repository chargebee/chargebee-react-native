import { NativeModules, Platform } from 'react-native';
import {
  sdkKeyForPlatform,
  type ChargebeeConfig,
  type Product,
  type Purchase,
  type SubscriptionsRequest,
  type Subscription,
  type AuthenticationDetail,
  type ProductIdentifiersRequest,
  type Customer,
  type RestoredSubscription,
  type Entitlement,
  type EntitlementsRequest,
  ProductType,
  type OneTimePurchase,
} from './Purchases';

const LINKING_ERROR =
  `The package '@chargebee/react-native-chargebee' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

// @ts-expect-error
const isTurboModuleEnabled = global.__turboModuleProxy != null;

const ChargebeeReactNativeModule = isTurboModuleEnabled
  ? require('./NativeChargebeeReactNative').default
  : NativeModules.ChargebeeReactNative;

const ChargebeeReactNative = ChargebeeReactNativeModule
  ? ChargebeeReactNativeModule
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export default class Chargebee {
  /**
   * Sets up Chargebee SDK with site, API key and SDK IDs for Android and iOS.
   *
   * @param {String} site Chargebee site.
   * Example: If the Chargebee domain url is https://mobile-test.chargebee.com, then the site value is 'mobile-test'
   * @param {String} publishableApiKey Publishable API key generated for your Chargebee Site. Refer: https://www.chargebee.com/docs/2.0/api_keys.html#types-of-api-keys_publishable-key
   * @param {String} androidSdkKey Android SDK key. Refer: https://www.chargebee.com/docs/1.0/mobile-playstore-notifications.html#app-id
   * @param {String} iOsSdkKey iOS SDK key. Refer: https://www.chargebee.com/docs/1.0/mobile-app-store-product-iap.html#connection-keys_app-id
   */
  public static async configure({
    site,
    publishableApiKey,
    androidSdkKey,
    iOsSdkKey,
  }: ChargebeeConfig): Promise<AuthenticationDetail> {
    const sdkKey: string = sdkKeyForPlatform(androidSdkKey, iOsSdkKey);
    return ChargebeeReactNative.configure(site, publishableApiKey, sdkKey);
  }

  /**
   * Retrieves available product identifiers.
   *
   * @param {Object} productIdentitifiersRequest. Product Identifiers Request object.
   * Example: {limit : '100', offset : '1'}
   * @returns {Promise<Array<string>>} Array of product identifiers
   */
  public static async retrieveProductIdentifiers(
    productIdentitifiersRequest: ProductIdentifiersRequest
  ): Promise<Array<string>> {
    return ChargebeeReactNative.retrieveProductIdentifiers(
      productIdentitifiersRequest
    );
  }

  /**
   * Retrieves products for give product identifiers.
   *
   * @param {Array} productIds Array of product identifiers
   * @returns {Promise<Array<Product>>} Array of products
   */
  public static async retrieveProducts(
    productIds: Array<string>
  ): Promise<Array<Product>> {
    return ChargebeeReactNative.retrieveProducts(productIds);
  }

  /**
   * Purchase product for the customer.
   *
   * @param {Product} product Product
   * @param {Object} customer Optional. Customer object.
   * If the `id` is not passed in the customer's details, then the value of customerId will be the same as the SubscriptionId created in Chargebee.
   * @returns {Promise<Purchase>} Purchase result
   */
  public static async purchaseProduct(
    product: Product,
    customer: Customer | null
  ): Promise<Purchase> {
    return ChargebeeReactNative.purchaseProduct(
      product.id,
      product.offerToken,
      customer
    );
  }

  /**
   * Purchase one time product for the customer.
   *
   * @param {Product} product Product
   * @param {Object} productType One Time Product Type.
   * @param {Object} customer Optional. Customer object.
   * If the `id` is not passed in the customer's details, then the value of customerId will be the same as the SubscriptionId created in Chargebee.
   * @returns {Promise<OneTimePurchase>} Purchase result
   */
  public static async purchaseNonSubscriptionProduct(
    product: Product,
    productType: ProductType,
    customer: Customer | null
  ): Promise<OneTimePurchase> {
    return ChargebeeReactNative.purchaseNonSubscriptionProduct(
      product.id,
      productType,
      customer
    );
  }

  /**
   * Retrieves the subscriptions by customer_id or subscription_id.
   *
   * @param {Object} subscriptionRequest. Subscription Request object.
   * Example: {customer_id : '<customer_id>', subscription_id : '<subscription_id>', status: 'active'}
   * @returns {Promise<Array<Subscription>>} Array of subscriptions
   */
  public static async retrieveSubscriptions(
    subscriptionRequest: SubscriptionsRequest
  ): Promise<Array<Subscription>> {
    return ChargebeeReactNative.retrieveSubscriptions(subscriptionRequest);
  }

  /**
   * Restores the subscriptions for the user logged in the device.
   *
   * @param {Boolean} includeInactivePurchases When set to true, the inactive purchases are also synced to Chargebee.
   * @param {Object} customer Optional. Customer object.
   * Please use the same customer id which was used during the initial purchase
   * @returns {Promise<Array<RestoredSubscription>>} Array of subscriptions
   */
  public static async restorePurchases(
    includeInactivePurchases: boolean,
    customer: Customer | null
  ): Promise<Array<RestoredSubscription>> {
    const shouldIncludeInactivePurchases = Boolean(includeInactivePurchases);
    return ChargebeeReactNative.restorePurchases(
      shouldIncludeInactivePurchases,
      customer
    );
  }

  /**
   * Validates the receipt of the given Product ID and Customer.
   * This method can be used to retry sync with Chargebee, when sync fails after a successful purchase.
   *
   * @param {string} productId Product identifier
   * @param {Object} customer Optional. Customer object.
   * If the `id` is not passed in the customer's details, then the value of customerId will be the same as the SubscriptionId created in Chargebee.
   * @returns {Promise<Purchase>} Purchase result
   */
  public static async validateReceipt(
    productId: string,
    customer: Customer | null
  ): Promise<Purchase> {
    return ChargebeeReactNative.validateReceipt(productId, customer);
  }

  /**
   * This method will be used to validate the receipt of One Time Purchase with Chargebee,
   * when syncing with Chargebee fails after the successful purchase.
   *
   * @param {string} productId Product identifier.
   * @param {Object} productType One Time Product Type.
   * @param {Object} customer Optional. Customer object.
   * If the `id` is not passed in the customer's details, then the value of customerId will be the same as the SubscriptionId created in Chargebee.
   * @returns {Promise<OneTimePurchase>} Purchase result
   */
  public static async validateReceiptForNonSubscriptions(
    productId: string,
    productType: ProductType,
    customer: Customer | null
  ): Promise<OneTimePurchase> {
    return ChargebeeReactNative.validateReceiptForNonSubscriptions(
      productId,
      productType,
      customer
    );
  }

  /**
   * Retrieves the entitlements for a given subscription id
   *
   * @param {string} subscriptionId Subscription identifier
   * @returns {Promise<Array<Entitlement>>} Array of Entitlments
   */
  public static async retrieveEntitlements(
    entitlementsRequest: EntitlementsRequest
  ): Promise<Array<Entitlement>> {
    return ChargebeeReactNative.retrieveEntitlements(entitlementsRequest);
  }
}
