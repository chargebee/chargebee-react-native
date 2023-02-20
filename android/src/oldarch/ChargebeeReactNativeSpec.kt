package com.chargebee.android

import com.facebook.react.bridge.*

abstract class ChargebeeReactNativeSpec internal constructor(context: ReactApplicationContext) :
  ReactContextBaseJavaModule(context) {
  abstract fun configure(site: String, publishableApiKey: String, sdkKey: String = "")
  abstract fun retrieveProductIdentifiers(queryParams: ReadableMap, promise: Promise)
  abstract fun retrieveProducts(productIds: ReadableArray, promise: Promise)
  abstract fun purchaseProduct(productId: String, customerId: String, promise: Promise)

}
