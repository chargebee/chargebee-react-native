import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';
import type {
  AuthenticationDetail,
  Product,
  Purchase,
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
  purchaseProduct(productId: string, customerId: string): Promise<Purchase>;
  retrieveSubscriptions(queryParams: Object): Promise<Array<Subscription>>;
}

export default TurboModuleRegistry.getEnforcing<Spec>('ChargebeeReactNative');
