import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";
import Header from "./_components/header";
import Footer from "./_components/footer";
import { ClerkProvider, SignedIn, SignedOut, SignIn } from "@clerk/nextjs";
import React from "react";

export const metadata: Metadata = {
  title: "Catopedia",
  description: "Cat Wikipedia",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${GeistSans.variable}`}>
        <body>
          <Header />
          <TRPCReactProvider>
            <SignedIn>{children}</SignedIn>
            <SignedOut>
              <SignIn />
            </SignedOut>
          </TRPCReactProvider>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
