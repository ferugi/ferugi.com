import { cn } from "@/lib/cn";
import type { Metadata } from "next";
import { EB_Garamond, Open_Sans, PT_Mono } from "next/font/google";
import "./globals.css";

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  weight: ["600", "700"],
  style: ["normal", "italic"],
  variable: "--font-eb-garamond",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-open-sans",
});

const ptMono = PT_Mono({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  variable: "--font-pt-mono",
});

export const metadata: Metadata = {
  title: "Ferugi El Heri",
  description: "Full Stack Developer",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn(ebGaramond.variable, openSans.variable, ptMono.variable)}
    >
      <head />
      <body>{children}</body>
    </html>
  );
}
