//
//  CBError+Extensions.swift
//  ChargebeeReactNative
//
//  Created by cb-haripriyan on 06/03/23.
//

import Foundation
import Chargebee

extension CBError {
    var payload: String {
        let encodedData = try? JSONEncoder().encode(self)
        if let encodedData = encodedData {
            return String(data: encodedData,
                          encoding: .utf8) ?? self.localizedDescription
        }
        return self.localizedDescription
        
    }
}

extension CBError: Encodable {
    enum CodingKeys: String, CodingKey {
        case message = "message"
        case type = "type"
        case apiErrorCode = "api_error_code"
        case param = "param"
        case httpStatusCode = "http_status_code"
        
        }
    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        switch self {
        case .invalidRequest(let response), .operationFailed(let response), .paymentFailed(let response):
            try container.encode(response.message, forKey: .message)
            try container.encode(response.type, forKey: .type)
            try container.encode(response.apiErrorCode, forKey: .apiErrorCode)
            try container.encode(response.param, forKey: .param)
            try container.encode(response.httpStatusCode, forKey: .httpStatusCode)
        }
    }
}
