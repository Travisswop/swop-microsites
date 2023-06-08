import { Inter as FontSans } from 'next/font/google';
import localFont from 'next/font/local';

import '@/styles/globals.css';
import { cn } from '@/lib/utils';
export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'max-w-md min-h-screen mx-auto bg-background font-sans antialiased',
          fontSans.variable
        )}
      >
        {children}
      </body>
    </html>
  );
}
