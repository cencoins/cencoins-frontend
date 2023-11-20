import { ServiceIdentity } from "@/service/ServiceIdentity/ServiceIdentity";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    const response = await ServiceIdentity.emailSignUp(req.body, {});
    return res.send({ response });
  } catch (error) {
    return res.end(error);
  }
}
