package com.chargebee.android.reactnative.utils

import com.android.billingclient.api.SkuDetails
import com.chargebee.android.models.CBProduct
import com.chargebee.android.reactnative.models.PurchaseResult
import com.chargebee.android.models.SubscriptionDetailsWrapper
import com.chargebee.android.network.CBAuthResponse
import com.chargebee.android.network.CBCustomer
import com.facebook.react.bridge.*


internal fun convertArrayToWritableArray(array: Array<String>): WritableArray {
  val writableArray: WritableArray = WritableNativeArray()
  for (item in array) {
    when (item) {
      is String -> writableArray.pushString(item)
    }
  }
  return writableArray
}

internal fun convertReadableArray(readableArray: ReadableArray): ArrayList<String> {
  val items: ArrayList<String> = ArrayList()
  for (i in 0 until readableArray.size()) {
    items.add(readableArray.getString(i))
  }
  return items
}

internal fun convertListToWritableArray(array: List<CBProduct>): WritableArray {
  val writableArray: WritableArray = WritableNativeArray()
  for (item in array) {
    writableArray.pushMap(convertProductToDictionary(item))
  }
  return writableArray
}

internal fun convertProductToDictionary(product: CBProduct): WritableMap {
  val writableMap: WritableMap = WritableNativeMap()
  writableMap.putString("id", product.productId)
  writableMap.putString("title", product.productTitle)
  writableMap.putDouble("price", convertPriceAmountInMicros(product.skuDetails))
  writableMap.putString("currencyCode", product.skuDetails.priceCurrencyCode)
  return writableMap
}

fun convertPriceAmountInMicros(skuDetails: SkuDetails): Double {
  return skuDetails.priceAmountMicros / 1_000_000.0
}

internal fun convertPurchaseResultToDictionary(product: PurchaseResult, status: Boolean): WritableMap {
  val writableMap: WritableMap = WritableNativeMap()
  writableMap.putString("subscription_id", product.subscriptionId)
  writableMap.putString("plan_id", product.planId)
  writableMap.putBoolean("status", status)
  return writableMap
}

internal fun convertSubscriptionsToDictionary(subscriptions: List<SubscriptionDetailsWrapper>): WritableArray {
  val writableArray: WritableArray = WritableNativeArray()
  for (item in subscriptions) {
    writableArray.pushMap(convertSubscriptionToDictionary(item))
  }
  return writableArray
}

internal fun convertSubscriptionToDictionary(subscriptionDetailsWrapper: SubscriptionDetailsWrapper): WritableMap {
  val writableMap: WritableMap = WritableNativeMap()
  val subscriptionDetail = subscriptionDetailsWrapper.cb_subscription
  subscriptionDetail.activated_at?.toDouble()?.let { writableMap.putDouble("activatedAt", it) }
  subscriptionDetail.status?.let { writableMap.putString("status", it) }
  subscriptionDetail.plan_amount?.toDouble()?.let { writableMap.putDouble("planAmount", it) }
  subscriptionDetail.subscription_id?.let { writableMap.putString("id", it) }
  subscriptionDetail.customer_id?.let { writableMap.putString("customerId", it) }
  subscriptionDetail.current_term_end?.toDouble()?.let { writableMap.putDouble("currentTermEnd", it) }
  subscriptionDetail.current_term_start?.toDouble()?.let { writableMap.putDouble("currentTermStart", it) }
  subscriptionDetail.plan_id?.let { writableMap.putString("planId", it) }
  return writableMap
}

internal fun convertQueryParamsToArray(queryParams: ReadableMap): Array<String> {
  if (queryParams != null)
    return arrayOf(queryParams.getString("limit") ?: "")
  return arrayOf("")
}

internal fun convertReadableMapToCustomer(customerMap: ReadableMap): CBCustomer {
  val id = customerMap.getString("id")
  val firstName = customerMap.getString("firstName")
  val lastName = customerMap.getString("lastName")
  val email = customerMap.getString("email")
  return CBCustomer(id, firstName, lastName, email)
}

internal fun convertAuthenticationDetailToDictionary(authResponseData: Any): WritableMap {
  val writableMap: WritableMap = WritableNativeMap()
  if(authResponseData is CBAuthResponse) {
    writableMap.putString("appId", authResponseData?.in_app_detail?.app_id)
    writableMap.putString("version", authResponseData?.in_app_detail?.product_catalog_version)
    writableMap.putString("status", authResponseData?.in_app_detail?.status)
  }
  return writableMap
}
