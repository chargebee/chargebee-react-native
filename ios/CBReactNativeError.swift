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
    case systemError = 100
//    case systemError = "System error"
}

