"use client";

import "../styles/global.css";
import Head from "next/head";

import Loading from "../components/Loading.js";
import { useEffect } from "react";
import Router, { useRouter } from "next/router";
import useAuthStore from "@/utils/store/auth/authStore";
import { FaSpinner } from "react-icons/fa";

import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  weight: ["400", "700"],
  subsets: ["latin"],
});

function MyApp({ Component, pageProps }) {
  const { loading, smallLoading, setIsLoading, setIsSmallLoading } =
    useAuthStore();
  const router = useRouter();
  const getLayout = Component.getLayout || ((page) => page);

  useEffect(() => {
    const start = (url) => {
      const isAuthRoute = router.pathname.includes("/auth/");
      const isTargetAuthRoute = url.includes("/auth/");
      if (router.pathname === "/auth/login" && url.includes("/dashboard/")) {
        setIsLoading(true);
      } else if (!isAuthRoute && !isTargetAuthRoute) {
        setIsSmallLoading(true);
      }
    };
    const end = () => {
      setIsLoading(false);
      setIsSmallLoading(false);
    };

    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);

    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, [router.pathname]);

  return getLayout(
    <>
      <Head>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/icons/etech7_favicon.ico" />
      </Head>
      {loading ? (
        <Loading />
      ) : smallLoading ? (
        <FaSpinner
          size={50}
          className="animate-spin absolute top-0 left-0 right-0 bottom-0 m-auto  text-blue-800"
        />
      ) : (
        <Component {...pageProps} className={montserrat.className}/>
      )}
    </>
  );
}

export default MyApp;
