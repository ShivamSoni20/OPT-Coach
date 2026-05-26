import type { Metadata } from "next";

import "@/app/globals.css";

export const metadata: Metadata = {
  title: "OPT Coach",
  description: "Turn tribal knowledge into an AI-ready company brain in 20 minutes."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
