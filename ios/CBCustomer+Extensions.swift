//
//  CBCustomer+Extensions.swift
//  ChargebeeReactNative
//
//  Created by CB-IT-01-1260 on 06/04/23.
//

import Foundation
import Chargebee

extension CBCustomer {
    static func fromDictionary(customer: Dictionary<String, String>) -> CBCustomer {
        let id = customer["id"]
        let firstName = customer["firstName"]
        let lastName = customer["lastName"]
        let email = customer["email"]
        return CBCustomer(customerID: id, firstName: firstName, lastName: lastName, email: email)
    }
}
