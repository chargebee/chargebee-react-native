Chargebee React Native
======================

This is the official Software Development Kit (SDK) for Chargebee React Native. This SDK makes it efficient and comfortable to build an impressive subscription experience in your React Native App.

Requirements
------------

The following requirements must be set up prior to installing Chargebee's React Native SDK

-   Recommended React Native version >= 0.71.0. Minimum supported React Native version 0.67
-   Requirements for Android https://github.com/chargebee/chargebee-android#requirements
-   Requirements for iOS https://github.com/chargebee/chargebee-ios#requirements

Installation
------------

If you are using yarn, you can add the SDK by using the below command.

```sh
yarn add @chargebee/react-native-chargebee@beta
```

For iOS, perform `pod install` after adding the SDK, to install the corresponding cocoapod package.


Example project
---------------

This is an optional step that helps you to verify the SDK implementation using this example project. You can download or clone the example project via GitHub.

To run the example project, follow these steps.

-   Clone the repo - https://github.com/chargebee/chargebee-react-native.

-   To install the base dependencies, run `yarn bootstrap` in the root directory

-   To run the example app on Android, run `yarn example android`.

-   To run the example app on iOS, run `yarn example ios`.


## Configuring SDK

**Prerequisites**
Before configuring the Chargebee ReactNative SDK for syncing In-App Purchases, follow these steps.

1.  **iOS**: [Integrate](https://www.chargebee.com/docs/2.0/mobile-app-store-connect.html "https://www.chargebee.com/docs/2.0/mobile-app-store-connect.html") the [Apple App Store account](https://appstoreconnect.apple.com/login "https://appstoreconnect.apple.com/login") with your [Chargebee site](https://app.chargebee.com/login "https://app.chargebee.com/login").   
 **Android**: [Integrate](https://www.chargebee.com/docs/2.0/mobile-playstore-connect.html "https://www.chargebee.com/docs/2.0/mobile-playstore-connect.html") [Google Play Store account](https://play.google.com/console/about/ "https://play.google.com/console/about/") with your [Chargebee site](https://app.chargebee.com/login "https://app.chargebee.com/login").
2.  **iOS**: On the**Sync Overview** pageof theweb app, click **View Keys** and use the value of generated [**App ID**](https://www.chargebee.com/docs/1.0/mobile-app-store-product-iap.html#app-id "https://www.chargebee.com/docs/1.0/mobile-app-store-product-iap.html#app-id") as the **SDK Key**.    
**Android**: On the **Sync Overview** page of the web app, click **Set up notifications** and use the generated [**App ID**](https://www.chargebee.com/docs/1.0/mobile-playstore-notifications.html#app-id "https://www.chargebee.com/docs/1.0/mobile-playstore-notifications.html#app-id") value as the **SDK Key**.
3.  On the Chargebee site, navigate to **Configure Chargebee** > [**API Keys**](https://www.chargebee.com/docs/2.0/api_keys.html#create-an-api-key "https://www.chargebee.com/docs/2.0/api_keys.html#create-an-api-key") to create a new **Publishable API Key** or use an existing [**Publishable API Key**](https://www.chargebee.com/docs/2.0/api_keys.html#types-of-api-keys_publishable-key "https://www.chargebee.com/docs/2.0/api_keys.html#types-of-api-keys_publishable-key").

**Note:** During the publishable API key creation you must allow **read-only** access to plans/items otherwise this key will not work in the following snippet. Read [more](https://www.chargebee.com/docs/2.0/api_keys.html#types-of-api-keys_publishable-key "https://www.chargebee.com/docs/2.0/api_keys.html#types-of-api-keys_publishable-key").

Initialize the Chargebee ReactNative SDK with your Chargebee site, Publishable API Key, and SDK Keys by including the following snippets in your app delegate during app startup.

```ts
import Chargebee from '@chargebee/react-native-chargebee';

Chargebee.configure({
      site: "SITE_NAME",
      publishableApiKey: "API-KEY",
      androidSdkKey: "Android SDK Key",
      iOsSdkKey: "iOS SDK Key",
    });
```

## Integrating In-App Purchases

This section describes how to use the SDK to integrate In-App Purchase information. For details on In-App Purchase, read [more](https://www.chargebee.com/docs/2.0/mobile_subscriptions.html "https://www.chargebee.com/docs/2.0/mobile_subscriptions.html").

#### Get all IAP Product Identifiers from Chargebee

Every In-App Purchase subscription product that you configure in your account, can be configured in Chargebee as a Plan. Start by retrieving the IAP Product IDs from your Chargebee account using the following function.

```ts
import Chargebee from '@chargebee/react-native-chargebee';

const queryParams = new Map<string, string>();
queryParams.set('limit', '100');
try {
    const result: Array<string> = await Chargebee.retrieveProductIdentifiers(queryParams);
    console.log(result);
} catch (error) {
    console.error(error);
}
```
For example, query parameters can be passed as **"limit": "100"**.

#### Get IAP Products

Retrieve the IAP Product objects with Product IDs using the following function.

```ts
import Chargebee, { Product } from '@chargebee/react-native-chargebee';

try {
      const result: Array<Product> = await Chargebee.retrieveProducts(["Product ID from Google or Apple"]);
      console.log(result);
    } catch (error) {
      console.error(error);
    }
```
You can present any of the above products to your users for them to purchase.

#### Buy or Subscribe Product

Pass the product and customer identifier to the following function when your customer chooses the product to purchase.

`customerId` -  **Optional parameter**. Although this is an optional parameter, we recommend passing customerId if it is available before user subscribes on your App. Passing this parameter ensures that customerId in your database matches with the customerId in Chargebee.
In case this parameter is not passed, then the **customerId** will be the same as the **SubscriptionId** created in Chargebee.

```ts
import Chargebee, { Purchase } from '@chargebee/react-native-chargebee';

try {
    const result: Purchase = await Chargebee.purchaseProduct("product-id", 'customer-id');
    console.log(result);
} catch (error) {
    console.error(error);
}
```

The above function will handle the purchase against Apple App Store or Google Play Store and send the in-app purchase receipt for server-side receipt verification to your Chargebee account. Use the Subscription ID returned by the above function to check for Subscription status on Chargebee and confirm the access - granted or denied.

#### Get Subscription Status for Existing Subscribers using Query Parameters

Use this method to check the subscription status of a subscriber who has already purchased the product.

Use SubscriptionsRequest - Subscription ID, Customer ID, or Status for checking the Subscription status on Chargebee and confirm the access - granted or denied.

```ts
import Chargebee, { SubscriptionsRequest, Subscription } from '@chargebee/react-native-chargebee';

try {
    const queryParams: SubscriptionsRequest = {customer_id : 'customer_id', subscription_id : 'subscription_id', status: 'active'}
    const subscriptions: Subscription[] = await Chargebee.retrieveSubscriptions(queryParams);
    console.log(subscriptions);
} catch (error) {
    console.error(error);
}
    
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

Chargebee is available under the MIT license. See the LICENSE file for more info.
