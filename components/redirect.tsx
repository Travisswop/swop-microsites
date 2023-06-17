'use client';
import { FC, useEffect } from 'react';
import { downloadVCard } from '@/lib/vCardUtils';
import { toast, useToast } from '@/components/ui/use-toast';

interface Props {
  data: any;
}

const openLink = async (
  social: any,
  parentId: string | undefined,
  socialType: string | undefined
) => {
  console.log('🚀 ~ file: redirect.tsx:15 ~ social:', social);
  try {
    await fetch('https://app.apiswop.co/web/updateCount', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        socialType,
        socialId: social._id,
        parentId,
      }),
    });
  } catch (err) {
    console.log(err);
  }
  return window.open(social.videoUrl, '_self');
};

const download = async (
  data: any,
  parentId: string,
  socialType: string
) => {
  try {
    await fetch('https://app.apiswop.co/web/updateCount', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        socialType,
        socialId: data._id,
        parentId,
      }),
    });
  } catch (err) {
    console.log(err);
  }

  const vCard = await downloadVCard(data);
  const blob = new Blob([vCard], { type: 'text/vcard' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.setAttribute('hidden', '');
  a.setAttribute('href', url);
  a.setAttribute('download', `${data.name}.vcf`);
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

const Redirect: FC<Props> = ({ data }) => {
  const toast = useToast();

  useEffect(() => {
    const { direct, info, parentId } = data;
    console.log(
      '🚀 ~ file: redirect.tsx:117 ~ useEffect ~ data:',
      data
    );
    const redirectFunctions: { [key: string]: () => void } = {
      socialTop: () => {
        const social = info.socialTop.find(
          (item: { _id: any }) => item._id === direct.socialId
        );
        if (social) {
          openLink(social, parentId, direct.socialTypes);
        }
      },
      contact: () => {
        const contact = info.contact.find(
          (item: { _id: any }) => item._id === direct.socialId
        );
        if (contact) {
          download(contact, parentId, direct.socialTypes);
        }
      },
      product: () => {
        const product = info.product.find(
          (item: { _id: any }) => item._id === direct.socialId
        );
        if (product) {
          window.open(product.paymentUrl, '_self');
        }
      },
      socialLarge: () => {
        const socialLarge = info.socialLarge.find(
          (item: { _id: any }) => item._id === direct.socialId
        );
        if (socialLarge) {
          openLink(socialLarge, parentId, direct.socialTypes);
        }
      },
      infoBar: () => {
        const infoBar = info.infoBar.find(
          (item: { _id: any }) => item._id === direct.socialId
        );
        if (infoBar) {
          window.open(infoBar.link, '_self');
        }
      },
      video: () => {
        const embedvideo = info.videoUrl.find(
          (item: { _id: any }) => item._id === direct.socialId
        );
        if (embedvideo) {
          openLink(embedvideo, parentId, direct.socialTypes);
        }
      },
    };
    if (direct.socialTypes in redirectFunctions) {
      redirectFunctions[direct.socialTypes]();
    }
  }, [data]);

  return (
    <div>
      <h1>Redirect</h1>
    </div>
  );
};

export default Redirect;
