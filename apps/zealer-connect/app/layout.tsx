import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider, Toaster } from "@ui/index";
import { cn } from "@ui/lib/utils";

import { env } from "@/env";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Zealer Connect",
  description: "Zealer Connect",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={cn("antialiased", inter.className)}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            disableTransitionOnChange
            enableSystem
          >
            {children}

            <Toaster
              position="top-center"
              toastOptions={{ style: { textAlign: "center" } }}
            />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
