import { NativeModules } from 'react-native';

NativeModules.ChargebeeReactNative = {
  configure: jest.fn(),
  retrieveProductIdentifiers: jest.fn(),
  retrieveProducts: jest.fn(),
  purchaseProduct: jest.fn(),
  retrieveSubscriptions: jest.fn(),
  restorePurchases: jest.fn(),
};
