import { SiteConfig } from '@/types/sites';

export const siteConfig: SiteConfig = {
  name: 'SWOP - CONNECTING THE DIGITAL WORLD IN ONE TAP',
  description: 'Your Digital Business Card',
  url: `${process.env.NEXT_PUBLIC_APP_URL}`,
  ogImage: `${process.env.NEXT_PUBLIC_APP_URL}/og.jpg`,
  links: {
    twitter: 'https://twitter.com/swop0x',
  },
};
