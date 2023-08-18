import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';
import type {
  AuthenticationDetail,
  Entitlement,
  Product,
  Purchase,
  RestoredSubscription,
  Subscription,
  OneTimePurchase,
} from './Purchases';

export interface Spec extends TurboModule {
  configure(
    site: string,
    publishableApiKey: string,
    sdkKey: string
  ): Promise<AuthenticationDetail>;
  retrieveProductIdentifiers(queryParams: Object): Promise<Array<string>>;
  retrieveProducts(productIds: Array<string>): Promise<Product>;
  purchaseProduct(productId: string, customer: Object): Promise<Purchase>;
  purchaseNonSubscriptionProduct(
    productId: string,
    productType: Object,
    customer: Object
  ): Promise<OneTimePurchase>;
  retrieveSubscriptions(queryParams: Object): Promise<Array<Subscription>>;
  restorePurchases(
    includeInactivePurchases: boolean,
    customer: Object
  ): Promise<Array<RestoredSubscription>>;
  validateReceipt(productId: string, customer: Object): Promise<Purchase>;
  validateReceiptForNonSubscriptions(
    productId: string,
    productType: Object,
    customer: Object
  ): Promise<OneTimePurchase>;
  retrieveEntitlements(
    entitlementsRequest: Object
  ): Promise<Array<Entitlement>>;
}

export default TurboModuleRegistry.getEnforcing<Spec>('ChargebeeReactNative');
