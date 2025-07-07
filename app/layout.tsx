import "./globals.css";

import { Inter } from "next/font/google";
import type { Metadata } from "next";
import { TanstackProviders } from "@/providers/tanstack-query";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Medi Direct",
    template: "%s | Medi Direct",
  },
  applicationName: "Medi Direct",
  description: "Medi Direct",

  metadataBase: new URL("https://www.medidirect.org/"),
  icons: {
    icon: "/logo.jpg",
  },
  openGraph: {
    title: "Medi Direct",
    description: "Official website for Medi Direct",
    url: "https://www.medidirect.org/",
    siteName: "Medi Direct",
    images: {
      url: "https://res.cloudinary.com/dkvxi5iws/image/upload/v1751829214/logo_putfge.jpg",
      width: 1200,
      height: 630,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={cn(`antialiased`, inter.className)}
      >
        <TanstackProviders>{children}</TanstackProviders>
      </body>
    </html>
  );
}
