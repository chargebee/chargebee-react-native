package com.chargebee.android.reactnative.models

import com.android.billingclient.api.BillingClient
import com.android.billingclient.api.BillingClient.BillingResponseCode.*

enum class CBReactNativeError(val code: Int) {

  UNKNOWN(0),

  // Chargebee Errors
  INVALID_SDK_CONFIGURATION(1000),
  INVALID_CATALOG_VERSION(1001),
  CANNOT_MAKE_PAYMENTS(1002),
  NO_PRODUCT_TO_RESTORE(1003),
  INVALID_RESOURCE(1004),

  // Store Errors
  INVALID_OFFER(2001),
  INVALID_PURCHASE(2002),
  INVALID_SANDBOX(2003),
  NETWORK_ERROR(2004),
  PAYMENT_FAILED(2005),
  PAYMENT_NOT_ALLOWED(2006),
  PRODUCT_NOT_AVAILABLE(2007),
  PURCHASE_NOT_ALLOWED(2008),
  PURCHASE_CANCELLED(2009),
  STORE_PROBLEM(2010),
  INVALID_RECEIPT(2011),
  REQUEST_FAILED(2012),
  PRODUCT_PURCHASED_ALREADY(2013),

  // Restore Error
  NO_RECEIPT(2014),
  REFRESH_RECEIPT_FAILED(2015),
  RESTORE_FAILED(2016),

  // General Errors
  SYSTEM_ERROR(3000);

  companion object {
    fun fromBillingCode(code: Int) : CBReactNativeError {
      return when (code) {
        FEATURE_NOT_SUPPORTED, BILLING_UNAVAILABLE, ITEM_NOT_OWNED -> PURCHASE_NOT_ALLOWED
        ERROR, SERVICE_UNAVAILABLE, SERVICE_DISCONNECTED, SERVICE_TIMEOUT -> STORE_PROBLEM
        USER_CANCELED -> PURCHASE_CANCELLED
        ITEM_UNAVAILABLE -> PRODUCT_NOT_AVAILABLE
        DEVELOPER_ERROR -> INVALID_PURCHASE
        ITEM_ALREADY_OWNED -> PRODUCT_PURCHASED_ALREADY
        else -> UNKNOWN
      }
    }
  }
}
