import { NativeModules } from 'react-native';

NativeModules.ChargebeeReactNative = {
  configure: jest.fn(),
  retrieveProductIdentifiers: jest.fn(),
};
