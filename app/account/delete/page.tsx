import Image from 'next/image';

import SocialLarge from '@/components/socialLarge';
import Footer from '@/components/footer';
import Delete from '@/components/deleteForm';

export default async function Account() {
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
      <Delete data={{ name: 'rakib' }} />

      <div>
        <Footer brandIcon="/brand-icon.svg" />
      </div>
    </main>
  );
}
