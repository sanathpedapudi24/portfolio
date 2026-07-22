import type { Metadata } from "next";
import { IdentityProvider } from "@/context/IdentityContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sanath Pedapudi — Software Developer & Video Editor",
  description:
    "Portfolio of Sanath Pedapudi — Software Developer specializing in .NET, Angular, AI automation, and Video Editor creating cinematic content.",
  keywords: [
    "Sanath Pedapudi",
    "Software Developer",
    "Video Editor",
    "Full Stack Developer",
    ".NET Developer",
    "Angular Developer",
    "AI Automation",
    "Playwright",
    "Portfolio",
  ],
  authors: [{ name: "Sanath Pedapudi" }],
  creator: "Sanath Pedapudi",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://sanathpedapudi.dev",
    title: "Sanath Pedapudi — Developer & Video Editor",
    description:
      "World-class dual-identity portfolio — Software Developer + Video Editor.",
    siteName: "Sanath Pedapudi",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sanath Pedapudi",
    description: "Software Developer & Video Editor Portfolio",
    creator: "@sanathpedapudi",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <IdentityProvider>{children}</IdentityProvider>
      </body>
    </html>
  );
}
