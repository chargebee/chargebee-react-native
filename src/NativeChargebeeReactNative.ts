import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';
import type {
  AuthenticationDetail,
  Entitlement,
  Product,
  Purchase,
  RestoredSubscription,
  Subscription,
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
  retrieveSubscriptions(queryParams: Object): Promise<Array<Subscription>>;
  restorePurchases(
    includeInactivePurchases: boolean
  ): Promise<Array<RestoredSubscription>>;
  validateReceipt(productId: string, customer: Object): Promise<Purchase>;
  retrieveEntitlements(
    entitlementsRequest: Object
  ): Promise<Array<Entitlement>>;
}

export default TurboModuleRegistry.getEnforcing<Spec>('ChargebeeReactNative');
