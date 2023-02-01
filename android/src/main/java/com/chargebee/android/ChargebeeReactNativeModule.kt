package com.chargebee.android

import com.chargebee.android.billingservice.CBPurchase
import com.chargebee.android.exceptions.CBProductIDResult
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReadableMap

class ChargebeeReactNativeModule internal constructor(context: ReactApplicationContext) :
  ChargebeeReactNativeSpec(context) {

  override fun getName(): String {
    return NAME
  }

  @ReactMethod
  override fun configure(site: String, publishableApiKey: String, sdkKey: String) {
    Chargebee.configure(site, publishableApiKey, true, sdkKey)
  }

  @ReactMethod
  override fun retrieveProductIdentifiers(queryParams: ReadableMap, promise: Promise) {
    val formattedQueryParams = getFormattedQueryParams(queryParams)
    CBPurchase.retrieveProductIdentifers(formattedQueryParams) {
      when (it) {
        is CBProductIDResult.ProductIds -> {
            promise.resolve(it.IDs)
        }
        is CBProductIDResult.Error -> {
          promise.reject(it.exp.message, it.exp)
        }
      }
    }
  }

  private fun getFormattedQueryParams(queryParams: ReadableMap): Array<String> {
    if (queryParams != null)
      return arrayOf(queryParams.getString("limit") ?: "")
    return arrayOf("")
  }

  companion object {
    const val NAME = "ChargebeeReactNative"
  }
}
