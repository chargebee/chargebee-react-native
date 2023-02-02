import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';
import type { Product } from '.';

export interface Spec extends TurboModule {
  configure(site: string, publishableApiKey: string, sdkKey: string): void;
  retrieveProductIdentifiers(queryParams: Object): Promise<Array<string>>;
  retrieveProducts(productIds: Array<string>): Promise<Product>;
}

export default TurboModuleRegistry.getEnforcing<Spec>('ChargebeeReactNative');
