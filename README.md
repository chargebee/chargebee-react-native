# react-native-chargebee

React Native wrapper for rendering a Chargebee hosted checkout page within a WebView component.

## Installation

```sh
yarn add @chargebee/react-native-chargebee
```

## Dependencies

To successfully use this package, you need react native webview with version >= 8.1.1

`yarn add "react-native-webview"`

## Usage
The package comes with type definition which you can use to see the list of allowed props.

For `site`, use the Chargebee site name. For example, if the Chargebee domain is 'honey-comics.chargebee.com', then the site name is `honey-comics`.
For `planId`, use the Chargebee plan ID. For example, if the plan name is 'Annual Comic Subscription', the plan ID might be something like `annual-comic-subs`.  

```js
import { CheckoutCart } from "@chargebee/react-native-chargebee";

// ...

<CheckoutCart
  success={(hostedPageId: string) => successfulPurchase(hostedPageId)}
  step={(stepName: string) => handleStep(stepName)}
  site={site}
  planId={planId}
  couponIds={couponIds}
  addons={addons}
  customer={customer}
  subscription={subscription}
  billingAddress={billingAddress}
/>
```

## Example
The base repository includes a sample application that shows the props accepted by the component.

The [example app](/example/) showcases the various options that can be passed.

To install the base dependencies, run `yarn bootstrap` in the root directory:

```sh
yarn bootstrap
```

To start the packager:

```sh
yarn example start
```

To run the example app on Android:

```sh
yarn example android
```

To run the example app on iOS:

```sh
yarn example ios
```

## Properties
The properties that can be passed to the `CheckoutCart` component are:

| Prop  | Required  | Type | Description |
| :------------ |:---------------:| :---------------:| :-----|
| site | Yes | String | Name of the chargebee hosted site |
|planName | Yes | String | Deprecated since 1.0.7. Use planId instead ID of the plan user is purchasing |
|planId | Yes | String | ID of the plan user is purchasing |
| addons | No | [Addon[]](#addon) | Parameters for addons. Multiple addons can be passed. Fields are listed below. You can use the Chargebee List Addons API to retrieve all the addons for the site. Refer to [Addons](https://apidocs.chargebee.com/docs/api/addons?prod_cat_ver=1#list_addons) for sites on Product Catalog 1.0.|
| couponIds | No | String[] | Identifier of the coupon as a List. Coupon Codes can also be passed|
| customer | No | [Customer](#customer) | Details about the customer that needs to be prefilled in checkout. Fields are listed below |
| subscription | No | [Subscription](#subscription) | Details about the subscription. Fields listed below |
| billingAddress | No | [Address](#address) | Billing address of the customer. Fields listed below |
| shippingAddress | No | [Address](#address) | Shipping address of the customer. Fields listed below |
| success | Yes | [Success Callback](#successcallback) | Accepts a callback function which will be called upon successful completion of a purchase. You can use this to redirect the user out of the Chargebee Hosted webview and into a success screen controlled by the app.|
| step | Yes | [Step Callback](#stepcallback) | Accepts a callback function which will be called upon successful completion of each step of the purchase. For example, the callback is called when a user moves from Cart page to Account Info page, from Account Info page to Billing address page, and so on. You can use this to log or track the current progress of the user within the Chargebee Hosted webview, upto a successful purchase action.|

### Addon
| Prop  | Required  | Type | Description |
| :------------ |:---------------:| :---------------:| :-----|
| id | Yes | string | Identifier of the addon |
| quantity | No |  integer <br> default=1, min=1 | Addon quantity. Applicable only for the quantity based addons |


### Customer
| Prop  | Required  | Type | Description |
| :------------ |:---------------:| :---------------:| :-----|
| email | No | string <br> max chars=70 |  Email of the customer. Configured email notifications will be sent to this email.|
| firstName | No | string <br> max chars=150 |  First name of the customer. If not provided it will be got from contact information entered in the hosted page .|
| lastName | No | string <br> max chars=150 |  Last name of the customer. If not provided it will be got from contact information entered in the hosted page .|
| company | No | string <br> max chars=250 |  Company name of the customer.|
| locale | No | String <br> max chars=50 | Determines which region-specific language Chargebee uses to communicate with the customer. In the absence of the locale attribute, Chargebee will use your site's default language for customer communication. |
| phone | No | String <br> max chars=50 | Phone number of the customer. |
| vat_number | No | String <br> max chars=20 | VAT/ Tax registration number of the customer. [Learn more](https://www.chargebee.com/docs/tax.html#capture-tax-registration-number). |

### Subscription
| Prop  | Required  | Type | Description |
| :------------ |:---------------:| :---------------:| :-----|
| planQuantity | No | integer <br> default=1, min=1| Plan quantity for this subscription.|
| startDate | No | integer <br> timestamp(UTC) in seconds | Allows you to specify a future date or a past date on which the subscription starts.Past dates can be entered in case the subscription has already started. Any past date entered must be within the current billing cycle/plan term. The subscription will start immediately if this parameter is not passed. |

### Address
| Prop  | Required  | Type | Description |
| :------------ |:---------------:| :---------------:| :-----|
| firstName | No | String  <br> max chars=150 | First name. |
| lastName | No | String  <br> max chars=150 | Last name. |
| email | No | String  <br> max chars=70 | Email. |
| company | No | String  <br> max chars=250 | Company name. |
| phone | No | String  <br> max chars=50 | Phone number. |
| line1 | No | String  <br> max chars=150 | Address line 1. |
| line2 | No | String  <br> max chars=150 | Address line 2. |
| line3 | No | String  <br> max chars=150 | Address line 3. |
| city | No | String  <br> max chars=50 | City. |
| stateCode | No | String  <br> max chars=50 | The ISO 3166-2 state/province code without the country prefix. Currently supported for USA, Canada and India. <br> For instance, for Arizona ( USA), set the stateCode as AZ (not US-AZ). or, for Tamil Nadu (India), set the stateCode as TN (not IN-TN). or, for British Columbia (Canada), set the stateCode as BC (not CA-BC). <br> Note: If the 'stateCode' is specified, the 'state' attribute should not be provided as Chargebee will set the value automatically (for US, Canada, India). |
| state | No | String <br> max chars=50 | The state/province name. Use this to pass the state/province information for cases where 'stateCode' is not supported or cannot be passed. |
| zip | No | String  <br> max chars=20| Zip or Postal code. |
| country | No | String  <br> max chars=50| 2-letter ISO 3166 alpha-2 country code. |

### SuccessCallback
The success callback is a function of type:  ```(string) => void```. It takes in the `hostedPageId` from the Chargebee Hostedpage success screen.
Example:
```javascript
    success = {(hostedPageId: String) => onSuccessNavigateToHomePage(hostedPageId)}
    onSuccessNavigateToHomePage = (hostedPageId: string) => {
        console.log('Successfully purchased', hostedPageId);
        navigation.navigate('Home'); // Application's logic for handling redirection
    }; 
```

### StepCallback
The step callback is a function of type:  ```(string) => void```. It takes in the `stepName` for each of the Chargebee Hostedpage screens.
Example:
```javascript
    step = {(stepName: String) => onEachStepTrackUser(stepName)}
    onEachStepTrackUser = (stepName: string) => {
        console.log('User is currently in the step ', stepName);
        // Application's logic for logging/tracking user action
    }; 
 ```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

Chargebee is available under the MIT license. See the LICENSE file for more info.
