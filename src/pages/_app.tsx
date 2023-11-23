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
import { useEffect, useState } from "react";
import AOS from "aos";
import getTheme from "@/theme";
import { RefreshTokenHandler } from "@/components/RefreshTokenHandler/RefreshTokenHandler";
import getConfig from "next/config";
const {
  publicRuntimeConfig: { BASE_URL },
  serverRuntimeConfig: { GATEWAY_URL },
} = getConfig();

// eslint-disable-next-line no-console
console.log({ GATEWAY_URL, BASE_URL });

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function App(props: MyAppProps) {
  const {
    Component,
    emotionCache = clientSideEmotionCache,
    pageProps: { session, ...pageProps },
  } = props;
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
        <meta name="viewport" content="initial-scale=1, width=device-width" />
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
}
