import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  configure(site: string, publishableApiKey: string, sdkKey: string): void;
}

export default TurboModuleRegistry.getEnforcing<Spec>('ChargebeeReactNative');
