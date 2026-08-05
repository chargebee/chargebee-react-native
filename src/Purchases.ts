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
  // For Android, returns the Base plan ID
  readonly baseProductId: string | null;
  // For Android, returns the Offer Details if present
  readonly offer: Offer | null;
  // For Android, returns the Offer Token
  readonly offerToken: string | null;
  readonly title: string;
  readonly price: number;
  readonly currencyCode: string;
}

export interface Offer {
  readonly id: string;
  readonly price: number;
}

export interface Purchase {
  readonly subscriptionId: string;
  readonly planId: string;
  readonly status: string;
}

export interface OneTimePurchase {
  readonly invoiceId: string;
  readonly chargeId: string;
  readonly customerId: string;
}

export enum ProductType {
  UNKNOWN = 'unknown',
  CONSUMABLE = 'consumable',
  NON_CONSUMABLE = 'non_consumable',
  NON_RENEWING_SUBSCRIPTION = 'non_renewing_subscription',
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

export interface EntitlementsRequest {
  subscriptionId: string;
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
  readonly subscriptionId: string;
  readonly planId: string;
  readonly storeStatus: StoreStatus;
}

export interface Entitlement {
  readonly subscriptionId: string;
  readonly featureId: string;
  readonly featureName: string;
  readonly featureDescription: string;
  readonly featureType: string;
  readonly value: string;
  readonly name: string;
  readonly isOverridden: boolean;
  readonly isEnabled: boolean;
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
