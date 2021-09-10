export interface CBCheckoutProps extends CBCheckoutParams {
  success: (hostedPageId: string) => void;
  step: (stepName: string) => void;
}

export type CBCheckoutParams = {
  site: string;
  /** @deprecated since 1.0.7. Use `planId` instead. **/
  planName?: string;
  planId?: string;
} & CBCheckoutQueryParams;

export type CBCheckoutQueryParams = {
  items?: Item[];
  addons?: Addon[];
  couponIds?: string[];
  customer?: Customer;
  subscription?: Subscription;
  billingAddress?: Address;
  shippingAddress?: Address;
};

export interface CBSelfServeProps extends CBSelfServeParams {
  success: (hostedPageId: string) => void;
  step: (stepName: string) => void;
}

export type CBSelfServeParams = {
  site: string;
} & CBSelfServeQueryParams;

export type CBSelfServeQueryParams = {
  customer?: Customer;
};

export type Customer = {
  id?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  company?: string;
  locale?: string;
  phone?: string;
  vatNumber?: string;
  customFields?: CustomField[];
};

export type CustomField = {
  name: string;
  value: string;
};

export type Subscription = {
  planQuantity?: number;
  startDate?: number;
  customFields?: CustomField[];
};

export type Address = {
  firstName?: string;
  lastName?: string;
  email?: string;
  company?: string;
  phone?: string;
  line1?: string;
  line2?: string;
  line3?: string;
  city?: string;
  stateCode?: string;
  state?: string;
  zip?: string;
  country?: string;
};

export type Addon = {
  id?: string;
  quantity?: number;
};

export type Item = {
  planPricePointId: string;
  quantity?: number;
};
