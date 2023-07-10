'use client';
import { FC } from 'react';
import Image from 'next/image';
import { ToastAction } from '@/components/ui/toast';
import { useToast } from '@/components/ui/use-toast';
import { motion, Variants } from 'framer-motion';
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
  number: number;
}

const variants = {
  hidden: { opacity: 0, x: 0, y: 25 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: -0, y: 25 },
};
const SocialSmall: FC<Props> = ({
  data,
  socialType,
  parentId,
  number,
}) => {
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

  const delay = 0.5;

  return (
    <motion.div
      initial="hidden"
      animate="enter"
      exit="exit"
      variants={variants}
      transition={{
        duration: 0.4,
        delay,
        type: 'easeInOut',
      }}
      onClick={openlink}
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 10,
        }}
        className="flex rounded-full cursor-pointer "
      >
        <div>
          <Image
            className="object-fill w-12 h-12 rounded-full"
            src={
              iconPath
                ? iconPath
                : `/images/social_logo/${iconName.toLowerCase()}.svg`
            }
            alt={iconName}
            width={20}
            height={20}
            priority
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SocialSmall;
