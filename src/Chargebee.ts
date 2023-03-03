import { NativeModules, Platform } from 'react-native';
import {
  type ChargebeeConfig,
  sdkKeyForPlatform,
  type Product,
  type Purchase,
  type SubscriptionsRequest,
  type Subscription,
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
   * @param {String} site Chargebee site
   * @param {String} publishableApiKey Publishable API key generated for your Chargebee Site.
   * @param {String} androidSdkKey Android SDK key. Refer: https://www.chargebee.com/docs/1.0/mobile-playstore-notifications.html#app-id
   * @param {String} iOsSdkKey iOS SDK key. Refer: https://www.chargebee.com/docs/1.0/mobile-app-store-product-iap.html#connection-keys_app-id
   */
  public static configure({
    site,
    publishableApiKey,
    androidSdkKey,
    iOsSdkKey,
  }: ChargebeeConfig): void {
    const sdkKey: string = sdkKeyForPlatform(androidSdkKey, iOsSdkKey);
    ChargebeeReactNative.configure(site, publishableApiKey, sdkKey);
  }

  // TODO: Refactor to use types for query
  /**
   * Retrieves available product identifiers.
   * 
   * @param {Map} queryParams Query Parameters
   * Example: new Map<string, string>([["limit", "100"]]);
   * @returns {Promise<Array<string>>} Array of product identifiers
   */
  public static async retrieveProductIdentifiers(
    queryParams: Map<string, string>
  ): Promise<Array<string>> {
    return ChargebeeReactNative.retrieveProductIdentifiers(queryParams);
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

  // TODO: Refactor to pass Product object
  /**
   * Purchase product for the customer.
   * 
   * @param {string} productId Product identifier
   * @param {string} customerId Optional. Customer Identifier
   * @returns {Promise<Purchase>} Purchase result
   */
  public static async purchaseProduct(
    productId: string,
    customerId: string | null
  ): Promise<Purchase> {
    return ChargebeeReactNative.purchaseProduct(productId, customerId);
  }

  /**
   * Retrieves the subscriptions by customer_id or subscription_id.
   * 
   * @param {Object} subscriptionRequest. Subscription Request object.
   * @returns {Promise<Array<Subscription>>} Array of subscriptions
   */
  public static async retrieveSubscriptions(
    subscriptionRequest: SubscriptionsRequest
  ): Promise<Array<Subscription>> {
    return ChargebeeReactNative.retrieveSubscriptions(subscriptionRequest);
  }
}
