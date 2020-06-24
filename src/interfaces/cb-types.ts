export interface CBCheckoutProps extends CBCheckoutParams {
  onSuccess: (hostedPageId: string) => void;
  step: (stepName: string) => void;
}

export interface CBCheckoutParams {
  site: string;
  planName: string;
  billingCycles?: number;
  mandatoryAddonsToRemove?: string[];
  termsToCharge?: number;
  billingAlignmentMode?: BillingAlignment;
  couponIds?: string[];
  passThruContent?: string;
  subscription?: Subscription;
  customer?: Customer;
  card?: Card;
  billingAddress?: Address;
  shippingAddress?: Address;
  contractTerm?: ContractTerm;
  addons?: Addon[];
}

export enum BillingAlignment {
  IMMEDIATE = 'immediate',
  DELAYED = 'delayed',
}

export enum AutoCollection {
  ON = 'on',
  OFF = 'off',
}

export enum Taxability {
  TAXABLE = 'taxable',
  EXEMPT = 'exempt',
}

export enum ValidationStatus {
  NOT_VALIDATED = 'not_validated',
  VALID = 'valid',
  PARTIALLY_VALID = 'partially_valid',
  INVALID = 'invalid',
}

export type Customer = {
  id?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  company?: string;
  taxability?: Taxability;
  locale?: string;
  phone?: string;
  vatNumber?: string;
  consolidatedInvoicing?: boolean;
};

export type CustomField = {
  [x: string]: string;
};

export interface Subscription {
  id?: string;
  planId?: string;
  planQuantity?: number;
  planUnitPrice?: number;
  setupFee?: number;
  trialEnd?: number;
  startDate?: number;
  autoCollection?: AutoCollection;
  invoiceNotes?: string;
  affiliateToken?: string;
  contractTermBillingCycleOnRenewal?: number;
}

export interface Address {
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
  validationStatus?: ValidationStatus;
}

export interface Addon {
  id?: string;
  quantity?: number;
  unitPrice?: string;
  billingCycles?: number;
}

export interface Card {
  gatewayAccountId: string;
}

export interface ContractTerm {
  actionAtTermEnd?: ActionAtTermEnd;
  cancellationCutoffPeriod?: number;
}

export enum ActionAtTermEnd {
  RENEW = 'renew',
  EVERGREEN = 'evergreen',
  CANCEL = 'cancel',
}
