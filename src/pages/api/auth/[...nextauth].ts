import { NextApiRequest, NextApiResponse } from "next";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import getConfig from "next/config";
import { jwtDecode } from "jwt-decode";
import { JWTAuth } from "@/types/jwtAuth";
import { Session } from "next-auth";

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
            const user: JWTAuth = jwtDecode(credentials.accessToken);
            return {
              name: "",
              image: "",
              id: user.user_id,
              email: user.email,
              data: {
                accessToken: credentials.accessToken,
                refreshToken: credentials.refreshToken,
                accessTokenExpiry: user.exp * 1000,
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

        // TODO: РЕФРЕШ ТОКЕНА
        // try {
        //   const response = await ServiceIdentity.emailSignInRefresh({
        //     refreshToken: token.refreshToken,
        //   });
        //   console.log({ response: response.data });
        // } catch (error) {
        //   console.log({ error });
        // }

        return token;
      },
    },
    pages: {},
    secret: NEXTAUTH_SECRET,
  } as NextAuthOptions);

export default Auth;
