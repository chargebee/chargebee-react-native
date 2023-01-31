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
                    resolver(products)
                case let .failure(error as NSError):
                    rejecter("\(error.code)", error.localizedDescription, error)
            }
        }
        
    }
    
}
