import { NativeModules, Platform } from 'react-native';
import type { Double } from 'react-native/Libraries/Types/CodegenTypes';

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

export interface ChargebeeConfig {
  site: string;
  publishableApiKey: string;
  androidSdkKey: string;
  iOsSdkKey: string;
}

export interface Product {
  readonly id: string;
  readonly title: string;
  readonly price: string;
  readonly currencyCode: string;
}

export interface Purchase {
  readonly subscriptionId: string;
  readonly planId: string;
  readonly status: string;
}

export interface Subscription {
  readonly activatedAt: Double | null;
  readonly status: string | null;
  readonly planAmount: Double | null;
  readonly id: string | null;
  readonly customerId: string | null;
  readonly currentTermEnd: Double | null;
  readonly currentTermStart: Double | null;
  readonly planId: string | null;
}

export interface SubscriptionsRequest {
  customer_id?: string;
  subscription_id?: string;
  status?: string | null;
}

export default class Chargebee {

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

  public static retrieveSubscriptions(queryParams: SubscriptionsRequest): Promise<Array<Subscription>> {
    return ChargebeeReactNative.retrieveSubscriptions(queryParams)
  }
}

function sdkKeyForPlatform(androidSdkKey: string, iOsSdkKey: string): string {
  if (Platform.OS === 'ios') {
    return iOsSdkKey;
  } else if (Platform.OS === 'android') {
    return androidSdkKey;
  }
  throw new Error('Platform not supported.');
}
