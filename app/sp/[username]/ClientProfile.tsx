'use client';

import { useState, useEffect } from 'react';
import { getUserData } from '../../actions/user';
import Header from '@/components/header';
import Bio from '@/components/bio';
import Blog from '@/components/blog';
import SocialLarge from '@/components/socialLarge';
import SocialSmall from '@/components/socialSmall';
import Ens from '@/components/ens';
import MP3 from '@/components/mp3';
import Referral from '@/components/referral';
import Redeem from '@/components/redeem';
import EmbedVideo from '@/components/embedvideo';
import Message from '@/components/message';
import Contact from '@/components/contact';
import InfoBar from '@/components/infoBar';
import PaymentBar from '@/components/paymentBar';
import Footer from '@/components/footer';
import GatedAccess from '@/components/gatedAccess';
import { Toaster } from '@/components/ui/toaster';
import Image from 'next/image';
import styles from '@/styles/styles.module.css';
import { background } from '@/lib/icons';
import { redirect } from 'next/navigation';

export default function ClientProfile({
  initialData,
}: {
  initialData: any;
}) {
  const [data, setData] = useState(initialData);
  if (data.redirect) {
    redirect(`/sp/${data.data.username}`);
  }

  useEffect(() => {
    const refreshData = async () => {
      try {
        const freshData = await getUserData(data.username);
        setData(freshData);
      } catch (error) {
        console.error('Error refreshing data:', error);
      }
    };
  }, [data.username]);

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
  } = data.data;

  const ensDomain = info.ensDomain[info.ensDomain.length - 1];

  const bg =
    typeof backgroundImg === 'string' &&
    backgroundImg.startsWith('https')
      ? backgroundImg
      : background[backgroundImg as keyof typeof background];

  return (
    <div>
      {theme && (
        <div className={styles.bgWrap}>
          <Image
            alt="Mountains"
            src={bg}
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
          <div
            className="flex flex-row flex-wrap justify-center
           gap-6 px-6 py-4"
          >
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
          <div className="flex flex-row flex-wrap justify-evenly gap-4 sm:gap-10 my-4">
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

        <div className="mt-4"></div>

        {/* Message */}
        {/* ENS */}
        {info?.ensDomain && info.ensDomain.length > 0 && (
          <div className="w-full">
            <Message
              number={0}
              key={ensDomain._id}
              data={ensDomain}
              socialType="ens"
              parentId={parentId}
            />
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

        {/* ENS */}
        {info?.ensDomain && info.ensDomain.length > 0 && (
          <div className="w-full">
            <Ens
              number={0}
              key={ensDomain._id}
              data={ensDomain}
              socialType="ens"
              parentId={parentId}
            />
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
          <div className="w-full mt-1">
            {info.audio.map((social: any, index: number) => (
              <MP3
                number={index}
                key={social._id}
                data={social}
                socialType="audio"
                parentId={parentId}
                length={info.audio.length}
              />
            ))}
          </div>
        )}

        {/* Video */}
        {info?.video && info.video.length > 0 && (
          <div className="w-full">
            {info.video.map((social: any, index: number) => (
              <div key={index} className="my-2">
                <video
                  className="w-full h-76 max-w-full border border-gray-200 rounded-lg dark:border-gray-700"
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
        gatedAccess={gatedAccess}
        gatedInfo={gatedInfo}
      />
    </div>
  );
}
