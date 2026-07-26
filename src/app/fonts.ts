import localFont from "next/font/local"

export const instrumentSans = localFont({
  src: "../../node_modules/@fontsource-variable/instrument-sans/files/instrument-sans-latin-wght-normal.woff2",
  variable: "--font-body-loaded",
  display: "swap",
  fallback: ["Arial", "system-ui", "sans-serif"],
  adjustFontFallback: "Arial",
})

export const instrumentSerif = localFont({
  src: "../../node_modules/@fontsource/instrument-serif/files/instrument-serif-latin-400-normal.woff2",
  variable: "--font-display-loaded",
  display: "swap",
  weight: "400",
  fallback: ["Georgia", "Times New Roman", "serif"],
  adjustFontFallback: "Times New Roman",
})
