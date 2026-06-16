import type { Metadata } from "next";
import { Nunito_Sans, Oswald } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/smooth-scroll";

const body = Nunito_Sans({
  variable: "--font-body",
  subsets: ["latin"],
});

const heading = Oswald({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Life Sports India",
  description:
    "Life Sports India harnesses the power of sport to unite communities, develop leaders, and create opportunities for young people across India.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${body.variable} ${heading.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[color:var(--lsi-ivory)] text-[color:var(--lsi-ink)]">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
