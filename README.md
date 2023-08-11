![Latest Release](https://github.com/chargebee/chargebee-react-native/actions/workflows/release.yml/badge.svg?branch=master)

Introduction
======================

This is Chargebee’s React Native Software Development Kit (SDK). This SDK makes it efficient and comfortable to build a seamless subscription experience in your React Native App.

Post-installation, initialization, and authentication with the Chargebee site, this SDK will support the following process.

 - **Sync In-App Subscriptions with Chargebee**: Integrate your App developed on React Native with Chargebee to process and track in-app subscriptions of the [Apple App Store](https://appstoreconnect.apple.com/login) and [Google Play Store](https://play.google.com/console/about/) on your Chargebee account. Thus you can create a single source of truth for subscriptions across Apple, Google, and Web stores. Use this if you are selling digital goods or services or are REQUIRED to use Apple's and Google's in-app purchases as per their app review guidelines ([Apple](https://developer.apple.com/app-store/review/guidelines/) and [Google](https://support.google.com/googleplay/android-developer/answer/9858738)). **For SDK methods to work, ensure that prerequisites (Apple and Google) are configured in Chargebee**.

**_Note: If you are using the React native wrapper for performing web checkouts for physical goods, follow the set up for our 1.x SDK [here](https://github.com/chargebee/chargebee-react-native/tree/1.x)._**


Requirements
------------

The following requirements must be set up before installing Chargebee’s React Native SDK.

-    Recommended React Native version 0.71.0 or higher. The minimum supported React Native version is 0.67.
-    Requirements for Android https://github.com/chargebee/chargebee-android#requirements
-    Requirements for iOS https://github.com/chargebee/chargebee-ios#requirements



Installation
------------

To use Chargebee SDK in your React Native app, follow the below step.

```sh
yarn add @chargebee/react-native-chargebee
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

This section describes how to use the SDK to integrate In-App Purchase information. For details on In-App Purchase, read [more](https://www.chargebee.com/docs/2.0/mobile_subscriptions.html).

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

Retrieve the IAP `Product` objects with Product IDs using the following function.

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

Pass the product and customer to the following function when your customer chooses the product to purchase.

`id` - **Optional parameter**. Although this is an optional parameter, we recommend passing it if available, before the user subscribes to your App. Passing this parameter ensures that the customer id in your database matches that in Chargebee. In case this parameter is not passed, then the id will be the same as the SubscriptionId created in Chargebee.

`firstName` - **Optional parameter**. Contains the first name of the customer.

`lastName` - **Optional parameter**. Contains the last name of the customer.

`email` - **Optional parameter**. Contains the email of the customer.



```ts
import Chargebee, {
    Purchase,
    Customer
} from '@chargebee/react-native-chargebee';
const customer: Customer = {
    id: 'id',
    firstName: 'fname',
    lastName: 'lname',
    email: 'fname@domain.com',
};
try {
    const result: Purchase = await Chargebee.purchaseProduct("product-id", customer);
    console.log(result);
} catch (error) {
    console.error(error);
}
```

The above function will handle the purchase against Apple App Store or Google Play Store and send the in-app purchase receipt for server-side receipt verification to your Chargebee account. Use the Subscription ID returned by the above function to check for Subscription status on Chargebee and confirm the access - **_granted or denied_**.

### One-Time Purchases
The `purchaseNonSubscriptionProduct` function handles the one-time purchase against Apple App Store and Google Play Store and then sends the IAP receipt for server-side receipt verification to your Chargebee account. Post verification a Charge corresponding to this one-time purchase will be created in Chargebee. The Apple App Store supports three types of one-time purchases `consumable`, `non_consumable` and `non_renewing_subscription`. The Google Play Store supports two types of one-time purchases `consumable` and `non_consumable`.

```ts
import Chargebee, {
    OneTimePurchase,
    Customer
} from '@chargebee/react-native-chargebee';
const customer: Customer = {
    id: 'id',
    firstName: 'fname',
    lastName: 'lname',
    email: 'fname@domain.com',
};
const productType = ProductType.NON_CONSUMABLE
try {
    const result: OneTimePurchase = await Chargebee.purchaseNonSubscriptionProduct("product-id", productType, customer);
    console.log(result);
} catch (error) {
    console.error(error);
}
```

The given code defines a function named `purchaseNonSubscriptionProduct` in the Chargebee class, which takes three input parameters:

- `product`: An instance of `Product` class, representing the product to be purchased from the Apple App Store or Google Play Store.
- `customer`: Optional. An instance of `CBCustomer` class, initialized with the customer's details such as `customerId`, `firstName`, `lastName`, and `email`.
- `productType`: An enum instance of `productType` type, indicating the type of product to be purchased. It can be either `consumable`, or `non_consumable`, or `non_renewing_subscription`. Note that `non_renewing_subscription` is supported only in Apple App Store.

The function is called asynchronously, and it returns a `Result` object with a `success` or `failure` case, as mentioned are below.
- If the purchase is successful, it returns `OneTimePurchase` object. which includes the `invoiceId`, `chargeId`, and `customerId` associated with the purchase.
- If there is any failure during the purchase, it returns error object that can be used to handle the error.


#### Get Subscription Status for Existing Subscribers using Query Parameters

Use the method, `retrieveSubscriptions` to check the subscription status of a subscriber who has already purchased the product.

Use `SubscriptionsRequest` with query parameters- Subscription ID, Customer ID, or Status for checking the subscription status on Chargebee and confirming the access - **_granted or denied*_*.

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

#### Retrieve Entitlements of a Subscription

Use the Subscription ID for fetching the list of [entitlements](https://www.chargebee.com/docs/2.0/entitlements.html) associated with the subscription.

```ts
const request: EntitlementsRequest = {
    subscriptionId: 'subscription-id',
};
try {
    const entitlements: Array<Entitlement> = await Chargebee.retrieveEntitlements(request);
} catch (error) {
    console.log(error);
}
```

**Note**: Entitlements feature is available only if your Chargebee site is on [Product Catalog 2.0](https://www.chargebee.com/docs/2.0/product-catalog.html).


#### Restore Purchases

The `restorePurchases()` function helps to recover your app user's previous purchases without making them pay again. Sometimes, your app user may want to restore their previous purchases after switching to a new device or reinstalling your app. You can use the `restorePurchases()` function to allow your app user to easily restore their previous purchases.

To retrieve **inactive** purchases along with the **active** purchases for your app user, you can call the `restorePurchases()` function with the `includeInactivePurchases` parameter set to true. If you only want to restore active subscriptions, set the parameter to false. Here is an example of how to use the restorePurchases() function in your code with the `includeInactivePurchases` parameter set to true.

```ts
import Chargebee, { RestoredSubscription } from '@chargebee/react-native-chargebee';

try {
    const restoredSubscriptions: RestoredSubscription[] = await Chargebee.restorePurchases(true);
    console.log(restoredSubscriptions);
} catch (error) {
    console.error(error);
}

```

##### Error Handling

In the event of any errors/failures, the React native SDK will return an error object, which has the below format.
`code` -  **number**. Chargebee Error code.
`message` - **string**. Error description.
`userInfo` - **(ChargebeeErrorDetail)** __Optional Object__. Contains additional error information.

The `ChargebeeErrorDetail` object is the below format:
`apiErrorCode` - **string** __Optional__. Error code from Chargebee backend.
`httpStatusCode` - **number** __Optional__. Http status code from Chargebee backend.
`message` - **string** __Optional__. Error description.

###### Example
```ts
{
    "code": "1000",
    "message": "Sorry, we couldn't find the site abc-test",
    "userInfo": {
        "apiErrorCode": "site_not_found",
        "httpStatusCode": 404,
        "message": "Sorry, we couldn't find the site abc-test"
    }
}
```

###### Error Codes

These are the possible error codes and their descriptions:

| Error Code    | Description                             |
|---------------|-----------------------------------------|
|	1000		|	INVALID_SDK_CONFIGURATION			  |
|	1001		|	INVALID_CATALOG_VERSION				  |
|	1002		|	CANNOT_MAKE_PAYMENTS				  |
|	1003		|	NO_PRODUCT_TO_RESTORE				  |
|	1004		|	INVALID_RESOURCE			     	  |
|	2001		|	INVALID_OFFER				          |
|	2002		|	INVALID_PURCHASE				      |
|	2003		|	INVALID_SANDBOX				          |
|	2004		|	NETWORK_ERROR				          |
|	2005		|	PAYMENT_FAILED				          |
|	2006		|	PAYMENT_NOT_ALLOWED				      |
|	2007		|	PRODUCT_NOT_AVAILABLE				  |
|	2008		|	PURCHASE_NOT_ALLOWED				  |
|	2009		|	PURCHASE_CANCELLED				      |
|	2010		|	STORE_PROBLEM				          |
|	2011		|	INVALID_RECEIPT				          |
|	2012		|	REQUEST_FAILED				          |
|	2013		|	PRODUCT_PURCHASED_ALREADY		      |
|	3000		|	SYSTEM_ERROR				          |
|	0			|	UNKNOWN				                  |


#### Synchronization of Apple App Store/Google Play Store Purchases with Chargebee through Receipt Validation
Receipt validation is crucial to ensure that the purchases made by your users are synced with Chargebee. In rare cases, when a purchase is made at the Apple App Store/Google Play Store, and the network connection goes off or the server was not responding, the purchase details may not be updated in Chargebee. In such cases, you can use a retry mechanism by following these steps:

* Save the product identifier in the cache once the purchase is initiated and clear the cache once the purchase/retry validation is successful.
* When the purchase is completed at Apple App Store/Google Play Store but not synced with Chargebee, retrieve the product from the cache and initiate validateReceipt() by passing `productId` and `Customer` as input. This will validate the receipt and sync the purchase in Chargebee as a subscription.

Use the function available for the retry mechanism.
##### Function for validating the Subscriptions receipt

``` ts
import Chargebee from '@chargebee/react-native-chargebee';

try {
    const purchase = await Chargebee.validateReceipt(productId, customer)
} catch (error) {
    console.log("error", error);
}
```

##### Function for validating the One-Time Purchases receipt

``` ts
import Chargebee, {
    OneTimePurchase,
    Customer
} from '@chargebee/react-native-chargebee';
const customer: Customer = {
    id: 'id',
    firstName: 'fname',
    lastName: 'lname',
    email: 'fname@domain.com',
};
const productType = ProductType.NON_CONSUMABLE
try {
    const result: OneTimePurchase = await Chargebee.validateReceiptForNonSubscriptions(productId, productType, customer)
} catch (error) {
    console.log("error", error);
}
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

Chargebee is available under the MIT license. See the LICENSE file for more info.
