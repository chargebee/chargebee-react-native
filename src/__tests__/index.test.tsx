import { NativeModules } from 'react-native';
import Chargebee from '../index';

describe('Chargebee React Native', () => {
  it('configures the CB RN SDK with Site, Publishable API key and SDK Key', () => {
    const testSite = 'testsite';
    const testPublishableApiKey = 'test-PublishableApiKey';
    const sdkKey = 'sdkKey';

    Chargebee.configure({
      site: testSite,
      publishableApiKey: testPublishableApiKey,
      sdkKey: sdkKey,
    });

    expect(NativeModules.ChargebeeReactNative.configure).toHaveBeenCalledWith(
      testSite,
      testPublishableApiKey,
      sdkKey
    );
  });

  it('retrieve Product Identifiers for the configured SDK', async () => {
    const queryParams = new Map<string, string>();
    queryParams.set('limit', '100');
    await Chargebee.retrieveProductIdentifiers(queryParams);

    expect(
      NativeModules.ChargebeeReactNative.retrieveProductIdentifiers
    ).toBeCalledTimes(1);
    expect(
      NativeModules.ChargebeeReactNative.retrieveProductIdentifiers
    ).toHaveBeenCalledWith(queryParams);
  });
});
