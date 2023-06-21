//
//  ChargebeeHelper.swift
//  ChargebeeReactNative
//
//  Created by cb-haripriyan on 27/01/23.
//

import Foundation
import Chargebee

@objc(ChargebeeHelper)
public class ChargebeeHelper: NSObject {

    @objc public static let shared = ChargebeeHelper()
    private override init() {}
    
    @objc public func configure(site: String, apiKey: String, sdkKey: String?, resolver: @escaping RCTPromiseResolveBlock, rejecter: @escaping RCTPromiseRejectBlock) {
        Chargebee.environment = "cb_rn_ios_sdk"
        Chargebee.configure(site: site, apiKey: apiKey, sdkKey:sdkKey) { result in
            switch result {
            case .success(let status):
                resolver(status.asDictionary)
            case .error(let error):
                rejecter("\(CBReactNativeError.invalidSdkConfiguration.rawValue)", error.errorDescription, error.asNSError)
            }
        }
    }
    
    @objc public func retrieveProductIdentifiers(queryParams: Dictionary<String, String>, resolver: @escaping RCTPromiseResolveBlock, rejecter: @escaping RCTPromiseRejectBlock) {
        CBPurchase.shared.retrieveProductIdentifers(queryParams: queryParams) { result in
            switch result {
                case let .success(products):
                    resolver(products.ids)
                case let .failure(error):
                    if let error = error as? CBPurchaseError {
                        reject(withPurchaseError: error, using: rejecter)
                    } else {
                        rejecter("\(CBReactNativeError.unknown.rawValue)", error.localizedDescription, error)
                    }
            }
        }
    }
    
    @objc public func retrieveProducts(productIds: Array<String>, resolver: @escaping RCTPromiseResolveBlock, rejecter: @escaping RCTPromiseRejectBlock) {
        CBPurchase.shared.retrieveProducts(withProductID: productIds) { result in
            switch result {
                case let .success(products):
                    let formattedProducts = products.map { $0.asDictionary }
                    resolver(formattedProducts)
                case let .failure(error):
                    reject(withPurchaseError: error, using: rejecter)
            }
        }
    }
    
    @objc public func purchaseProduct(productId: String, customer: Dictionary<String, String>, resolver: @escaping RCTPromiseResolveBlock, rejecter: @escaping RCTPromiseRejectBlock) {
        let customer = CBCustomer.fromDictionary(customer: customer)
        CBPurchase.shared.retrieveProducts(withProductID: [productId]) { result in
            DispatchQueue.main.async {
                switch result {
                case let .success(products):
                    let  product: CBProduct = products.self.first!;
                    CBPurchase.shared.purchaseProduct(product: product, customer: customer) { result in
                        switch result {
                        case .success(let result):
                            do {
                                let purchasedProduct = try CBPurchaseResult(fromTuple: result)
                                resolver(purchasedProduct.asDictionary)
                            } catch (let error) {
                                if let error = error as? CBPurchaseError {
                                    reject(withPurchaseError: error, using: rejecter)
                                } else {
                                    rejecter("\(CBReactNativeError.unknown.rawValue)", error.localizedDescription, error)
                                }
                            }
                        case .failure(let error):
                            switch error {
                            case let error as CBPurchaseError:
                                reject(withPurchaseError: error, using: rejecter)
                            case let error as CBError:
                                switch error {
                                case .invalidRequest:
                                    rejecter("\(CBReactNativeError.invalidReceipt.rawValue)", error.errorDescription, error.asNSError)
                                case .operationFailed:
                                    rejecter("\(CBReactNativeError.systemError.rawValue)", error.errorDescription, error.asNSError)
                                default:
                                    rejecter("\(CBReactNativeError.unknown.rawValue)", error.localizedDescription, error)
                                }
                            default:
                                rejecter("\(CBReactNativeError.unknown.rawValue)", error.localizedDescription, error)
                            }
                        
                        }
                    }
                case let .failure(error):
                    reject(withPurchaseError: error, using: rejecter)
                }
            }
        }
    }
    
    @objc public func retrieveSubscriptions(queryParams: Dictionary<String, String>, resolver: @escaping RCTPromiseResolveBlock, rejecter: @escaping RCTPromiseRejectBlock) {
        
        Chargebee.shared.retrieveSubscriptions(queryParams: queryParams) { result in
            switch result {
            case let .success(list):
                let data = list.map { $0.subscription.asDictionary }
                resolver(data)
            case let .error(error):
                // retrieveSubscriptions throw the error when the API returns an empty list
                if (error.errorDescription?.contains("Subscription Not found") ?? false) {
                    resolver([])
                } else {
                    rejecter("\(CBReactNativeError.invalidSdkConfiguration.rawValue)", error.errorDescription, error.asNSError)
                }
            }
        }
    }
    
    @objc public func restorePurchases(includeInactivePurchases: Bool, resolver: @escaping RCTPromiseResolveBlock, rejecter: @escaping RCTPromiseRejectBlock) {
        
        CBPurchase.shared.restorePurchases(includeInActiveProducts: includeInactivePurchases) { result in
            switch result {
            case .success(let subscriptions):
                let inAppSubscriptions = subscriptions.map { $0.asDictionary }
                resolver(inAppSubscriptions)
            case .failure(let error):
                let restoreError = error.asNSError
                rejecter("\(restoreError.code)", error.errorDescription, restoreError)
            }
        }
    }
    
    @objc public func validateReceipt(productId: String, customer: Dictionary<String, String>, resolver: @escaping RCTPromiseResolveBlock, rejecter: @escaping RCTPromiseRejectBlock) {
        CBPurchase.shared.retrieveProducts(withProductID: [productId]) { result in
            DispatchQueue.main.async {
                switch result {
                case let .success(products):
                    let  product: CBProduct = products.self.first!;
                    CBPurchase.shared.validateReceipt(product) { result in
                        switch result {
                        case .success(let result):
                            do {
                                let purchasedProduct = try CBPurchaseResult(fromTuple: result)
                                resolver(purchasedProduct.asDictionary)
                            } catch (let error) {
                                if let error = error as? CBReactNativeError {
                                    rejecter("\(error.rawValue)", error.localizedDescription, error)
                                } else {
                                    rejecter("\(CBReactNativeError.unknown.rawValue)", error.localizedDescription, error)
                                }
                            }
                        case .failure(let error):
                            switch error {
                            case let error as CBError:
                                switch error {
                                case .invalidRequest:
                                    rejecter("\(CBReactNativeError.invalidReceipt.rawValue)", error.errorDescription, error.asNSError)
                                case .operationFailed:
                                    rejecter("\(CBReactNativeError.systemError.rawValue)", error.errorDescription, error.asNSError)
                                default:
                                    rejecter("\(CBReactNativeError.unknown.rawValue)", error.localizedDescription, error)
                                }
                            default:
                                rejecter("\(CBReactNativeError.unknown.rawValue)", error.localizedDescription, error)
                            }
                        
                        }
                    }
                case let .failure(error):
                    reject(withPurchaseError: error, using: rejecter)
                }
            }
        }
    }
}

fileprivate func reject(withPurchaseError error: CBPurchaseError, using rejecter: RCTPromiseRejectBlock) {
    let purchaseError = NSError(domain: "StoreError",
                                code: CBReactNativeError.errorCode(purchaseError: error).rawValue,
                                userInfo: error.userInfo)
    rejecter("\(purchaseError.code)", error.localizedDescription, purchaseError)
}
