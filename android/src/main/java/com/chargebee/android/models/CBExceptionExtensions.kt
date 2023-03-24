package com.chargebee.android.models

import com.chargebee.android.exceptions.CBException
import com.facebook.react.bridge.WritableMap
import com.facebook.react.bridge.WritableNativeMap
import org.json.JSONObject

fun CBException.messageUserInfo(): WritableMap {
  val jsonObject = JSONObject(this.message)
  val messageUserInfo = WritableNativeMap()
  messageUserInfo.putString("message", jsonObject.getString("message"))
  messageUserInfo.putString("apiErrorCode", jsonObject.getString("api_error_code"))
  messageUserInfo.putString("httpStatusCode", jsonObject.getString("http_status_code"))
  return messageUserInfo
}
