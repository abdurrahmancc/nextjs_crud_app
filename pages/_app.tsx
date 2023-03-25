import { RootContext } from "@/hooks/useRootContext";
import { store } from "@/redux/app/store";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { themeChange } from "theme-change";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps }: AppProps) {
  const [isLightTheme, setIsLightTheme] = useState<boolean>(true);
  useEffect(() => {
    themeChange(false);
  }, []);

  const contextValues = {
    isLightTheme,
    setIsLightTheme,
  };
  return (
    <>
      <ToastContainer />
      <Provider store={store}>
        <RootContext.Provider value={contextValues}>
          <div className="min-h-screen" data-theme={isLightTheme ? "light" : "dark"}>
            <Component {...pageProps} />
          </div>
        </RootContext.Provider>
      </Provider>
    </>
  );
}
