export enum ChargebeeErrorCode {
  UNKNOWN = 0,
  INVALID_SDK_CONFIGURATION = 1000,
  INVALID_CATALOG_VERSION = 1001,
  CANNOT_MAKE_PAYMENTS = 1002,
  NO_PRODUCT_TO_RESTORE = 1003,
  INVALID_OFFER = 2001,
  INVALID_PURCHASE = 2002,
  INVALID_SANDBOX = 2003,
  NETWORK_ERROR = 2004,
  PAYMENT_FAILED = 2005,
  PAYMENT_NOT_ALLOWED = 2006,
  PRODUCT_NOT_AVAILABLE = 2007,
  PURCHASE_NOT_ALLOWED = 2008,
  PURCHASE_CANCELLED = 2009,
  STORE_PROBLEM = 2010,
  INVALID_RECEIPT = 2011,
  REQUEST_FAILED = 2012,
  PRODUCT_PURCHASED_ALREADY = 2013,
  NO_RECEIPT = 2014,
  REFRESH_RECEIPT_FAILED = 2015,
  RESTORE_FAILED = 2016,
  SYSTEM_ERROR = 3000,
}

export interface ChargebeeError {
  code: ChargebeeErrorCode;
  message: string;
  userInfo?: ChargebeeErrorDetail;
}

export interface ChargebeeErrorDetail {
  message: string | null;
  apiErrorCode: string | null;
  httpStatusCode: number;
}
