export interface ChargebeeError {
  code: string;
  message: string;
  userInfo: ChargebeeErrorDetail;
}

export interface ChargebeeErrorDetail {
  message: string | null;
  apiErrorCode: string | null;
  httpStatusCode: number;
}
