import type { NextApiRequest, NextApiResponse } from "next";
import { ServiceIdentity } from "@/service/ServiceIdentity/ServiceIdentity";
import { EmailSignInRefreshResponse } from "@/service/ServiceIdentity/ServiceIdentity.dto";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<EmailSignInRefreshResponse>
) {
  try {
    const response = await ServiceIdentity.emailSignInRefresh(req.body);
    return res.send(response.data);
  } catch (error) {
    // @ts-ignore
    return res.status(error?.response?.status).send(error?.response?.data);
  }
}
