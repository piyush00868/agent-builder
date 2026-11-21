import type { Metadata } from "next";
 import type { ReactNode } from "react";
import { Geist, Geist_Mono, Raleway } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Provider } from "@/components/providers/provider";
import { Toaster } from "@/components/ui/toast";
const raleway = Raleway({ subsets: ['latin'], variable: '--font-sans' });
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Agent Builder",
  description: "Build your own Agents",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("h-full", "antialiased", geistSans.variable, geistMono.variable, "font-sans", raleway.variable)}>
      <body className="min-h-full flex flex-col">
        <Provider>{children}
          <Toaster />
        </Provider>
      </body>
    </html>
  );
}
