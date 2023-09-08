import Bio from "@/components/bio";
import Contact from "@/components/contact";
import Footer from "@/components/footer";
import GatedAccess from "@/components/gatedAccess";
import Header from "@/components/header";
import InfoBar from "@/components/infoBar";
import PaymentBar from "@/components/paymentBar";
import Redirect from "@/components/redirect";
import SocialLarge from "@/components/socialLarge";
import SocialSmall from "@/components/socialSmall";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Toaster } from "@/components/ui/toaster";
import Video from "@/components/video";
import { Metadata } from "next";
import Custom404 from "./404";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL;

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
interface PageProps {
  params: {
    username: string;
  };
}

async function getUserData(username: string) {
  const res = await fetch(
    `https://app.apiswop.co/api/v2/web/user/${username}`,
    { next: { revalidate: 0 } }
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
    `https://app.apiswop.co/api/v2/web/user/${params.username}`
  );

  const data = (await res.json()) as User;
  if (!data.data) {
    return {};
  }

  const shortcutIcon = data.data.profilePic.includes("https")
    ? data.data.profilePic
    : `/images/avatar/${data.data.profilePic}.png`;

  return {
    title: data.data.name,
    description: data.data.bio,
    icons: {
      icon: shortcutIcon,
      shortcut: shortcutIcon,
      apple: [
        { url: shortcutIcon },
        { url: shortcutIcon, sizes: "57x57", type: "image/png" },
        { url: shortcutIcon, sizes: "60x60", type: "image/png" },
        { url: shortcutIcon, sizes: "72x72", type: "image/png" },
        { url: shortcutIcon, sizes: "76x76", type: "image/png" },
        { url: shortcutIcon, sizes: "114x114", type: "image/png" },
        { url: shortcutIcon, sizes: "180x180", type: "image/png" },
        { url: shortcutIcon, sizes: "228x228", type: "image/png" },
      ],
    },
    openGraph: {
      title: data.data.name,
      description: data.data.bio,
      url: `${APP_URL}/sp/${params.username}`,
      type: "website",
      images: [
        {
          url: shortcutIcon,
          width: 200,
          height: 200,
          alt: data.data.name,
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
  } = data;

  if (!gatedAccess && direct) {
    return (
      <>
        {" "}
        <Redirect data={data} /> <Toaster />
      </>
    );
  }

  return (
    <>
      <main className="flex max-w-md mx-auto min-h-screen flex-col items-center px-4">
        <Header
          avatar={profilePic}
          cover={backgroundImg}
          name={name}
          parentId={parentId}
          micrositeId={_id}
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
          <div className="flex mt-6 w-full">
            <Video link={info.videoUrl[0].videoUrl} />
          </div>
        )}
        <div className="flex flex-row flex-wrap justify-evenly gap-4 sm:gap-10 my-8">
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
        <div className="w-full">
          <div>
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
          <div>
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
          <div>
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
        </div>
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
