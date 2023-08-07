//
//  CBPurchase.swift
//  ChargebeeReactNative
//
//  Created by cb-haripriyan on 17/02/23.
//

import Foundation


struct CBPurchaseResult: Codable {

    let subscriptionId: String
    let planId: String
    let status: Bool

    enum CodingKeys: String, CodingKey {
        case subscriptionId = "subscription_id"
        case planId = "plan_id"
        case status
    }
}

extension CBPurchaseResult {
    init(fromTuple: (status: Bool, subscriptionId: String?, planId: String?)) throws {
        guard let subscriptionId = fromTuple.subscriptionId, let planId = fromTuple.planId else {
            throw CBReactNativeError.systemError
        }
        self.subscriptionId = subscriptionId
        self.status = fromTuple.status
        self.planId = planId
    }
}

extension CBPurchaseResult {
    var asDictionary: [String:Any] {
        var dictionary: [String: Any] = [:]
        dictionary["subscription_id"] = self.subscriptionId
        dictionary["plan_id"] = self.planId
        dictionary["status"] = self.status
        return dictionary
    }
}


