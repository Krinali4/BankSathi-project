import React, { useEffect, useState } from "react";
import "@/styles/globals.css";
import "@/styles/style.css";
import "@/styles/leadsStyle.css";
import "react-widgets/styles.css";
import { Poppins } from "next/font/google";
import ErrorBoundary from "@/core/ErrorBoundary/ErrorBoundary";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export default function App({ Component, pageProps }) {
  return (
    <>
      <ErrorBoundary>
        <main className={poppins.className}>
          <Component {...pageProps} />
        </main>
      </ErrorBoundary>
    </>
  );
}
