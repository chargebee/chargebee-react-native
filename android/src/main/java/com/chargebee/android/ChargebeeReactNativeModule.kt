package com.chargebee.android

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise

class ChargebeeReactNativeModule internal constructor(context: ReactApplicationContext) :
  ChargebeeReactNativeSpec(context) {

  override fun getName(): String {
    return NAME
  }

  @ReactMethod
  override fun configure(site: String, publishableApiKey: String, sdkKey: String) {
    Chargebee.configure(site, publishableApiKey, true, sdkKey)
  }

  companion object {
    const val NAME = "ChargebeeReactNative"
  }
}
