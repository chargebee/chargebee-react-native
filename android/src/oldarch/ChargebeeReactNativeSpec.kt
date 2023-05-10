package com.chargebee.android.reactnative

import com.facebook.react.bridge.*

abstract class ChargebeeReactNativeSpec internal constructor(context: ReactApplicationContext) :
  ReactContextBaseJavaModule(context) {
  abstract fun configure(site: String, publishableApiKey: String, sdkKey: String = "", promise: Promise)
  abstract fun retrieveProductIdentifiers(queryParams: ReadableMap, promise: Promise)
  abstract fun retrieveProducts(productIds: ReadableArray, promise: Promise)
  abstract fun purchaseProduct(productId: String, customer: ReadableMap, promise: Promise)
  abstract fun retrieveSubscriptions(queryParams: ReadableMap, promise: Promise)

  abstract fun restorePurchases(includeInActiveProducts: Boolean, promise: Promise)

}
