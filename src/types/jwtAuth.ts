export interface JWTAuth {
  expires: string;
  email: string;
  iat: number;
  user_id: string;
  aud: string;
  iss: string;
  exp: number;
  nbf: number;
}
