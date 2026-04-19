import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter_Tight, Syne, Sora } from "next/font/google";

import "./globals.css";
import { ThemeProviders } from "@/components/theme-providers";

const display = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["700", "800"],
});

const body = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
});

const logo = Sora({
  subsets: ["latin"],
  variable: "--font-logo",
  weight: ["600", "700"],
});

export const metadata: Metadata = {
  title: "hashStudio",
  description: "Minimal portfolio for Hashir Muhammed.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${display.variable} ${body.variable} ${logo.variable} bg-background font-sans text-foreground antialiased`}
      >
        <ThemeProviders>{children}</ThemeProviders>
      </body>
    </html>
  );
}
