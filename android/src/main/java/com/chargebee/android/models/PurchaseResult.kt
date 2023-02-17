package com.chargebee.android.models

import com.chargebee.android.network.ReceiptDetail
import java.io.Serializable

data class PurchaseResult (
  val subscriptionId: String?,
  val planId: String?,
  val status: Boolean
) : Serializable {
  constructor(receiptDetail: ReceiptDetail, status: Boolean) : this(receiptDetail.subscription_id, receiptDetail.plan_id, status)
}
