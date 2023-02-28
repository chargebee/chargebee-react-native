import { Platform } from 'react-native';
import type { Double } from 'react-native/Libraries/Types/CodegenTypes';

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

export function sdkKeyForPlatform(
  androidSdkKey: string,
  iOsSdkKey: string
): string {
  if (Platform.OS === 'ios') {
    return iOsSdkKey;
  } else if (Platform.OS === 'android') {
    return androidSdkKey;
  }
  throw new Error('Platform not supported.');
}
