import { ServiceIdentity } from "@/service/ServiceIdentity/ServiceIdentity";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    const response = await ServiceIdentity.emailSignUp(req.body, {});
    // eslint-disable-next-line no-console
    console.log({ response });
    return res.send({ response });
  } catch (error: any) {
    // eslint-disable-next-line no-console
    console.log({ error });
    return res.status(error.response.status).end(error.response.data);
  }
}
