import { ServiceIdentity } from "@/service/ServiceIdentity/ServiceIdentity";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<void>
) {
  try {
    const response = await ServiceIdentity.emailSignUp(req.body);
    return res.send(response.data);
  } catch (error) {
    // @ts-ignore
    return res.status(error?.response?.status).send(error?.response?.data);
  }
}
