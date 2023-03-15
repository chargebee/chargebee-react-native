export interface ChargebeeError {
  code: string;
  message: string;
  domain: string;
  userInfo: string;
}

export interface ChargebeeErrorDetail {
  message: string | null;
  type: string | null;
  apiErrorCode: string | null;
  param: string | null;
  httpStatusCode: number;
}
