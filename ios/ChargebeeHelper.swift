//
//  ChargebeeHelper.swift
//  ChargebeeReactNative
//
//  Created by cb-haripriyan on 27/01/23.
//

import Foundation
import Chargebee

public class ChargebeeHelper: NSObject {
    @objc public func configure(site: String, apiKey: String, sdkKey: String?) {
        Chargebee.configure(site: site, apiKey: apiKey, sdkKey: sdkKey)
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
        resolver("TO BE IMPLEMENTED")
    }
}
