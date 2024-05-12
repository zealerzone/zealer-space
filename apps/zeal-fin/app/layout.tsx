import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider, Toaster } from "@ui/index";
import { cn } from "@ui/lib/utils";

import QueryProvider from "@/providers/QueryProvider";
import { SheetProvider } from "@/providers/SheetProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Zeal Finance",
  description: "Financial app for your Family",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={cn("bg-background flex-col antialiased", inter.className)}
        >
          <QueryProvider>
            <SheetProvider />
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
          </QueryProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
