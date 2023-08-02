package com.chargebee.android.reactnative.models

import com.chargebee.android.models.NonSubscription
import java.io.Serializable

data class OneTimePurchaseResult(
  val invoiceId: String,
  val chargeId: String,
  val customerId: String
) : Serializable {
  constructor(nonSubscription: NonSubscription, status: Boolean) : this(
    nonSubscription.invoiceId,
    nonSubscription.chargeId,
    nonSubscription.customerId
  )
}
