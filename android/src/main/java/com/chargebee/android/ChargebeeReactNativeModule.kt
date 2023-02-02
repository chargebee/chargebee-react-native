package com.chargebee.android

import com.chargebee.android.billingservice.CBPurchase
import com.chargebee.android.exceptions.CBProductIDResult
import com.chargebee.android.utils.convertArrayToWritableArray
import com.facebook.react.bridge.*

class ChargebeeReactNativeModule internal constructor(context: ReactApplicationContext) :
  ChargebeeReactNativeSpec(context) {

  override fun getName(): String {
    return NAME
  }

  @ReactMethod
  override fun configure(site: String, publishableApiKey: String, sdkKey: String) {
    val packageName = currentActivity?.packageName ?: ""
    Chargebee.configure(site, publishableApiKey, true, sdkKey, packageName)
  }

  @ReactMethod
  override fun retrieveProductIdentifiers(queryParams: ReadableMap, promise: Promise) {
    val formattedQueryParams = getFormattedQueryParams(queryParams)
    CBPurchase.retrieveProductIdentifers(formattedQueryParams) {
      when (it) {
        is CBProductIDResult.ProductIds -> {
          promise.resolve(convertArrayToWritableArray(it.IDs.toArray()))
        }
        is CBProductIDResult.Error -> {
          promise.reject(it.exp.message, it.exp)
        }
      }
    }
  }

  override fun retrieveProducts(productIds: ReadableArray, promise: Promise) {
    TODO("Not yet implemented")
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
