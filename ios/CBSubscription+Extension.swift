//
//  CBSubscription+Extension.swift
//  ChargebeeReactNative
//
//  Created by cb-haripriyan on 22/02/23.
//

import Foundation
import Chargebee

extension Subscription {
    var asDictionary : [String: Any]? {
        var subscriptionDictionary: [String:Any] = [:]
        subscriptionDictionary["activatedAt"] = activatedAt
        subscriptionDictionary["status"] = status
        subscriptionDictionary["planAmount"] = planAmount
        subscriptionDictionary["id"] = id
        subscriptionDictionary["customerId"] = customerId
        subscriptionDictionary["currentTermEnd"] = currentTermEnd
        subscriptionDictionary["currentTermStart"] = currentTermStart
        subscriptionDictionary["planId"] = planId
        return subscriptionDictionary
    }
    
}
