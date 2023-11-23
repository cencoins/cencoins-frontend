import type { NextApiRequest, NextApiResponse } from "next";
import { ServiceIdentity } from "@/service/ServiceIdentity/ServiceIdentity";
import { EmailSignInRefreshResponse } from "@/service/ServiceIdentity/ServiceIdentity.dto";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<EmailSignInRefreshResponse>,
) {
  try {
    const response = await ServiceIdentity.emailSignInRefresh(req.body);
    return res.send(response.data);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log({ error });
    return res.status(500).end();
  }
}
