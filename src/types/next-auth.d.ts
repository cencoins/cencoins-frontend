/* eslint-disable no-unused-vars */
import NextAuth, { DefaultUser } from "next-auth";

declare module "next-auth" {
  interface User extends DefaultUser {
    data: {
      accessToken: string;
      refreshToken: string;
      accessTokenExpiry: number;
    };
  }

  interface Session {
    user?: User;
    accessToken: string;
    accessTokenExpiry: number;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends UserData {
    accessToken: string;
    accessTokenExpiry: number;
    refreshToken: string;
  }
}
