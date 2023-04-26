//
//  CBProduct+Converters.swift
//  ChargebeeReactNative
//
//  Created by cb-haripriyan on 03/02/23.
//

import Foundation
import Chargebee

extension CBProduct {
    var asDictionary: [String:Any] {
        let skProduct = self.product
        var productDictionary: [String: Any] = [:]
        productDictionary["id"] = skProduct.productIdentifier
        productDictionary["title"] = skProduct.localizedTitle
        productDictionary["price"] = skProduct.price.doubleValue
        productDictionary["currencyCode"] = skProduct.priceLocale.currencyCode
        return productDictionary
    }
}
