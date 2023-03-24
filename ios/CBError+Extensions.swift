//
//  CBError+Extensions.swift
//  ChargebeeReactNative
//
//  Created by cb-haripriyan on 06/03/23.
//

import Foundation
import Chargebee

extension CBError {
    
    var asNSError: NSError {
        switch self {
        case .invalidRequest(let response), .operationFailed(let response), .paymentFailed(let response):
            var userInfo: [String: Any] = [:]
            userInfo["message"] = response.message
            userInfo["type"] = response.type
            userInfo["apiErrorCode"] = response.apiErrorCode
            userInfo["param"] = response.param
            userInfo["httpStatusCode"] = response.httpStatusCode
            return NSError.init(domain: "CBError", code: httpStatusCode, userInfo: userInfo)
        }

    }
    
}
