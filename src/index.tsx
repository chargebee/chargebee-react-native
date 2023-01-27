import { NativeModules, Platform } from 'react-native';

const LINKING_ERROR =
  `The package '@chargebee/react-native-chargebee' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

// @ts-expect-error
const isTurboModuleEnabled = global.__turboModuleProxy != null;

const ChargebeeReactNativeModule = isTurboModuleEnabled
  ? require('./NativeChargebeeReactNative').default
  : NativeModules.ChargebeeReactNative;

const ChargebeeReactNative = ChargebeeReactNativeModule
  ? ChargebeeReactNativeModule
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );


export function configure(site: string, publishableApiKey: string, sdkKey?: string) {
  return ChargebeeReactNative.configure(site, publishableApiKey, sdkKey);
}
