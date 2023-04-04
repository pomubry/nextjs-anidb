import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";
import { appThemeKey } from "@/lib/utils";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
        <Script id={appThemeKey} strategy="beforeInteractive">
          {`
  if (
    localStorage.getItem("${appThemeKey}") === "dark" ||
    (!("${appThemeKey}" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    localStorage.setItem("${appThemeKey}","dark")
    document.documentElement.classList.add("dark");
  } else {
    localStorage.setItem("${appThemeKey}","light")
    document.documentElement.classList.remove("dark");
  }
          `}
        </Script>
      </body>
    </Html>
  );
}
