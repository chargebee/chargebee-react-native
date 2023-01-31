package com.chargebee.android

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReadableMap

abstract class ChargebeeReactNativeSpec internal constructor(context: ReactApplicationContext) :
  ReactContextBaseJavaModule(context) {
  abstract fun configure(site: String, publishableApiKey: String, sdkKey: String = "")
  abstract fun retrieveProductIdentifiers(queryParams: ReadableMap, promise: Promise)

}
