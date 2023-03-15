package com.chargebee.android.models

import com.chargebee.android.exceptions.CBException
import org.json.JSONObject

fun CBException.payload(): String {
  var payload = mapOf<String, Any?>(
    "httpStatusCode" to this.httpStatusCode,
    "message" to this.message,
    "type" to this.type,
    "apiErrorCode" to this.apiErrorCode,
    "param" to this.param
  )
  return JSONObject(payload).toString()
}
