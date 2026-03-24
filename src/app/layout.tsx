import type { Metadata } from "next";
import { Newsreader, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const siteUrl = "https://claude-malaysia-community.vercel.app";
const title = "Claude Malaysia Community — Pulse Check";
const description =
  "Latest Claude & Claude Code announcements, feature releases, community tips, and real developer sentiment from Twitter/X, Reddit & Hacker News. Founded by Marcus Chia.";

export const metadata: Metadata = {
  title: {
    default: title,
    template: "%s | Claude Malaysia Community",
  },
  description,
  metadataBase: new URL(siteUrl),
  keywords: [
    "Claude",
    "Claude Code",
    "Claude Cowork",
    "Anthropic",
    "Claude Malaysia",
    "AI coding",
    "Claude Code features",
    "Claude Code tips",
    "Claude Code review",
    "Claude Code channels",
    "Claude Code voice mode",
    "Claude Code dispatch",
    "Claude Opus 4.6",
    "Claude Sonnet 4.6",
    "MCP",
    "Model Context Protocol",
    "AI developer tools",
    "Claude community Malaysia",
  ],
  authors: [{ name: "Marcus Chia", url: "https://www.linkedin.com/in/marcusmark5/" }],
  creator: "Marcus Chia",
  publisher: "Claude Malaysia Community",
  openGraph: {
    type: "website",
    locale: "en_MY",
    url: siteUrl,
    siteName: "Claude Malaysia Community",
    title,
    description,
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Claude Malaysia Community — Pulse Check",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og.png"],
    creator: "@marcuschia",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Claude Malaysia Community",
  alternateName: "Claude MY Pulse Check",
  url: siteUrl,
  description,
  author: {
    "@type": "Person",
    name: "Marcus Chia",
    url: "https://www.linkedin.com/in/marcusmark5/",
  },
  publisher: {
    "@type": "Organization",
    name: "Claude Malaysia Community",
    url: "https://www.facebook.com/groups/836579066085697",
  },
  inLanguage: "en",
  about: {
    "@type": "SoftwareApplication",
    name: "Claude Code",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "macOS, Linux, Windows",
    creator: {
      "@type": "Organization",
      name: "Anthropic",
      url: "https://anthropic.com",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${jakarta.variable} ${jetbrains.variable}`}
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <script
          type="application/ld+json"
          // Static JSON-LD for structured data — no user input
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
