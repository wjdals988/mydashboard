import type { Metadata, Viewport } from "next";
import { Geist_Mono } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { projects } from "@/lib/projects";
import { site, siteUrl } from "@/lib/site";
import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.author, url: site.github }],
  creator: site.author,
  keywords: [
    "포트폴리오",
    "프로젝트 대시보드",
    "Android 앱",
    "Next.js",
    "Firebase",
    site.author,
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: "/",
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbfbfc" },
    { media: "(prefers-color-scheme: dark)", color: "#08090b" },
  ],
};

// 첫 페인트 전에 저장된 테마를 적용해 라이트/다크 깜빡임을 막는다.
const themeScript = `try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark"){document.documentElement.setAttribute("data-theme",t)}}catch(e){}`;

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: site.name,
      description: site.description,
      inLanguage: "ko-KR",
      publisher: { "@id": `${siteUrl}/#person` },
    },
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: site.author,
      url: siteUrl,
      sameAs: [site.github],
    },
    ...projects
      .filter((project) => project.apk)
      .map((project) => ({
        "@type": "SoftwareApplication",
        name: project.title,
        description: project.summary,
        applicationCategory: "MobileApplication",
        operatingSystem: "Android 8.0+",
        softwareVersion: project.apk?.version,
        downloadUrl: project.apk?.url,
        url: `${siteUrl}/projects/${project.slug}`,
        author: { "@id": `${siteUrl}/#person` },
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "KRW",
        },
      })),
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={geistMono.variable} lang="ko" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <link
          as="font"
          crossOrigin="anonymous"
          href="/fonts/PretendardStdVariable.woff2"
          rel="preload"
          type="font/woff2"
        />
        <script
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          type="application/ld+json"
        />
      </head>
      <body>
        <a
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-fg focus:px-4 focus:py-2 focus:text-sm focus:text-bg"
          href="#main"
        >
          본문으로 건너뛰기
        </a>
        <SiteHeader />
        <div id="main">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
