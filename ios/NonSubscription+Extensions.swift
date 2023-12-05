//
//  NonSubscription+Extensions.swift
//  ChargebeeReactNative
//
//  Created by Amutha C on 07/08/23.
//

import Foundation
import Chargebee

extension NonSubscription {
    var asDictionary: [String:Any] {
        var dictionary: [String: Any] = [:]
        dictionary["invoice_id"] = self.invoiceID
        dictionary["charge_id"] = self.chargeID
        dictionary["customer_id"] = self.customerID
        return dictionary
    }
}
