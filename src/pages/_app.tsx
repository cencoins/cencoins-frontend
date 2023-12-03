import { EmotionCache } from "@emotion/cache";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import type { AppContext, AppProps } from "next/app";
import { CacheProvider } from "@emotion/react";
import Head from "next/head";
import createEmotionCache from "@/theme/createEmotionCache";
import { Layout } from "@/components/Layout/Layout";
import { SessionProvider, getSession } from "next-auth/react";
import { useDarkMode } from "@/hooks/useDarkMode";
import { useEffect, useState } from "react";
import AOS from "aos";
import getTheme from "@/theme";
import { RefreshTokenHandler } from "@/components/RefreshTokenHandler/RefreshTokenHandler";
import { appWithTranslation } from "next-i18next";
import { Session } from "next-auth";
import nextI18NextConfig from "../../next-i18next.config.js";
import { getToken } from "next-auth/jwt";
import getConfig from "next/config";

const {
  serverRuntimeConfig: { NEXTAUTH_SECRET },
} = getConfig();

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
  pageProps: {
    session?: Session;
    isSignedIn?: boolean;
  };
}

const App = (props: MyAppProps) => {
  const {
    Component,
    emotionCache = clientSideEmotionCache,
    pageProps: { session, isSignedIn, ...pageProps },
  } = props;
  // eslint-disable-next-line no-console
  console.log({ isSignedIn });

  const [interval, setInterval] = useState(0);

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles && jssStyles.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles);
    }

    AOS.init({
      once: true,
      delay: 50,
      duration: 500,
      easing: "ease-in-out",
    });
  }, []);

  const [themeMode, themeToggler, mountedComponent] = useDarkMode();

  useEffect(() => {
    AOS.refresh();
  }, [mountedComponent, themeMode]);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SessionProvider refetchInterval={interval} session={session}>
        <ThemeProvider theme={getTheme(themeMode, themeToggler)}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
        <RefreshTokenHandler setInterval={setInterval} />
      </SessionProvider>
    </CacheProvider>
  );
};

App.getInitialProps = async (context: AppContext) => {
  const session = await getSession(context.ctx);
  const token = await getToken({
    // @ts-ignore
    req: context.ctx.req,
    secret: NEXTAUTH_SECRET,
  });

  // eslint-disable-next-line no-console
  console.log({ token, session });

  return {
    pageProps: {
      isSignedIn: Boolean(token),
    },
  };
};

export default appWithTranslation(App, nextI18NextConfig);
