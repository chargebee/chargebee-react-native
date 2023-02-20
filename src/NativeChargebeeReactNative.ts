import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';
import type { Product, Purchase } from '.';

export interface Spec extends TurboModule {
  configure(site: string, publishableApiKey: string, sdkKey: string): void;
  retrieveProductIdentifiers(queryParams: Object): Promise<Array<string>>;
  retrieveProducts(productIds: Array<string>): Promise<Product>;
  purchaseProduct(productId: string, customerId: string): Promise<Purchase>;
}

export default TurboModuleRegistry.getEnforcing<Spec>('ChargebeeReactNative');
