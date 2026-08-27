import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AgentKart",
  description: "Global AI Agent Marketplace",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            <Link href="/" className="text-xl font-bold text-blue-600">
              AgentKart
            </Link>
            <div className="flex gap-6 items-center">
              <Link href="/marketplace" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition">
                Our Agents
              </Link>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
