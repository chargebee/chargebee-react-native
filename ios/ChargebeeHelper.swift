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
    
}
