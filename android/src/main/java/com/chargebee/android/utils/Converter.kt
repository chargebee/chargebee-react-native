package com.chargebee.android.utils

import com.facebook.react.bridge.WritableArray
import com.facebook.react.bridge.WritableNativeArray

internal fun convertArrayToWritableArray(array: Array<Any?>): WritableArray {
  val writableArray: WritableArray = WritableNativeArray()
  for (item in array) {
    when (item) {
      null -> writableArray.pushNull()
      is String -> writableArray.pushString(item)
    }
  }
  return writableArray
}
