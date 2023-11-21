import { ServiceIdentity } from "@/service/ServiceIdentity/ServiceIdentity";
import { EmailSignUpValidateResponse } from "@/service/ServiceIdentity/ServiceIdentity.dto";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<EmailSignUpValidateResponse>
) {
  try {
    const response = await ServiceIdentity.emailSignUpValidate(req.body);
    return res.send(response.data);
  } catch (error) {
    // @ts-ignore
    return res.status(error?.response?.status).send(error?.response?.data);
  }
}
