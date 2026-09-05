import type { Metadata } from "next";
import "./globals.css";
import CommandPalette from "@/components/ui/CommandPalette";
import IntroVideoModal from "@/components/ui/IntroVideoModal";

export const metadata: Metadata = {
  title: "SpillTrace AI — From Space to Suspect | Ministry of Disaster Management",
  description:
    "AI-Powered Maritime Oil Spill Forensics, Attribution & Response Intelligence Platform. Detect, trace, attribute, assess, respond, and monitor oil spills using satellite intelligence, AI computer vision, oceanographic modelling, and AIS vessel analytics.",
  keywords: [
    "oil spill detection",
    "maritime intelligence",
    "satellite AI",
    "AIS vessel tracking",
    "geospatial AI",
    "oil spill forensics",
    "SAR imagery",
    "ocean drift modelling",
    "Ministry of Disaster Management",
    "Disaster Management",
    "NTRO",
    "SpillTrace AI",
  ],
  authors: [{ name: "SpillTrace AI Team" }],
  openGraph: {
    title: "SpillTrace AI — From Space to Suspect",
    description:
      "AI-Powered Maritime Oil Spill Forensics, Attribution & Response Intelligence Platform",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="antialiased">
        {children}
        <CommandPalette />
        <IntroVideoModal />
      </body>
    </html>
  );
}
