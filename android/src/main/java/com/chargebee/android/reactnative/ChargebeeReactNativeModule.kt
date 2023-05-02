package com.chargebee.android.reactnative

import com.chargebee.android.Chargebee
import com.chargebee.android.reactnative.ChargebeeReactNativeSpec
import com.chargebee.android.ErrorDetail
import com.chargebee.android.billingservice.CBCallback
import com.chargebee.android.billingservice.CBPurchase
import com.chargebee.android.billingservice.GPErrorCode
import com.chargebee.android.exceptions.CBException
import com.chargebee.android.exceptions.CBProductIDResult
import com.chargebee.android.exceptions.ChargebeeResult
import com.chargebee.android.models.*
import com.chargebee.android.network.ReceiptDetail
import com.chargebee.android.reactnative.models.*
import com.chargebee.android.reactnative.utils.convertArrayToWritableArray
import com.chargebee.android.reactnative.utils.convertAuthenticationDetailToDictionary
import com.chargebee.android.reactnative.utils.convertListToWritableArray
import com.chargebee.android.reactnative.utils.convertPurchaseResultToDictionary
import com.chargebee.android.reactnative.utils.convertQueryParamsToArray
import com.chargebee.android.reactnative.utils.convertReadableArray
import com.chargebee.android.reactnative.utils.convertReadableMapToCustomer
import com.chargebee.android.reactnative.utils.convertSubscriptionsToDictionary
import com.facebook.react.bridge.*

class ChargebeeReactNativeModule internal constructor(context: ReactApplicationContext) :
  ChargebeeReactNativeSpec(context) {

  override fun getName(): String {
    return NAME
  }

  @ReactMethod
  override fun configure(
    site: String,
    publishableApiKey: String,
    sdkKey: String,
    promise: Promise
  ) {
    val packageName = currentActivity?.packageName ?: ""
    Chargebee.environment = "cb_rn_android_sdk"
    Chargebee.configure(site, publishableApiKey, true, sdkKey, packageName) {
      when (it) {
        is ChargebeeResult.Success -> {
          promise.resolve(convertAuthenticationDetailToDictionary(it.data))
        }
        is ChargebeeResult.Error -> {
          val messageUserInfo = it.exp.messageUserInfo()
          promise.reject(
            "${CBReactNativeError.INVALID_SDK_CONFIGURATION.code}",
            messageUserInfo.getString("message"),
            it.exp,
            messageUserInfo
          )
        }
      }
    }
  }

  @ReactMethod
  override fun retrieveProductIdentifiers(queryParams: ReadableMap, promise: Promise) {
    val formattedQueryParams = convertQueryParamsToArray(queryParams)
    CBPurchase.retrieveProductIdentifers(formattedQueryParams) {
      when (it) {
        is CBProductIDResult.ProductIds -> {
          val identifiers = it.IDs.toArray(arrayOf<String>())
          promise.resolve(convertArrayToWritableArray(identifiers))
        }
        is CBProductIDResult.Error -> {
          val messageUserInfo = it.exp.messageUserInfo()
          promise.reject("${it.exp.errorCode().code}", messageUserInfo.getString("message"), it.exp, messageUserInfo)
        }
      }
    }
  }

  @ReactMethod
  override fun retrieveProducts(productIds: ReadableArray, promise: Promise) {
    val activity = currentActivity
    activity?.let {
      CBPurchase.retrieveProducts(it, convertReadableArray(productIds),
        object : CBCallback.ListProductsCallback<ArrayList<CBProduct>> {
          override fun onSuccess(productDetails: ArrayList<CBProduct>) {
            if(productDetails.isEmpty()) {
              val productNotAvailableError = CBException(ErrorDetail(message = GPErrorCode.ProductUnavailable.errorMsg, httpStatusCode = CBReactNativeError.PRODUCT_NOT_AVAILABLE.code))
              val messageUserInfo = productNotAvailableError.messageUserInfo()
              promise.reject("${productNotAvailableError.httpStatusCode}", messageUserInfo.getString("message"), productNotAvailableError, productNotAvailableError.messageUserInfo())
            } else {
              promise.resolve(convertListToWritableArray(productDetails))
            }
          }

          override fun onError(error: CBException) {
            val cbReactNativeError = error.httpStatusCode?.let { it -> CBReactNativeError.fromBillingCode(it) } ?: CBReactNativeError.UNKNOWN
            val messageUserInfo = error.messageUserInfo()
            promise.reject("${cbReactNativeError.code}", messageUserInfo.getString("message"), error, messageUserInfo)
          }
        })
    }
  }

  @ReactMethod
  override fun purchaseProduct(productId: String, customer: ReadableMap, promise: Promise) {
    val activity = currentActivity
    activity?.let {
      val productIds = arrayListOf(productId)
      CBPurchase.retrieveProducts(it, productIds,
        object : CBCallback.ListProductsCallback<ArrayList<CBProduct>> {
          override fun onSuccess(productDetails: ArrayList<CBProduct>) {
            if (productDetails.size > 0) {
              CBPurchase.purchaseProduct(
                productDetails.first(),
                convertReadableMapToCustomer(customer),
                object : CBCallback.PurchaseCallback<String> {

                  override fun onSuccess(receiptDetail: ReceiptDetail, status: Boolean) {
                    val purchaseResult = PurchaseResult(receiptDetail, status)
                    promise.resolve(convertPurchaseResultToDictionary(purchaseResult, status))
                  }

                  override fun onError(error: CBException) {
                    val cbReactNativeError = error.httpStatusCode?.let { it -> CBReactNativeError.fromBillingCode(it) } ?: CBReactNativeError.UNKNOWN
                    val messageUserInfo = error.messageUserInfo()
                    promise.reject("${cbReactNativeError.code}", messageUserInfo.getString("message"), error, messageUserInfo)
                  }
                })
            } else {
              val productNotAvailableError = CBException(ErrorDetail(message = GPErrorCode.ProductUnavailable.errorMsg, httpStatusCode = CBReactNativeError.PRODUCT_NOT_AVAILABLE.code))
              val messageUserInfo = productNotAvailableError.messageUserInfo()
              promise.reject("${productNotAvailableError.httpStatusCode}", messageUserInfo.getString("message"), productNotAvailableError, productNotAvailableError.messageUserInfo())
            }

          }
          override fun onError(error: CBException) {
            val messageUserInfo = error.messageUserInfo()
            promise.reject("${CBReactNativeError.SYSTEM_ERROR.code}", messageUserInfo.getString("message"), error, messageUserInfo)
          }
        })
    }
  }

  @ReactMethod
  override fun retrieveSubscriptions(queryParams: ReadableMap, promise: Promise) {
    Chargebee.retrieveSubscriptions(queryParams.toMap()) {
      when (it) {
        is ChargebeeResult.Success -> {
          val subscriptions = (it.data as CBSubscription).list
          promise.resolve(convertSubscriptionsToDictionary(subscriptions))
        }
        is ChargebeeResult.Error -> {
          val messageUserInfo = it.exp.messageUserInfo()
          promise.reject(
            "${CBReactNativeError.INVALID_SDK_CONFIGURATION.code}",
            messageUserInfo.getString("message"),
            it.exp,
            messageUserInfo
          )
        }
      }
    }
  }

  companion object {
    const val NAME = "ChargebeeReactNative"
  }
}
