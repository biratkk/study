import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { Inter as FontSans } from "next/font/google";

import { TRPCReactProvider } from "@/trpc/react";
import { cn } from "@/lib/utils";
import Navbar from "./_components/navbar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";

export const metadata = {
  title: "StudyPal",
  description: "A flashcard application to make all of your worries go away.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn(GeistSans.variable, fontSans.variable)}
      suppressHydrationWarning
    >
      <TRPCReactProvider>
          <TooltipProvider>
            <body className="overflow-x-hidden">
              <ThemeProvider
                attribute="class"
                defaultTheme="dark"
                enableSystem
                disableTransitionOnChange
              >
                <Navbar />
                {children}
                <Toaster />
              </ThemeProvider>
            </body>
          </TooltipProvider>
      </TRPCReactProvider>
    </html>
  );
}
