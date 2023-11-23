import { ServiceIdentity } from "@/service/ServiceIdentity/ServiceIdentity";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  try {
    const response = await ServiceIdentity.emailSignIn(req.body);
    return res.send(response.data);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log({ error });
    return res.status(500).end();
  }
}
