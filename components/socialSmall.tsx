'use client';
import { FC } from 'react';
import Image from 'next/image';
import { ToastAction } from '@/components/ui/toast';
import { useToast } from '@/components/ui/use-toast';
interface Props {
  data: {
    _id: string;
    micrositeId: string;
    name: string;
    value: string;
    url: string;
    iconName: string;
    iconPath: string;
    group: string;
  };
  socialType: string;
  parentId: string;
}

const SocialSmall: FC<Props> = ({ data, socialType, parentId }) => {
  const { toast } = useToast();
  const {
    _id,
    micrositeId,
    name,
    value,
    url,
    iconName,
    iconPath,
    group,
  } = data;

  const openlink = async () => {
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

    switch (group) {
      case 'social':
        if (name === 'YouTube') {
          return window.open(value, '_self');
        }
        if (name === 'Snapchat') {
          return window.open(`${url}/add/${value}`, '_self');
        }
        return window.open(`${url}${value}`, '_self');

        break;
      case 'contact':
        if (name === 'WhatsApp') {
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
        break;
      case 'music':
        return window.open(value, '_self');
        break;
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
        break;
      case 'crypto':
        navigator.clipboard.writeText(value);
        toast({
          title: 'Copied to clipboard',
        });
        break;
      case 'more':
        return window.open(value, '_self');
        break;
      default:
        return window.open(value, '_self');
        break;
    }
  };

  return (
    <div
      onClick={openlink}
      className="flex flex-row gap-2 items-center justify-between bg-white  rounded-full px-5 py-2 sm:px-6 sm:py-2 shadow-xl cursor-pointer"
    >
      <div>
        <Image
          className="object-fill w-full h-4 sm:h-5 rounded-md"
          src={
            iconPath
              ? iconPath
              : `/images/social_icon/${iconName}.svg`
          }
          alt={iconName}
          width={20}
          height={20}
          priority
        />
      </div>
      <p className="text-xs">{name}</p>
    </div>
  );
};

export default SocialSmall;
