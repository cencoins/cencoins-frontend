// import { ServiceIdentity } from "@/service/ServiceIdentity/ServiceIdentity";
import { NextApiRequest, NextApiResponse } from "next";
import NextAuth, { NextAuthOptions } from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import getConfig from "next/config";

// const {
//   serverRuntimeConfig: { NEXTAUTH_SECRET },
// } = getConfig();

const Auth = (req: NextApiRequest, res: NextApiResponse): void =>
  NextAuth(req, res, {
    providers: [
      // CredentialsProvider({
      //   name: "email",
      //   credentials: {
      //     email: { label: "Email", type: "email" },
      //     password: { label: "Password", type: "password" },
      //   },
      //   async authorize(credentials) {
      //     const { email, password } = credentials as Record<string, string>;
      //     try {
      //       const response = await ServiceIdentity.emailSignIn({
      //         email,
      //         password,
      //       });
      //       // If no error and we have user data, return it
      //       if (response.status === 200) {
      //         return response.data;
      //       }
      //       // Return null if user data could not be retrieved
      //       return null;
      //     } catch (error) {
      //       // console.log({ error: error.response.data }, "catch error");
      //     }
      //   },
      // }),
    ],
    pages: {},
    // secret: NEXTAUTH_SECRET,
  } as NextAuthOptions);

export default Auth;
