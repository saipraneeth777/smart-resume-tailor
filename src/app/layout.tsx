import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Footer } from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Resume Tailoring | Professional Resume Optimization",
  description: "Transform your resume with AI-powered tailoring. Upload your LaTeX resume and job description to get optimized results in seconds.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body className={inter.className}>
        <div className="min-h-screen bg-background flex flex-col">
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
        <Toaster />
      </body>
    </html>
  );
}
