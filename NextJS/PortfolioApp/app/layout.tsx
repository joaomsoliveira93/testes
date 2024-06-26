"use client"
import "./globals.css";
import "./data-tables-css.css";
import "./satoshi.css";
import { useState, useEffect } from "react";
import Sidebar from "@/components/appLayout/Sidebar/Sidebar";
import Header from "@/components/appLayout/Header";
import AuthProvider from "@/context/AuthProvider";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <AuthProvider>
          <div className="dark:bg-black dark:text-bodydark">
            <div className="flex h-screen overflow-hidden">
              <Sidebar />
              <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                <Header
                  sidebarOpen={sidebarOpen}
                  setSidebarOpen={setSidebarOpen}
                />
                <main>
                  <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                    {children}
                  </div>
                </main>
              </div>
            </div>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
