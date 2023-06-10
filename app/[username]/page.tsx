import Image from 'next/image';
import vCard from 'vcards-js';
import { saveAs } from 'file-saver';
import SocialSmall from '@/components/socialSmall';
import SocialLarge from '@/components/socialLarge';
import InfoBar from '@/components/infoBar';
import PaymentBar from '@/components/paymentBar';
import Contact from '@/components/contact';
import Footer from '@/components/footer';
import { Toaster } from '@/components/ui/toaster';
import { Metadata } from 'next';
import { CardSkeleton } from '@/components/card-skeleton';
import { Fragment } from 'react';

const APP_URL = process.env.NEXT_PUBLIC_APP_URL;

const wait = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));
interface PageProps {
  params: {
    username: string;
  };
}

async function getUserData(username: string) {
  const res = await fetch(
    `${APP_URL}/api/user?username=${username}`,
    {
      next: { revalidate: 60 },
    }
  );
  const data = await res.json();

  return data;
}

type User = {
  data: any;
};

// export async function generateMetadata ({params}: PageProps): Promise<Metadata>{

//   const res = await fetch(`${APP_URL}/api/user?username=${params.username}`)
//   const data = (await res.json()) as User

//   const {name, bio, } = data.data;

//   return {
//     title: name,
//     description: bio,
//   }
// }

export default async function PublicProfile({ params }: PageProps) {
  await wait(1000);
  const { data, error } = await getUserData(params.username);
  if (error) {
    return <div>failed to load</div>;
  }
  if (!data) {
    return <div>loading...</div>;
  }

  const {
    name,
    bio,
    profilePic,
    backgroundImg,
    info,
    gatedAccess,
    direct,
    parentId,
  } = data;
  // console.log(info);

  return (
    <>
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
          <div className="absolute top-4 left-4 cursor-pointer">
            <Image
              className="object-fill w-6 h-6 sm:w-8 sm:h-8"
              src="/connect.png"
              alt="Connect"
              width={30}
              height={30}
            />
          </div>
          <div className="absolute top-4 right-4 cursor-pointer">
            <Image
              className="object-fill w-6 h-6 sm:w-8 sm:h-8"
              src="/notification.png"
              alt="Notification"
              width={30}
              height={30}
            />
          </div>
          <div className="absolute flex items-center justify-center transition-all w-28 h-28 bottom-0 left-0 right-0 mx-auto">
            <div className="border-4 rounded-full border-white shadow-lg">
              <Image
                className="object-fill w-full h-24 sm:h-full rounded-full"
                src="/rakib.webp"
                alt="Next.js Logo"
                width={120}
                height={120}
                priority
              />
            </div>
          </div>
        </div>
        <div className="my-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-center">
            {name}
          </h1>
          <p className="text-sm sm:text-md text-center">{bio}</p>
        </div>
        <div className="flex flex-row flex-wrap justify-evenly gap-4">
          {info?.socialTop &&
            info.socialTop.map((social: any) => (
              <SocialSmall
                key={social.name}
                data={social}
                socialType="socialTop"
                parentId={parentId}
              />
            ))}
        </div>
        <div className="flex flex-row flex-wrap justify-evenly gap-4 my-8">
          {info?.socialLarge &&
            info.socialLarge.map((social: any) => (
              <SocialLarge
                key={social.name}
                data={social}
                socialType="socialLarge"
                parentId={parentId}
              />
            ))}
        </div>
        <div className="w-full my-2">
          {info?.infoBar &&
            info.infoBar.map((social: any) => (
              <InfoBar
                key={social._id}
                data={social}
                socialType="infoBar"
                parentId={parentId}
              />
            ))}
        </div>
        <div className="w-full my-2 bg-slate-300 p-3 rounded-[28px]">
          {info?.product &&
            info.product.map((social: any) => (
              <PaymentBar
                key={social._id}
                data={social}
                socialType="product"
                parentId={parentId}
              />
            ))}
        </div>
        <div className="w-full my-2 bg-slate-300 p-3 rounded-[28px]">
          {info?.contact &&
            info.contact.map((social: any) => (
              <Contact
                key={social._id}
                data={social}
                socialType="contact"
                parentId={parentId}
              />
            ))}
        </div>
        <div>
          <Footer brandIcon="/brand-icon.svg" />
        </div>
      </main>
      <Toaster />
    </>
  );
}
