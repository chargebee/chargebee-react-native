//
//  CBInAppSubscription+Extensions.swift
//  ChargebeeReactNative
//
//  Created by cb-haripriyan on 11/05/23.
//

import Foundation
import Chargebee

extension InAppSubscription {
    var asDictionary: [String:Any] {
        var inAppSubscription: [String: Any] = [:]
        inAppSubscription["subscriptionId"] = self.subscriptionID
        inAppSubscription["planId"] = self.planID
        inAppSubscription["storeStatus"] = self.storeStatus.rawValue
        return inAppSubscription
    }
}
