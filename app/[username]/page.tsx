import Image from 'next/image';
import Header from '@/components/header';
import Bio from '@/components/bio';
import SocialSmall from '@/components/socialSmall';
import SocialLarge from '@/components/socialLarge';
import InfoBar from '@/components/infoBar';
import PaymentBar from '@/components/paymentBar';
import Contact from '@/components/contact';
import Footer from '@/components/footer';
import GatedAccess from '@/components/nftGated';
import { Toaster } from '@/components/ui/toaster';
import { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import { absoluteUrl } from '@/lib/utils';
import { motion, Variants } from 'framer-motion';
import Video from '@/components/video';
import Connect from '@/components/connect';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
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
      next: { revalidate: 1 },
    }
  );
  const data = await res.json();

  return data;
}

type User = {
  data: any;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const res = await fetch(
    `${APP_URL}/api/user?username=${params.username}`
  );
  const data = (await res.json()) as User;

  if (!data.data) {
    return {};
  }

  const url = process.env.NEXT_PUBLIC_APP_URL;

  // const ogUrl = new URL(`${url}/api/og`);

  const shortcutIcon = data.data.profilePic.includes('https')
    ? data.data.profilePic
    : `/images/avatar/${data.data.profilePic}.png`;

  // ogUrl.searchParams.set('name', data.data.name);
  // ogUrl.searchParams.set('bio', siteConfig.name);
  // ogUrl.searchParams.set('avatar', shortcutIcon);
  // ogUrl.searchParams.set('mode', 'light');

  return {
    title: data.data.name,
    description: data.data.bio,
    // openGraph: {
    //   title: data.data.name,
    //   description: data.data.bio,
    //   type: 'website',
    //   url: absoluteUrl(`/${data.data.username}`),
    //   images: [
    //     {
    //       url: ogUrl.toString(),
    //       width: 800,
    //       height: 400,
    //       alt: data.data.name,
    //     },
    //   ],
    // },
    // twitter: {
    //   card: 'summary_large_image',
    //   title: data.data.name,
    //   description: data.data.bio,
    //   images: [ogUrl.toString()],
    // },
    icons: {
      icon: shortcutIcon,
      shortcut: shortcutIcon,
      apple: shortcutIcon,
    },
  };
}

const variants = {
  hidden: { opacity: 0, x: 0, y: 25 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: -0, y: 25 },
};

export default async function PublicProfile({ params }: PageProps) {
  // await wait(10000);
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
    gatedInfo,
  } = data;

  console.log(data.gatedInfo);

  return (
    <>
      <main className="flex max-w-md mx-auto min-h-screen flex-col items-center">
        <Header
          avatar={profilePic}
          cover={backgroundImg}
          name={name}
        />
        <div className="my-4">
          <Bio name={name} bio={bio} />
        </div>
        <div className="flex flex-row flex-wrap justify-evenly gap-4">
          {info?.socialTop &&
            info.socialTop.map((social: any, index: number) => (
              <SocialSmall
                number={index}
                key={social.name}
                data={social}
                socialType="socialTop"
                parentId={parentId}
              />
            ))}
        </div>
        {info.videoUrl.length > 0 && (
          <div className="flex mt-8 mx-5">
            <Video link={info.videoUrl[0].videoUrl} />
          </div>
        )}
        <div className="flex flex-row flex-wrap justify-evenly gap-4 my-8">
          {info?.socialLarge &&
            info.socialLarge.map((social: any, index: number) => (
              <SocialLarge
                number={index}
                key={social.name}
                data={social}
                socialType="socialLarge"
                parentId={parentId}
              />
            ))}
        </div>
        <div className="w-full my-2">
          {info?.infoBar &&
            info.infoBar.map((social: any, index: number) => (
              <InfoBar
                number={index}
                key={social._id}
                data={social}
                socialType="infoBar"
                parentId={parentId}
              />
            ))}
        </div>
        <div className="w-full my-2">
          {info?.product &&
            info.product.map((social: any, index: number) => (
              <PaymentBar
                number={index}
                key={social._id}
                data={social}
                socialType="product"
                parentId={parentId}
              />
            ))}
        </div>
        <div className="w-full my-2 ">
          {info?.contact &&
            info.contact.map((social: any, index: number) => (
              <Contact
                number={index}
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
      {/* {wait(50000)} */}
      <Dialog open={gatedAccess && gatedInfo.error === false}>
        <DialogContent>
          <GatedAccess
            data={{
              contractAddress: gatedInfo.contractAddress,
              eventLink: gatedInfo.eventLink,
              network: gatedInfo.network,
              tokenId: gatedInfo.tokenId,
              title: gatedInfo.title,
              description: gatedInfo.description,
              image: gatedInfo.image,
              openseaLink: gatedInfo.openseaLink,
            }}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
