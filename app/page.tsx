import Image from 'next/image';

import SocialLarge from '@/components/socialLarge';
import Footer from '@/components/footer';
const socials = [
  {
    _id: 'Facebook',
    name: 'Facebook',
    url: 'https://www.facebook.com/swopmeapp',
    micrositeId: '',
    value: '',
    iconName: 'Facebook',
    iconPath: '',
    group: '',
  },
  {
    _id: 'Instagram',
    name: 'Instagram',
    url: 'https://www.instagram.com/swopme.app/',
    micrositeId: '',
    value: '',
    iconName: 'Instagram',
    iconPath: '',
    group: '',
  },
  {
    _id: 'Youtube',
    name: 'Youtube',
    url: 'https://www.youtube.com/channel/UCohnJ2WcoSIEaLbk9jqqoeg',
    micrositeId: '',
    value: '',
    iconName: 'Youtube',
    iconPath: '',
    group: '',
  },
  {
    _id: 'Twitter',
    name: 'Twitter',
    url: 'https://twitter.com/swop0x',
    micrositeId: '',
    value: '',
    iconName: 'Twitter',
    iconPath: '',
    group: '',
  },
  {
    _id: 'Linkedin',
    name: 'Linkedin',
    url: '#',
    micrositeId: '',
    value: '',
    iconName: 'Linkedin',
    iconPath: '',
    group: '',
  },
  {
    _id: 'TikTok',
    name: 'TikTok',
    url: '#',
    micrositeId: '',
    value: '',
    iconName: 'TikTok',
    iconPath: '',
    group: '',
  },
];

export default async function Home() {
  return (
    <main className="flex max-w-md mx-auto min-h-screen flex-col items-center">
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
        {socials.map((social, index) => (
          <SocialLarge
            number={index}
            key={social.name}
            data={social}
            socialType="socialLarge"
            parentId=""
          />
        ))}
      </div>
      <div>
        <Footer brandIcon="/brand-icon.svg" />
      </div>
    </main>
  );
}
