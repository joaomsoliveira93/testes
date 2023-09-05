import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./providers/providers";
import { Header } from "./components/layout/Header";
import { Sidebar } from "./components/layout/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang= "en" >
    <body className={`${inter.className } flex relative`}>
      <Providers>
        <Header />  
        <Sidebar/>
        <main>
          { children }
        </main>
      </Providers>
    </body>
    </html>
  );
}
