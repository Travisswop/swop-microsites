import { Inter as FontSans } from 'next/font/google';
import localFont from 'next/font/local';
import { Analytics } from '@vercel/analytics/react';
import '@/styles/globals.css';
import { cn } from '@/lib/utils';
import { siteConfig } from '@/config/site';
import Loading from './loading';
import { Suspense } from 'react';
import ogImage1 from '@/public/og-192x192.png';
import ogImage2 from '@/public/og-512x512.png';
const APP_URL = process.env.NEXT_PUBLIC_APP_URL;
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,

  keywords: [
    'Swop',
    'Swop digital business card',
    'Swop NFC card',
    'Swop microsites',
    'NFC with microsites',
    'Swop web3 wallet',
    'Ethereum wallet',
    'ENS',
    'Solana',
    'Polygon',
  ],
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  twitter: {
    title: siteConfig.name,
    description: siteConfig.description,
    card: 'summary_large_image',
  },
  manifest: `${siteConfig.url}/site.webmanifest`,

  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    type: 'website',
    url: 'https://swopme.app',
    images: '/images/og-192x192.png',
  },
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
          'min-h-screen mx-auto bg-background font-sans antialiased',
          fontSans.variable
        )}
      >
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </body>
      <Analytics />
    </html>
  );
}
