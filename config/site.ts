import { SiteConfig } from '@/types/sites';

// swop is a web2 microsite builder and a web3 wallet that bridges the gap between web2 and web3 by providing a simple way to create a microsite and a web3 wallet.
export const siteConfig: SiteConfig = {
  name: 'SWOP: Your Gateway Between Web2 and Web3 Worlds',
  description:
    "SWOP enables users and businesses to seamlessly transition into the Web3 ecosystem. Whether you're interacting with decentralized applications (dApps), managing crypto wallets, or exploring blockchain-based solutions, SWOP simplifies the process and enhances accessibility.",
  url: `${process.env.NEXT_PUBLIC_APP_URL}`,
  ogImage: `${process.env.NEXT_PUBLIC_APP_URL}/og.jpg`,
  links: {
    twitter: 'https://twitter.com/swop0x',
  },
};
