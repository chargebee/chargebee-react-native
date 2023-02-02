import { NativeModules } from "react-native";
import { configure } from '../index'


describe("Chargebee React Native", () => {

    it("configures the CB RN SDK with Site, Publishable API key and SDK Key", () => {
        const testSite = "testsite";
        const testPublishableApiKey = "test-PublishableApiKey";
        const sdkKey = "sdkKey";

        configure(testSite, testPublishableApiKey, sdkKey);
        
        expect(NativeModules.ChargebeeReactNative.configure).toHaveBeenCalledWith(testSite, testPublishableApiKey, sdkKey);
    });
});