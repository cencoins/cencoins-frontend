import { EmotionCache } from "@emotion/cache";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import type { AppProps } from "next/app";
import { CacheProvider } from "@emotion/react";
import Head from "next/head";
import createEmotionCache from "@/theme/createEmotionCache";
import { Layout } from "@/components/Layout/Layout";
import { SessionProvider } from "next-auth/react";
import { useDarkMode } from "@/hooks/useDarkMode";
import { ReactElement, useEffect, useState } from "react";
import AOS from "aos";
import getTheme from "@/theme";
import { RefreshTokenHandler } from "@/components/RefreshTokenHandler/RefreshTokenHandler";
import { appWithTranslation } from "next-i18next";
import { Session } from "next-auth";
import nextI18NextConfig from "../../next-i18next.config.js";

import "./../styles/reset.css";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
  Component: AppProps["Component"] & {
    // eslint-disable-next-line no-unused-vars
    getLayout?: (page: ReactElement) => JSX.Element;
  };
  pageProps: {
    session?: Session;
  };
}

const App = (props: MyAppProps) => {
  const {
    Component,
    emotionCache = clientSideEmotionCache,
    pageProps: { session, ...pageProps },
  } = props;
  const [interval, setInterval] = useState(0);
  const getLayout = Component.getLayout || ((page: ReactElement) => page);

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
          <Layout>{getLayout(<Component {...pageProps} />)}</Layout>
        </ThemeProvider>
        <RefreshTokenHandler setInterval={setInterval} />
      </SessionProvider>
    </CacheProvider>
  );
};

export default appWithTranslation(App, nextI18NextConfig);
