'use client';
import { FC } from 'react';
import { downloadVCard } from '@/lib/vCardUtils';
import { toast } from '@/components/ui/use-toast';

interface Props {
  data: any;
}

const openLink = async (
  social: any,
  parentId: string | undefined,
  socialType: string | undefined
) => {
  const { _id, group, name, value, url } = social;
  console.log('🚀 ~ file: redirect.tsx:16 ~ name:', name);
  try {
    await fetch('https://app.apiswop.co/web/updateCount', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        socialType,
        socialId: _id,
        parentId,
      }),
    });
  } catch (err) {
    console.log(err);
  }
  if (typeof window === 'undefined') {
    return;
  }
  switch (group) {
    case 'social':
      if (name === 'YouTube') {
        return window.open(value, '_self');
      }
      if (name === 'Snapchat') {
        return window.open(`${url}/add/${value}`, '_self');
      }
      return window.open(`${url}${value}`, '_self');

    case 'contact':
      if (name === 'Whatsapp') {
        return window.open(`https://wa.me/${value}?`, '_self');
      }
      if (name === 'FaceTime') {
        return window.open(value, '_self');
      }
      if (name === 'Address') {
        const urllink = `https://maps.google.com/maps?q=${value}`;
        return window.open(urllink, '_self');
      }
      return window.open(`${url}${value}`, '_self');

    case 'music':
      return window.open(value, '_self');

    case 'payment':
      if (name === 'Venmo') {
        return window.open(
          `https://venmo.com/${value}?txn=0`,
          '_self'
        );
      }
      if (name === 'CashApp') {
        return window.open(`${url}${value}/0`, '_self');
      }
      return window.open(value, '_self');

    case 'crypto':
      navigator.clipboard.writeText(value);
      toast({
        title: 'Copied to clipboard',
      });
      return;
    case 'more':
      return window.open(value, '_self');

    default:
      return window.open(value, '_self');
  }
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
  const { direct, info, parentId } = data;

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
  return <></>;
};

export default Redirect;
