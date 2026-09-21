import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { personal } from "@/data/personal";
import { siteUrl } from "@/lib/utils";
import "./globals.css";
const sans = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});
const mono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-code",
  display: "swap",
});
const description =
  "A personal portfolio template showcasing projects, skills, experience, and creative interests. Replace the sample content with your own story.";
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: {
    default: `${personal.name} | ${personal.title}`,
    template: `%s | ${personal.name}`,
  },
  description,
  openGraph: {
    title: `${personal.name} | ${personal.title}`,
    description,
    type: "website",
    locale: "en_US",
    siteName: personal.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${personal.name} | ${personal.title}`,
    description,
  },
};
const themeScript = `try{var t=localStorage.getItem('theme');document.documentElement.dataset.theme=t==='light'||t==='dark'?t:'system'}catch(e){document.documentElement.dataset.theme='system'}`;
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${sans.variable} ${mono.variable}`}>
        {/* Keep theme initialization out of the hydratable head child list:
            browser extensions can insert scripts before React attaches. */}
        <Script id="portfolio-theme" strategy="beforeInteractive">
          {themeScript}
        </Script>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
