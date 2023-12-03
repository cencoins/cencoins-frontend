/* eslint-disable no-console */
import { LANGUAGES } from "@/constants/LANGUAGES";
import { NextRequest, NextResponse } from "next/server";
// import { ServiceLocation } from "./service/ServiceLocation/ServiceLocation";
// import { API_VERSION } from "./constants/API_VERSION";

const PUBLIC_FILE = /\.(.*)$/;

export async function middleware(req: NextRequest) {
  if (
    req.nextUrl.pathname.startsWith("/_next") ||
    req.nextUrl.pathname.includes("/api/") ||
    PUBLIC_FILE.test(req.nextUrl.pathname)
  ) {
    return;
  }

  if (req.nextUrl.locale === "default") {
    try {
      // console.log({ req });
      const forwarded = req.headers.get("x-forwarded-for");
      const ip = forwarded ? forwarded.split(/, /)[0] : undefined;
      console.log({ ip });
      // const { GATEWAY_URL } = process.env;
      // const response = await fetch(
      //   `${GATEWAY_URL}/gw/${API_VERSION.V1}/location/10.100.1.1`,
      //   { method: "GET" },
      // );
      // console.log({ response });
    } catch (error) {
      console.log({ error });
    }
    // console.log({ response });

    const locale = req.cookies.get("NEXT_LOCALE")?.value || LANGUAGES.RU;

    return NextResponse.redirect(
      new URL(
        `/${locale}${req.nextUrl.pathname}${req.nextUrl.search}`,
        req.url,
      ),
    );
  }
}

export const config = {
  matcher: "/",
};
