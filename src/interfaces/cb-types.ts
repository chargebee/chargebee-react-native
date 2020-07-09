export interface CBCheckoutProps extends CBCheckoutParams {
  success: (hostedPageId: string) => void;
  step: (stepName: string) => void;
}

export type CBCheckoutParams = {
  site: string;
  planName: string;
} & CBCheckoutQueryParams;

export type CBCheckoutQueryParams = {
  addons?: Addon[];
  couponIds?: string[];
  customer?: Customer;
  subscription?: Subscription;
  billingAddress?: Address;
  shippingAddress?: Address;
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
