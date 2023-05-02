//
//  CBAuthenticationStatus+Extensions.swift
//  ChargebeeReactNative
//
//  Created by cb-haripriyan on 03/03/23.
//

import Foundation
import Chargebee

extension CBAuthenticationStatus {
    var asDictionary: [String:Any] {
        var authenticationStatus: [String: Any] = [:]
        authenticationStatus["appId"] = self.details.appId
        authenticationStatus["status"] = self.details.status
        authenticationStatus["version"] = self.details.version?.rawValue
        return authenticationStatus
    }
}
