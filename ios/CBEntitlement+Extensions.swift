//
//  Entitlement+Extension.swift
//  ChargebeeReactNative
//
//  Created by cb-haripriyan on 14/07/23.
//

import Foundation
import Chargebee

extension Entitlement {
    var asDictionary: [String:Any] {
        var entitlement: [String: Any] = [:]
        entitlement["subscriptionId"] = self.subscriptionID
        entitlement["featureId"] = self.featureID
        entitlement["subscriptionId"] = self.subscriptionID
        entitlement["featureId"] = self.featureID
        entitlement["featureName"] = self.featureName
        entitlement["featureDescription"] = self.featureDescription
        entitlement["featureType"] = self.featureType
        entitlement["value"] = self.value
        entitlement["name"] = self.name
        entitlement["isOverridden"] = self.isOverridden
        entitlement["isEnabled"] = self.isEnabled
        return entitlement
    }
}
