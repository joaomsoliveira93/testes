import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import CustomThemeProvider from './providers/themeProvider';
import { Header } from './components/layout/header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'My Profile',
  description: 'Get to Know Me Better',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={inter.className}>
        <CustomThemeProvider>
          <Header />
          <main>{children}</main>
        </CustomThemeProvider>
      </body>
    </html>
  );
}

