import { Platform } from 'react-native';

/**
 * Chargebee SDK Config parameters.
 */
export interface ChargebeeConfig {
  site: string;
  publishableApiKey: string;
  androidSdkKey: string;
  iOsSdkKey: string;
}

export interface AuthenticationDetail {
  appId: string | null;
  status: string | null;
  version: string | null;
}

export interface Product {
  readonly id: string;
  readonly title: string;
  readonly price: number;
  readonly currencyCode: string;
}

export interface Purchase {
  readonly subscriptionId: string;
  readonly planId: string;
  readonly status: string;
}

export interface Subscription {
  readonly id: string;
  readonly customerId: string;
  readonly status: string;
  readonly planId: string | null;
  readonly planAmount: number | null;
  readonly activatedAt: number | null;
  readonly currentTermStart: number | null;
  readonly currentTermEnd: number | null;
}

export interface SubscriptionsRequest {
  customer_id?: string;
  subscription_id?: string;
  status?: string;
}

export interface ProductIdentifiersRequest {
  limit?: string;
  offset?: string;
}

export interface Customer {
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
}

export enum StoreStatus {
  ACTIVE,
  IN_TRIAL,
  CANCELLED,
  PAUSED,
}

export interface RestoredSubscription {
  subscriptionId: string;
  planId: string;
  storeStatus: StoreStatus;
}

export interface Entitlement {
  subscriptionId: string;
  featureId: string;
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
