import type { Metadata } from "next"
import "./globals.css"

import { instrumentSans, instrumentSerif } from "@/app/fonts"
import { siteUrl } from "@/lib/site-url"
import { cn } from "@/lib/utils"

const title = "Energia solar para pequenos negócios | Faro Energia"
const description =
  "Projeto e instalação de energia solar para pequenos negócios, com estimativa de economia, diagnóstico técnico e acompanhamento em cada etapa."
const socialImage = {
  url: "/images/social/faro-social.jpg",
  width: 1200,
  height: 630,
  alt: "Faro Energia — energia solar para pequenos negócios",
}

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title,
  description,
  applicationName: "Faro Energia",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    shortcut: "/icon.svg",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: "Faro Energia",
    title,
    description,
    images: [socialImage],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [socialImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="pt-BR"
      className={cn(instrumentSans.variable, instrumentSerif.variable)}
    >
      <body>{children}</body>
    </html>
  )
}
