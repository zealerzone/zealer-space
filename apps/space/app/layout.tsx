import { ThemeProvider, Toaster } from "@zealer/ui";

import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "@ui/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Zealer's Space",
  description:
    "Zealers Space for Runners, Trekkers and All Fitness enthusiasts",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn("bg-background flex-col antialiased", inter.className)}
      >
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
  );
}
