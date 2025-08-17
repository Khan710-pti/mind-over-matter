import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import ChatWidget from "@/components/ChatWidget";
import { AuthProvider } from "@/components/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mind Over Matter - Career Guidance for UK Students",
  description: "Your AI-powered career companion for navigating the UK job market. Discover industries, roles, and get personalized guidance.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <div className="flex h-screen bg-gray-50">
            <Sidebar />
            <main className="flex-1 overflow-y-auto">
              {children}
            </main>
            <ChatWidget />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
