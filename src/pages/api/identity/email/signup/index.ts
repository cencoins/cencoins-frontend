import { ServiceIdentity } from "@/service/ServiceIdentity/ServiceIdentity";
import { isAxiosError } from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<void>,
) {
  try {
    const response = await ServiceIdentity.emailSignUp(req.body);
    return res.send(response.data);
  } catch (error) {
    if (isAxiosError(error)) {
      // @ts-ignore
      return res.status(error?.response?.status).send(error?.response?.data);
    } else {
      return res.status(500).end();
    }
  }
}
