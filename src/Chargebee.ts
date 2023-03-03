import { NativeModules, Platform } from 'react-native';
import {
  sdkKeyForPlatform,
  type ChargebeeConfig,
  type Product,
  type Purchase,
  type SubscriptionsRequest,
  type Subscription,
  type AuthenticationDetail,
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
  public static configure({
    site,
    publishableApiKey,
    androidSdkKey,
    iOsSdkKey,
  }: ChargebeeConfig): Promise<AuthenticationDetail> {
    const sdkKey: string = sdkKeyForPlatform(androidSdkKey, iOsSdkKey);
    return ChargebeeReactNative.configure(site, publishableApiKey, sdkKey);
  }

  // TODO: Refactor to use types for query
  public static async retrieveProductIdentifiers(
    queryParams: Map<string, string>
  ): Promise<Array<string>> {
    return ChargebeeReactNative.retrieveProductIdentifiers(queryParams);
  }

  public static async retrieveProducts(
    productIds: Array<string>
  ): Promise<Array<Product>> {
    return ChargebeeReactNative.retrieveProducts(productIds);
  }

  // TODO: Refactor to pass Product object
  public static async purchaseProduct(
    productId: string,
    customerId: string | null
  ): Promise<Purchase> {
    return ChargebeeReactNative.purchaseProduct(productId, customerId);
  }

  public static async retrieveSubscriptions(
    queryParams: SubscriptionsRequest
  ): Promise<Array<Subscription>> {
    return ChargebeeReactNative.retrieveSubscriptions(queryParams);
  }
}
