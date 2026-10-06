import type { Metadata } from "next";
import "./globals.css";
import {assetPath} from "@/lib/assets";

export const metadata: Metadata = {
  title: "Oronix — Good design. Great possibilities.",
  description: "Oronix is an independent design studio creating thoughtful brands, digital products, websites, and interactive experiences. Let’s shape what’s next.",
  icons: {
    icon: assetPath("/favicon.svg"),
    shortcut: assetPath("/favicon.svg"),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
