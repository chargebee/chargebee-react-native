//
//  ChargebeeHelper.swift
//  ChargebeeReactNative
//
//  Created by CB-IT-01-1260 on 25/01/23.
//

import Foundation
import Chargebee

@objc class ChargebeeHelper: NSObject {
    @objc func configure(site: String, apiKey: String, sdkKey: String?) {
        Chargebee.configure(site: site, apiKey: apiKey, sdkKey: sdkKey)
        print("++++++++")
    }
}
