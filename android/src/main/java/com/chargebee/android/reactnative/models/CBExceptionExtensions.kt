package com.chargebee.android.reactnative.models

import com.chargebee.android.exceptions.CBException
import com.facebook.react.bridge.WritableMap
import com.facebook.react.bridge.WritableNativeMap
import org.json.JSONException
import org.json.JSONObject

fun CBException.messageUserInfo(): WritableMap {
  try {
    val jsonObject = JSONObject(this.message)
    val messageUserInfo = WritableNativeMap()
    messageUserInfo.putString("message", jsonObject.optString("message"))
    messageUserInfo.putString("apiErrorCode", jsonObject.optString("api_error_code"))
    messageUserInfo.putInt("httpStatusCode", jsonObject.optInt("http_status_code"))
    return messageUserInfo
  } catch (e: JSONException) {
    val messageUserInfo = WritableNativeMap()
    messageUserInfo.putString("message", this.message)
    return messageUserInfo
  }

}

fun CBException.errorCode(): CBReactNativeError {
  val contains = this.message?.contains("Invalid catalog version", true)
  if(contains != null && contains) {
    return CBReactNativeError.INVALID_CATALOG_VERSION
  }
  return CBReactNativeError.UNKNOWN
}
