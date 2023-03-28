//
//  CBError+Extensions.swift
//  ChargebeeReactNative
//
//  Created by cb-haripriyan on 20/02/23.
//

import Foundation
import Chargebee

enum CBReactNativeError: Int, Error {
    case unknown = 0
    case invalidSdkConfiguration = 1
    case invalidCatalogVersion = 2
    case invalidClient = 3
    case invalidOffer = 4
    case invalidPrice = 5
    case invalidPromoCode = 6
    case invalidPromoOffer = 7
    case invalidPurchase = 8
    case invalidSandbox = 9
    case networkConnectionFailed = 10
    case paymentFailed = 11
    case paymentNotAllowed = 12
    case privacyAcknowledgementRequired = 13
    case productNotAvailable = 14
    case cannotMakePayments = 15
    case invalidCustomerId = 16
    case invalidSDKKey = 17
    case noProductToRestore = 18
    case productIDNotFound = 19
    case productsNotFound = 20
    case skRequestFailed = 21
    case userCancelled = 22
    case resourceNotFound = 23
    case systemError = 100

}

extension CBReactNativeError {
    static func errorCode(purchaseError: CBPurchaseError) -> CBReactNativeError {
        switch purchaseError {
        case .productIDNotFound:
            return CBReactNativeError.productIDNotFound
        case .productsNotFound:
            return CBReactNativeError.productsNotFound
        case .skRequestFailed:
            return CBReactNativeError.skRequestFailed
        case .cannotMakePayments:
            return CBReactNativeError.cannotMakePayments
        case .noProductToRestore:
            return CBReactNativeError.noProductToRestore
        case .invalidSDKKey:
            return CBReactNativeError.invalidSDKKey
        case .invalidCustomerId:
            return CBReactNativeError.invalidCustomerId
        case .invalidCatalogVersion:
            return CBReactNativeError.invalidCatalogVersion
        case .userCancelled:
            return CBReactNativeError.userCancelled
        case .paymentFailed:
            return CBReactNativeError.paymentFailed
        case .invalidPurchase:
            return CBReactNativeError.invalidPurchase
        case .invalidClient:
            return CBReactNativeError.invalidClient
        case .networkConnectionFailed:
            return CBReactNativeError.networkConnectionFailed
        case .privacyAcknowledgementRequired:
            return CBReactNativeError.privacyAcknowledgementRequired
        case .unknown:
            return CBReactNativeError.unknown
        case .paymentNotAllowed:
            return CBReactNativeError.paymentNotAllowed
        case .productNotAvailable:
            return CBReactNativeError.productNotAvailable
        case .invalidOffer:
            return CBReactNativeError.invalidOffer
        case .invalidPromoCode:
            return CBReactNativeError.invalidPromoCode
        case .invalidPrice:
            return CBReactNativeError.invalidPrice
        case .invalidPromoOffer:
            return CBReactNativeError.invalidPromoOffer
        case .invalidSandbox:
            return CBReactNativeError.invalidSandbox
        }
    }
}
