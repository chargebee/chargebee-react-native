package com.chargebee.android.models

import com.facebook.react.bridge.ReadableMap

internal fun ReadableMap.toMap(): Map<String, String> {
  val map = HashMap<String, String>()
  this.entryIterator.forEach {
    map[it.key] = it.value.toString()
  }
  return map
}
