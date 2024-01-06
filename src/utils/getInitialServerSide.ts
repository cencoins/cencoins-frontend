import { nextAuthOptions } from "@/constants/NEXTAUTH_OPTIONS";
import { GetServerSidePropsContext, PreviewData } from "next";
import { Session, getServerSession } from "next-auth";
import { NextParsedUrlQuery } from "next/dist/server/request-meta";

export interface GetInitialServerSidePropsResult {
  session: Nullable<Session>;
}

export const getInitialServerSideProps = async (
  context: GetServerSidePropsContext<NextParsedUrlQuery, PreviewData>,
): Promise<GetInitialServerSidePropsResult> => {
  const { req, res, locale } = context;
  const session = await getServerSession(req, res, nextAuthOptions);

  return JSON.parse(
    JSON.stringify({
      session,
      locale,
    }),
  );
};
