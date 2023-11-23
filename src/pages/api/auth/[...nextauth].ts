import { NextApiRequest, NextApiResponse } from "next";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import getConfig from "next/config";
import { jwtDecode } from "jwt-decode";
import { JWTAuth } from "@/types/jwtAuth";
import { Session } from "next-auth";
import { ServiceIdentity } from "@/service/ServiceIdentity/ServiceIdentity";

const {
  serverRuntimeConfig: { NEXTAUTH_SECRET },
} = getConfig();

const Auth = (req: NextApiRequest, res: NextApiResponse): void =>
  NextAuth(req, res, {
    providers: [
      CredentialsProvider({
        id: "jwtAuth",
        name: "Credentials",
        credentials: {
          accessToken: {},
          expiresIn: {},
          refreshExpiresIn: {},
          refreshToken: {},
          tokenType: {},
          scope: {},
          step: {},
        },
        authorize(credentials) {
          if (credentials?.accessToken) {
            const jwtDecoded: JWTAuth = jwtDecode(credentials.accessToken);
            return {
              name: "",
              image: "",
              id: jwtDecoded.user_id,
              email: jwtDecoded.email,
              data: {
                accessToken: credentials.accessToken,
                refreshToken: credentials.refreshToken,
                accessTokenExpiry: jwtDecoded.exp * 1000,
              },
            };
          }
          return null;
        },
      }),
    ],
    session: {
      strategy: "jwt",
    },
    callbacks: {
      session: async ({ session, token }) => {
        session.accessToken = token.accessToken;
        session.accessTokenExpiry = token.accessTokenExpiry;

        if (token.user) {
          session.user = token.user as Session["user"];
        }

        return session;
      },
      async jwt({ token, user }) {
        if (user) {
          const { data, ...userData } = user;
          token.accessToken = data.accessToken;
          token.refreshToken = data.refreshToken;
          token.accessTokenExpiry = data.accessTokenExpiry;
          token.user = userData;
        }

        if (Date.now() < Number(token.accessTokenExpiry)) {
          return token;
        }

        try {
          const { data } = await ServiceIdentity.emailSignInRefresh({
            refreshToken: token.refreshToken,
          });
          const jwtDecoded: JWTAuth = jwtDecode(data.accessToken);
          token.accessToken = data.accessToken;
          token.refreshToken = data.refreshToken;
          token.accessTokenExpiry = jwtDecoded.exp * 1000;
          token.user = {
            name: "",
            image: "",
            id: jwtDecoded.user_id,
            email: jwtDecoded.email,
          };
        } catch (error) {
          return null;
        }

        return token;
      },
    },
    pages: {},
    secret: NEXTAUTH_SECRET,
  } as NextAuthOptions);

export default Auth;
