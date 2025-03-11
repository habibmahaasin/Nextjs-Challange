import React, { createContext, useState, useContext } from "react";
import { ConfigProvider } from "antd";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@/styles/globals.css";
import { PagesTopLoader } from "nextjs-toploader/pages";
import { lightTheme, darkTheme } from "@/theme/themeConfig";
import Head from "next/head";

const ThemeContext = createContext({
  theme: "dark",
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

const queryClient = new QueryClient();

const App = ({ Component, pageProps }: AppProps) => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme: () =>
          setTheme((prev) => (prev === "light" ? "dark" : "light")),
      }}
    >
      <Head>
        <title>Synapsis Challenge</title>
        <meta name="description" content="Synapsis Challenge" />
      </Head>
      <ConfigProvider theme={theme === "dark" ? darkTheme : lightTheme}>
        <QueryClientProvider client={queryClient}>
          <PagesTopLoader />
          <Component {...pageProps} />
        </QueryClientProvider>
      </ConfigProvider>
    </ThemeContext.Provider>
  );
};

export default App;
