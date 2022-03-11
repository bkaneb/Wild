import dynamic from "next/dynamic";
import type { AppProps } from "next/app";
import "../styles/globals.css";
import HeaderContainerCards from "../components/Cards/HeaderContainerCards";
import FooterCards from "../components/Cards/FooterContainerCards";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <HeaderContainerCards />
      <Component {...pageProps} />
      <FooterCards />
    </>
  );
}

// Disabling SSR
export default dynamic(() => Promise.resolve(MyApp), { ssr: false });
