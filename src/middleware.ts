import { LANGUAGES } from "@/constants/LANGUAGES";
import { NextRequest, NextResponse } from "next/server";
import { GetLocationResponse } from "./service/ServiceLocation/ServiceLocation.dto";
import { checkLocaleIsAvailable } from "./utils/checkLocaleIsAvailable";

const PUBLIC_FILE = /\.(.*)$/;

export async function middleware(req: NextRequest) {
  if (
    req.nextUrl.pathname.startsWith("/_next") ||
    req.nextUrl.pathname.includes("/api/") ||
    PUBLIC_FILE.test(req.nextUrl.pathname)
  ) {
    return NextResponse.next();
  }

  // console.log(req.nextUrl.locale, "req.nextUrl.locale");
  if (req.nextUrl.locale === "default") {
    let locale = req.cookies.get("NEXT_LOCALE")?.value || LANGUAGES.RU;
    let locationObject;
    const forwarded = req.headers.get("x-forwarded-for");
    // const myIp = "192.168.142.192";
    const ip = forwarded ? forwarded.split(/, /)[0] : undefined;

    if (ip) {
      try {
        const { GATEWAY_URL } = process.env;
        const response = await fetch(`${GATEWAY_URL}/location/${ip}`, {
          method: "GET",
        });
        const json: GetLocationResponse = await response.json();
        locationObject = json;
        const [currentLanguage] = json.lang.split("_");
        if (checkLocaleIsAvailable(currentLanguage)) {
          locale = currentLanguage;
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log("get location error", { error });
      }
    }
    let response;

    if (locale.toLocaleLowerCase() === LANGUAGES.RU) {
      response = NextResponse.next();
    } else {
      response = NextResponse.redirect(
        new URL(
          `/${locale}${req.nextUrl.pathname}${req.nextUrl.search}`,
          req.url,
        ),
      );
    }

    response.cookies.set("NEXT_LOCALE", locale);
    if (locationObject) {
      response.cookies.set("location", JSON.stringify(locationObject));
    }
    return response;
  } else {
    const response = NextResponse.next();
    response.cookies.set("NEXT_LOCALE", req.nextUrl.locale);
    return response;
  }
}

export const config = {
  matcher: "/",
};
