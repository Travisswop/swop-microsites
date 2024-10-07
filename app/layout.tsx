import { Inter as FontSans } from 'next/font/google';
import localFont from 'next/font/local';
import { Analytics } from '@vercel/analytics/react';
import '@/styles/globals.css';
import { cn } from '@/lib/utils';
import { siteConfig } from '@/config/site';
import Loading from './loading';
import { Suspense } from 'react';
export const metadata = {
  title: {
    default: siteConfig.name,
  },
  description: siteConfig.description,

  keywords: [
    'Swop',
    'Swop digital buisness card',
    'Swop nfc card',
    'Swop microsites',
    'NFC with microsites',
    'Swop web3 wallet',
    'Ethereum wallet',
    'ENS',
    'Solana',
    'Polygon',
  ],
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
  og: {
    site_name: siteConfig.name,
    type: 'website',
    locale: 'en_US',
    image: '/images/android-chrome-192x192.png',
  },
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    type: 'website',
    images: [
      {
        url: '/images/android-chrome-192x192.png',
        width: 192,
        height: 192,
        alt: siteConfig.name,
      },
      {
        url: '/images/android-chrome-512x512.png',
        width: 512,
        height: 512,
        alt: siteConfig.name,
      },
    ],
  },
  assetlinks: '/.well-known/assetlinks.json',
  appleAppSiteAssociation: '/.well-known/apple-app-site-association',
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
