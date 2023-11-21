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

export interface EmailSignInResponse {}

export interface EmailSignInRefreshParams {
  refreshToken: string;
}

export interface EmailSignInRefreshResponse {}
