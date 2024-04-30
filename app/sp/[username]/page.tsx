import Bio from '@/components/bio';
import Contact from '@/components/contact';
import Footer from '@/components/footer';
import GatedAccess from '@/components/gatedAccess';
import Header from '@/components/header';
import InfoBar from '@/components/infoBar';
import PaymentBar from '@/components/paymentBar';
import Redirect from '@/components/redirect';
import SocialLarge from '@/components/socialLarge';
import SocialSmall from '@/components/socialSmall';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Toaster } from '@/components/ui/toaster';
import { Metadata } from 'next';
import Custom404 from './404';
import Image from 'next/image';
import styles from '@/styles/styles.module.css';
import mountains from '@/public/images/background/1.png';
import { background } from '@/lib/icons';
import Message from '@/components/message';
import Ens from '@/components/ens';
import Blog from '@/components/blog';
import MP3 from '@/components/mp3';
import Referral from '@/components/referral';
import Redeem from '@/components/redeem';
import EmbedVideo from '@/components/embedvideo';

const APP_URL = process.env.NEXT_PUBLIC_APP_URL;
const API_URL = process.env.NEXT_PUBLIC_API_URL;

const wait = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));
interface PageProps {
  params: {
    username: string;
  };
}

async function getUserData(username: string) {
  const res = await fetch(`${API_URL}/api/v2/web/user/${username}`, {
    next: { revalidate: 0 },
  });
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
    `${API_URL}/api/v1/web/user/${params.username}`
  );

  const { data } = (await res.json()) as User;
  if (!data) {
    return {};
  }

  const { name, profilePic, bio } = data;

  const shortcutIcon = profilePic.includes('https')
    ? profilePic
    : `/images/avatar/${profilePic}.png`;

  return {
    title: name,
    description: bio,
    icons: {
      icon: shortcutIcon,
      shortcut: shortcutIcon,
      apple: [
        { url: shortcutIcon },
        { url: shortcutIcon, sizes: '57x57', type: 'image/png' },
        { url: shortcutIcon, sizes: '60x60', type: 'image/png' },
        { url: shortcutIcon, sizes: '72x72', type: 'image/png' },
        { url: shortcutIcon, sizes: '76x76', type: 'image/png' },
        { url: shortcutIcon, sizes: '114x114', type: 'image/png' },
        { url: shortcutIcon, sizes: '180x180', type: 'image/png' },
        { url: shortcutIcon, sizes: '228x228', type: 'image/png' },
      ],
    },
    openGraph: {
      title: name,
      description: bio,
      url: `${APP_URL}/sp/${params.username}`,
      type: 'website',
      images: [
        {
          url: shortcutIcon,
          width: 200,
          height: 200,
          alt: name,
        },
      ],
    },
  };
}

export default async function PublicProfile({ params }: PageProps) {
  // await wait(10000);
  const { data, error } = await getUserData(params.username);
  if (!data) {
    return <Custom404 />;
  }

  const {
    _id,
    name,
    bio,
    profilePic,
    backgroundImg,
    info,
    gatedAccess,
    direct,
    parentId,
    gatedInfo,
    theme,
    ens,
  }: {
    _id: string;
    name: string;
    bio: string;
    profilePic: string;
    backgroundImg: number | string;
    info: any;
    gatedAccess: boolean;
    direct: boolean;
    parentId: string;
    gatedInfo: any;
    theme: boolean;
    ens: string;
  } = data;

  if (!gatedAccess && direct) {
    return (
      <>
        {' '}
        <Redirect data={data} /> <Toaster />
      </>
    );
  }

  return (
    <>
      {theme && (
        <div className={styles.bgWrap}>
          <Image
            alt="Mountains"
            src={background[backgroundImg as keyof typeof background]}
            placeholder="blur"
            quality={100}
            fill
            sizes="100vw"
            style={{
              objectFit: 'cover',
            }}
          />
        </div>
      )}
      <main className="flex max-w-md mx-auto min-h-screen flex-col items-center px-4">
        <Header
          avatar={profilePic}
          cover={backgroundImg.toString()}
          name={name}
          parentId={parentId}
          micrositeId={_id}
          theme={theme}
        />
        <div className="my-4">
          <Bio name={name} bio={bio} />
        </div>

        {/* Social Media Small */}
        {info?.socialTop && info.socialTop.length > 0 && (
          <div className="flex flex-row flex-wrap justify-evenly gap-6 px-6 py-2">
            {info.socialTop.map((social: any, index: number) => (
              <SocialSmall
                number={index}
                key={social.name}
                data={social}
                socialType="socialTop"
                parentId={parentId}
              />
            ))}
          </div>
        )}

        {/* Blog */}
        {info?.blog && info.blog.length > 0 && (
          <div className="w-full mt-8">
            {info.blog.map((social: any, index: number) => (
              <Blog
                number={index}
                key={social._id}
                data={social}
                socialType="blog"
                parentId={parentId}
              />
            ))}
          </div>
        )}
        {/* Social Media Big */}
        {info?.socialLarge && info.socialLarge.length > 0 && (
          <div className="flex flex-row flex-wrap justify-evenly gap-4 sm:gap-10 my-8">
            {info.socialLarge.map((social: any, index: number) => (
              <SocialLarge
                number={index}
                key={index}
                data={social}
                socialType="socialLarge"
                parentId={parentId}
              />
            ))}
          </div>
        )}

        {/* Redeem Link */}
        {info?.redeemLink && info.redeemLink.length > 0 && (
          <div className="w-full">
            {info.redeemLink.map((social: any, index: number) => (
              <Redeem
                number={index}
                key={social._id}
                data={social}
                socialType="redeemLink"
                parentId={parentId}
              />
            ))}
          </div>
        )}

        {/* Referral Code */}
        {info.referral && info.referral.length > 0 && (
          <div className="w-full">
            {info.referral.map((social: any, index: number) => (
              <Referral
                number={index}
                key={social._id}
                data={social}
                socialType="referral"
                parentId={parentId}
              />
            ))}
          </div>
        )}

        {/* Ens Domain */}
        {info?.ensDomain && info.ensDomain.length > 0 && (
          <div className="w-full">
            {info.ensDomain.map((social: any, index: number) => (
              <Ens
                number={index}
                key={social._id}
                data={social}
                socialType="ens"
                parentId={parentId}
              />
            ))}
          </div>
        )}

        {/* Contact card */}
        {info?.contact && info.contact.length > 0 && (
          <div className="w-full">
            {info.contact.map((social: any, index: number) => (
              <Contact
                number={index}
                key={social._id}
                data={social}
                socialType="contact"
                parentId={parentId}
              />
            ))}
          </div>
        )}

        {/* InfoBar */}
        {info?.infoBar && info.infoBar.length > 0 && (
          <div className="w-full">
            {info.infoBar.map((social: any, index: number) => (
              <InfoBar
                number={index}
                key={social._id}
                data={social}
                socialType="infoBar"
                parentId={parentId}
              />
            ))}
          </div>
        )}

        {/* Product Payment */}
        {info?.product && info.product.length > 0 && (
          <div className="w-full">
            {info.product.map((social: any, index: number) => (
              <PaymentBar
                number={index}
                key={social._id}
                data={social}
                socialType="product"
                parentId={parentId}
              />
            ))}
          </div>
        )}

        {/* Audio */}
        {info?.audio && info.audio.length > 0 && (
          <div className="w-full">
            {info.audio.map((social: any, index: number) => (
              <MP3
                number={index}
                key={social._id}
                data={social}
                socialType="audio"
                parentId={parentId}
              />
            ))}
          </div>
        )}

        {/* Video */}
        {info?.video && info.video.length > 0 && (
          <div className="mt-5 mb-5 w-full">
            {info.video.map((social: any, index: number) => (
              <div key={index}>
                <video
                  className="w-full h-80 max-w-full border border-gray-200 rounded-lg dark:border-gray-700"
                  controls
                >
                  <source src={social.link} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            ))}
          </div>
        )}

        {/* Embeded Link */}
        {info?.videoUrl && info.videoUrl.length > 0 && (
          <div className="w-full">
            {info.videoUrl.map((social: any, index: number) => (
              <EmbedVideo
                number={index}
                key={social._id}
                data={social}
                socialType="videoUrl"
                parentId={parentId}
              />
            ))}
          </div>
        )}

        {/* Message */}
        <div>
          <Footer brandIcon="/brand-icon.svg" />
        </div>
      </main>
      <Toaster />
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
