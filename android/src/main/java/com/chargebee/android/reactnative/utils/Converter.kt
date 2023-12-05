package com.chargebee.android.reactnative.utils

import com.chargebee.android.billingservice.OneTimeProductType
import com.chargebee.android.models.CBEntitlementsWrapper
import com.chargebee.android.models.CBProduct
import com.chargebee.android.models.CBRestoreSubscription
import com.chargebee.android.models.PricingPhase
import com.chargebee.android.reactnative.models.PurchaseResult
import com.chargebee.android.models.SubscriptionDetailsWrapper
import com.chargebee.android.models.SubscriptionOffer
import com.chargebee.android.network.CBAuthResponse
import com.chargebee.android.network.CBCustomer
import com.chargebee.android.reactnative.models.OneTimePurchaseResult
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
    val productMaps = item.toDictionary()
    productMaps.forEach{ writableArray.pushMap(it) }
  }
  return writableArray
}

internal fun CBProduct.toDictionary(): List<WritableMap> {
  val maps: ArrayList<WritableMap> = ArrayList()
  subscriptionOffers?.forEach{
    maps.add(it.toMap(this))
  }
  oneTimePurchaseOffer?.let { maps.add(it.toMap(this)) }
  return maps
}

fun SubscriptionOffer.toMap(product: CBProduct): WritableMap {
  val pricingPhase = pricingPhases.last()
  val writableMap: WritableMap = WritableNativeMap()
  writableMap.putString("id", product.id)
  writableMap.putString("type", product.type.value)
  writableMap.putString("baseProductId", basePlanId)
  writableMap.putString("offerToken", offerToken)
  writableMap.putString("title", product.title)
  writableMap.putDouble("price", pricingPhase.convertPriceAmountInMicros())
  writableMap.putString("currencyCode", pricingPhase.currencyCode)
  offerId?.let {
    writableMap.putMap("offer", offer())
  }
  return writableMap
}

private fun SubscriptionOffer.offer(): WritableMap {
  val pricingPhase = pricingPhases.first()
  val writableMap: WritableMap = WritableNativeMap()
  writableMap.putString("id", offerId.orEmpty())
  writableMap.putDouble("price", pricingPhase.convertPriceAmountInMicros())
  return writableMap
}

fun PricingPhase.convertPriceAmountInMicros(): Double {
  return amountInMicros / 1_000_000.0
}

private fun PricingPhase.toMap(product: CBProduct): WritableMap {
  val writableMap: WritableMap = WritableNativeMap()
  writableMap.putString("id", product.id)
  writableMap.putString("title", product.title)
  writableMap.putDouble("price", convertPriceAmountInMicros())
  writableMap.putString("currencyCode", currencyCode)
  return writableMap
}

internal fun convertPurchaseResultToDictionary(product: PurchaseResult, status: Boolean): WritableMap {
  val writableMap: WritableMap = WritableNativeMap()
  writableMap.putString("subscription_id", product.subscriptionId)
  writableMap.putString("plan_id", product.planId)
  writableMap.putBoolean("status", status)
  return writableMap
}

internal fun convertOneTimePurchaseResultToDictionary(product: OneTimePurchaseResult, status: Boolean): WritableMap {
  val writableMap: WritableMap = WritableNativeMap()
  writableMap.putString("invoice_id", product.invoiceId)
  writableMap.putString("charge_id", product.chargeId)
  writableMap.putString("customer_id", product.customerId)
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
  val firstName = customerMap.getString("firstName") ?: ""
  val lastName = customerMap.getString("lastName") ?: ""
  val email = customerMap.getString("email") ?: ""
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

internal fun convertRestoredSubscriptionsToDictionary(restoredSubscriptions: List<CBRestoreSubscription>): WritableArray {
  val writableArray: WritableArray = WritableNativeArray()
  for (item in restoredSubscriptions) {
    writableArray.pushMap(convertRestoredSubscriptionToDictionary(item))
  }
  return writableArray
}

internal fun convertRestoredSubscriptionToDictionary(restoredSubscription: CBRestoreSubscription): WritableMap {
  val writableMap: WritableMap = WritableNativeMap()
  writableMap.putString("subscriptionId", restoredSubscription.subscriptionId)
  writableMap.putString("planId", restoredSubscription.planId)
  writableMap.putString("storeStatus", restoredSubscription.storeStatus)
  return writableMap
}

internal fun convertEntitlementsToDictionary(entitlements: List<CBEntitlementsWrapper>): WritableArray {
  val writableArray: WritableArray = WritableNativeArray()
  for (item in entitlements) {
    writableArray.pushMap(convertEntitlementToDictionary(item))
  }
  return writableArray
}

fun convertEntitlementToDictionary(entitlementWrapper: CBEntitlementsWrapper): ReadableMap {
  val writableMap: WritableMap = WritableNativeMap()
  val entitlement = entitlementWrapper.subscription_entitlement
  writableMap.putString("subscriptionId", entitlement.subscription_id)
  writableMap.putString("featureId", entitlement.feature_id)
  writableMap.putString("featureName", entitlement.feature_name)
  writableMap.putString("featureDescription", entitlement.feature_description)
  writableMap.putString("featureType", entitlement.feature_type)
  writableMap.putString("value", entitlement.value)
  writableMap.putString("name", entitlement.name)
  writableMap.putBoolean("isOverridden", entitlement.is_overridden)
  writableMap.putBoolean("isEnabled", entitlement.is_enabled)
  return writableMap
}

internal fun convertProductTypeStringToEnum(productType: String): OneTimeProductType {
  return if (productType == OneTimeProductType.CONSUMABLE.value)
    OneTimeProductType.CONSUMABLE
  else
    OneTimeProductType.NON_CONSUMABLE
}
