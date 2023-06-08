import Image from 'next/image';

import SocialLarge from '@/components/socialLarge';
import Footer from '@/components/footer';
const socials = [
  {
    name: 'Facebook',
    url: 'https://www.facebook.com/swopmeapp',
    icon: '/images/social_icon/Facebook.svg',
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/swopme.app/',
    icon: '/images/social_icon/Instagram.svg',
  },
  {
    name: 'Youtube',
    url: 'https://www.youtube.com/channel/UCohnJ2WcoSIEaLbk9jqqoeg',
    icon: '/images/social_icon/Youtube.svg',
  },
  {
    name: 'Twitter',
    url: 'https://twitter.com/swop0x',
    icon: '/images/social_icon/Twitter.svg',
  },
  {
    name: 'Linkedin',
    url: '#',
    icon: '/images/social_icon/Linkedin.svg',
  },
  {
    name: 'Tiktok',
    url: '#',
    icon: '/images/social_icon/Tiktok.svg',
  },
];
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center mx-2 sm:mx-0">
      <div className="relative w-full h-56 sm:h-64 mt-2">
        <div className="overflow-hidden rounded-md border-[6px] border-white shadow-lg">
          <Image
            className="object-fill w-full h-40 sm:h-48 rounded-md"
            src="/swop-cover.webp"
            alt="Next.js Logo"
            width={420}
            height={200}
            priority
          />
        </div>
        <div className="absolute flex items-center justify-center transition-all w-28 h-28 bottom-0 left-0 right-0 mx-auto">
          <div className="border-4 rounded-full border-white shadow-lg">
            <Image
              className="object-fill w-full h-24 sm:h-full rounded-full"
              src="/swop-logo.svg"
              alt="Next.js Logo"
              width={120}
              height={120}
              priority
            />
          </div>
        </div>
      </div>
      <div className="my-4">
        <h1 className="text-3xl font-bold text-center">SWOP</h1>
        <p className="text-md text-center">#swop</p>
      </div>
      <div className="flex flex-row flex-wrap justify-evenly gap-4 my-8">
        {socials.map((social) => (
          <SocialLarge
            key={social.name}
            name={social.name}
            url={social.url}
            icon={social.icon}
          />
        ))}
      </div>
      <div>
        <Footer brandIcon="/brand-icon.svg" />
      </div>
    </main>
  );
}
