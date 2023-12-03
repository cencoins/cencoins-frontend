import { nextAuthOptions } from "@/constants/NEXTAUTH_OPTIONS";
import { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth";

const Auth = (req: NextApiRequest, res: NextApiResponse): void =>
  NextAuth(req, res, nextAuthOptions);

export default Auth;
