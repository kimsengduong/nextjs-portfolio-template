import "./globals.css";
import { Metadata } from "next";
import { getProfileSection } from "@/utils/profileData";

// Get basic info
const basics = getProfileSection("basics");

export const metadata: Metadata = {
  title: {
    template: `%s | ${basics.name}`,
    default: `${basics.name} - ${basics.title}`,
  },
  description: basics.metaDescription,
  keywords: ["developer", "portfolio", "full stack", "engineer"],
  authors: [{ name: basics.name }],
  creator: basics.name,
  metadataBase: new URL("https://example.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://example.com",
    siteName: `${basics.name} - Portfolio`,
    title: `${basics.name} - ${basics.title}`,
    description: basics.metaDescription,
    images: [
      {
        url: "https://example.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: `${basics.name} - Portfolio`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${basics.name} - ${basics.title}`,
    description: basics.metaDescription,
    images: ["https://kimsengduong.com/og-image.jpg"],
    creator: "@yourtwitter",
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
    canonical: "https://kimsengduong.com",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
