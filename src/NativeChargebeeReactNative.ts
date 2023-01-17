import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  multiply(a: number, b: number): Promise<number>;
  configure(site: string, publishableApiKey: string, sdkKey: string, packageName: string): void;
}

export default TurboModuleRegistry.getEnforcing<Spec>('ChargebeeReactNative');
