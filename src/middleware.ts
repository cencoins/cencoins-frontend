import { LANGUAGES } from "@/constants/LANGUAGES";
import { NextRequest, NextResponse } from "next/server";
import { GetLocationResponse } from "./service/ServiceLocation/ServiceLocation.dto";
import { checkLocaleIsAvailable } from "./utils/checkLocaleIsAvailable";

const { GATEWAY_URL } = process.env;

const PUBLIC_FILE = /\.(.*)$/;

export async function middleware(req: NextRequest) {
  if (
    req.nextUrl.pathname.startsWith("/_next") ||
    req.nextUrl.pathname.includes("/api/") ||
    PUBLIC_FILE.test(req.nextUrl.pathname)
  ) {
    return NextResponse.next();
  }

  if (req.nextUrl.locale === "default") {
    const locale = req.cookies.get("NEXT_LOCALE")?.value || LANGUAGES.EN;
    const forwarded = req.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(/, /)[0] : undefined;

    const redirectToLocale = (newLocale: string, locationObject?: unknown) => {
      const response = NextResponse.redirect(
        new URL(
          `/${newLocale}${req.nextUrl.pathname}${req.nextUrl.search}`,
          req.url,
        ),
      );
      response.cookies.set("NEXT_LOCALE", locale);
      if (locationObject) {
        response.cookies.set("location", JSON.stringify(locationObject));
      }
      return response;
    };

    // eslint-disable-next-line no-console
    console.log({ ip }, "USER IP");

    if (ip) {
      try {
        const response = await fetch(`${GATEWAY_URL}/location/${ip}`, {
          method: "GET",
        });
        const responseData: GetLocationResponse = await response.json();
        const [currentLanguage] = responseData.lang.split("_");
        if (checkLocaleIsAvailable(currentLanguage)) {
          return redirectToLocale(currentLanguage, responseData);
        } else {
          // eslint-disable-next-line no-console
          console.log("unknown lang from user", {
            ip,
            lang: responseData.lang,
          });
          return redirectToLocale(locale);
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log("get location error, setted default locale", { locale });
        return redirectToLocale(locale);
      }
    }
  } else {
    const response = NextResponse.next();
    response.cookies.set("NEXT_LOCALE", req.nextUrl.locale);
    return response;
  }
}

export const config = {
  matcher: "/",
};
