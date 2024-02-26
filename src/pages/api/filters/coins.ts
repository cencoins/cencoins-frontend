import { ServiceFilters } from "@/service/ServiceFilters/ServiceFilters";
import { Coin } from "@/service/ServiceSocket/ServiceSocket.dto";
import { isAxiosError } from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Coin[]>,
) {
  if (req.method === "GET") {
    try {
      const response = await ServiceFilters.getCoins();
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
}
