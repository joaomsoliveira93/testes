import { ReactNode } from "react";
import "./globals.css";
import "./data-tables-css.css";
import "./satoshi.css";
import Sidebar from "@/components/appLayout/Sidebar/Sidebar";
import Header from "@/components/appLayout/Header";
import AuthProvider from "@/context/AuthProvider";
import { SidebarProvider } from "@/context/SidebarContext";
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';

interface RootLayoutProps {
  children: ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const messages = await getMessages();
  const locale = await getLocale();
  return (
    <html lang={locale}>
      <body suppressHydrationWarning={true}>
        <NextIntlClientProvider messages={messages}>
          <AuthProvider>
            <SidebarProvider>
              <div className="dark:bg-black dark:text-bodydark">
                <div className="flex h-screen overflow-hidden">
                  <Sidebar />
                  <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                    <Header />
                    <main>
                      <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                        {children}
                      </div>
                    </main>
                  </div>
                </div>
              </div>
            </SidebarProvider>
          </AuthProvider>
        </NextIntlClientProvider >
      </body>
    </html>
  );
}
