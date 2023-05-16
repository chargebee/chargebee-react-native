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
    
    // MARK: Chargebee Errors
    case invalidSdkConfiguration = 1000
    case invalidCatalogVersion = 1001
    case cannotMakePayments = 1002
    case noProductToRestore = 1003
    
    // MARK: Store Errors
    case invalidOffer = 2001
    case invalidPurchase = 2002
    case invalidSandbox = 2003
    case networkError = 2004
    case paymentFailed = 2005
    case paymentNotAllowed = 2006
    case productNotAvailable = 2007
    case purchaseNotAllowed = 2008
    case purchaseCancelled = 2009
    case storeProblem = 2010
    case invalidReceipt = 2011
    case requestFailed = 2012
    case productPurchasedAlready = 2013
    
    // MARK: Restore Error
    case noReceipt = 2014
    case refreshReceiptFailed = 2015
    case restoreFailed = 2016
    
    // MARK: General Errors
    case systemError = 3000
    
}

extension CBReactNativeError {
    static func errorCode(purchaseError: CBPurchaseError) -> CBReactNativeError {
        switch purchaseError {
        case .productIDNotFound, .productsNotFound, .productNotAvailable:
            return CBReactNativeError.productNotAvailable
        case .skRequestFailed:
            return CBReactNativeError.requestFailed
        case .cannotMakePayments:
            return CBReactNativeError.cannotMakePayments
        case .noProductToRestore:
            return CBReactNativeError.noProductToRestore
        case .invalidSDKKey:
            return CBReactNativeError.invalidSdkConfiguration
        case .invalidCustomerId:
            return CBReactNativeError.invalidSdkConfiguration
        case .invalidCatalogVersion:
            return CBReactNativeError.invalidCatalogVersion
        case .userCancelled:
            return CBReactNativeError.purchaseCancelled
        case .paymentFailed:
            return CBReactNativeError.paymentFailed
        case .invalidPurchase:
            return CBReactNativeError.invalidPurchase
        case .invalidClient, .privacyAcknowledgementRequired:
            return CBReactNativeError.purchaseNotAllowed
        case .networkConnectionFailed:
            return CBReactNativeError.networkError
        case .unknown:
            return CBReactNativeError.unknown
        case .paymentNotAllowed:
            return CBReactNativeError.paymentNotAllowed
        case .invalidOffer, .invalidPrice, .invalidPromoCode, .invalidPromoOffer:
            return CBReactNativeError.invalidOffer
        case .invalidSandbox:
            return CBReactNativeError.invalidSandbox
        }
    }
    

}
