package com.chargebee.android.utils

import com.chargebee.android.models.CBProduct
import com.facebook.react.bridge.*


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
  writableMap.putString("price", product.productPrice)
  writableMap.putString("currencyCode", product.skuDetails.priceCurrencyCode)
  return writableMap
}
