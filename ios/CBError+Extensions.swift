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
        case .invalidRequest(let response), .operationFailed(let response),
                .paymentFailed(let response), .serverError(let response):
            var userInfo: [String: Any] = [:]
            userInfo["message"] = response.message
            userInfo["type"] = response.type
            userInfo["apiErrorCode"] = response.apiErrorCode
            userInfo["param"] = response.param
            userInfo["httpStatusCode"] = response.httpStatusCode
            return NSError.init(domain: "ChargebeeError", code: httpStatusCode, userInfo: userInfo)

        }

    }
    
}

extension CBPurchaseError {
    var userInfo: [String: Any] {
        var userInfo: [String: Any] = [:]
        userInfo["message"] = self.errorDescription
        return userInfo
    }
}

extension RestoreError {
    
    var reactNativeError: CBReactNativeError {
        switch self {
        case .invalidReceiptData, .invalidReceiptURL:
            return .invalidReceipt
        case .noReceipt:
            return .noReceipt
        case .refreshReceiptFailed:
            return .refreshReceiptFailed
        case .restoreFailed:
            return .restoreFailed
        case .noProductsToRestore:
            return .noProductToRestore
        case .serviceError:
            return .systemError
        }
    }
    
    var asNSError: NSError {
        return NSError(domain: "RestoreError", code: self.reactNativeError.rawValue, userInfo: self.userInfo)
    }
    
    var userInfo: [String: Any] {
        var userInfo: [String: Any] = [:]
        userInfo["message"] = self.errorDescription
        return userInfo
    }
}
