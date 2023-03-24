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
        Chargebee.configure(site: site, apiKey: apiKey, sdkKey:sdkKey) { result in
            switch result {
            case .success(let status):
                resolver(status.asDictionary)
            case .error(let error):
                rejecter("\(error.httpStatusCode)", error.errorDescription, error.asNSError)
            }
        }
    }
    
    @objc public func retrieveProductIdentifiers(queryParams: Dictionary<String, String>, resolver: @escaping RCTPromiseResolveBlock, rejecter: @escaping RCTPromiseRejectBlock) {
        CBPurchase.shared.retrieveProductIdentifers(queryParams: queryParams) { result in
            switch result {
                case let .success(products):
                    resolver(products.ids)
                case let .failure(error as NSError):
                    rejecter("\(error.code)", error.localizedDescription, error)
            }
        }
    }
    
    @objc public func retrieveProducts(productIds: Array<String>, resolver: @escaping RCTPromiseResolveBlock, rejecter: @escaping RCTPromiseRejectBlock) {
        CBPurchase.shared.retrieveProducts(withProductID: productIds) { result in
            switch result {
                case let .success(products):
                    let formattedProducts = products.map { $0.asDictionary }
                    resolver(formattedProducts)
                case let .failure(error as NSError):
                    rejecter("\(error.code)", error.localizedDescription, error)
            }
        }
    }
    
    @objc public func purchaseProduct(productId: String, customerId: String, resolver: @escaping RCTPromiseResolveBlock, rejecter: @escaping RCTPromiseRejectBlock) {
        CBPurchase.shared.retrieveProducts(withProductID: [productId]) { result in
            DispatchQueue.main.async {
                switch result {
                case let .success(products):
                    let  product: CBProduct = products.self.first!;
                    CBPurchase.shared.purchaseProduct(product: product, customerId: customerId) { result in
                        switch result {
                        case .success(let result):
                            do {
                                let purchasedProduct = try CBPurchaseResult(fromTuple: result)
                                resolver(purchasedProduct.asDictionary)
                            } catch (let error as NSError) {
                                rejecter("\(error.code)", error.localizedDescription, error)
                            }
                        case .failure(let error as NSError):
                            rejecter("\(error.code)", error.localizedDescription, error)
                        }
                    }
                case let .failure(error as NSError):
                    rejecter("\(error.code)", error.localizedDescription, error)
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
            case let .error(error as NSError):
                rejecter("\(error.code)", error.localizedDescription, error)
            }
        }
    }
}
