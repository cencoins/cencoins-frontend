export interface EmailSignUpParams {
  email: string;
  password: string;
  session: string;
  name: string;
}

export interface EmailSignUpValidateParams {
  email: string;
}

export interface EmailSignUpValidateResponse {
  email: string;
  session: string;
}

export interface EmailSignInParams {
  email: string;
  password: string;
}

export interface EmailSignInResponse {
  accessToken: string;
  expiresIn: number;
  refreshExpiresIn: number;
  refreshToken: string;
  tokenType: string;
  scope: string;
  step: string;
}

export interface EmailSignInRefreshParams {
  refreshToken: string;
}

export interface EmailSignInRefreshResponse extends EmailSignInResponse {}
