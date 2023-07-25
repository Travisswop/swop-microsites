'use client';
import { FC } from 'react';
import Image from 'next/image';
import { downloadVCard } from '../lib/vCardUtils';
import { motion } from 'framer-motion';
interface Props {
  data: {
    _id: string;
    micrositeId: string;
    name: string;
    mobileNo: string;
    email: string;
    address: string;
    websiteUrl: string;
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

const download = async (data: any, parentId: string) => {
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

  try {
    await fetch('https://app.apiswop.co/web/updateCount', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        socialType: 'contact',
        socialId: data._id,
        parentId,
      }),
    });
  } catch (err) {
    console.log(err);
  }
};

const Contact: FC<Props> = ({
  data,
  socialType,
  parentId,
  number,
}) => {
  const {
    _id,
    micrositeId,
    name,
    mobileNo,
    email,
    address,
    websiteUrl,
  } = data;
  const delay = number + 1 * 0.3;
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
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 10,
        }}
        onClick={() => download(data, parentId)}
        className="my-3 flex flex-row gap-2 items-center cursor-pointer bg-white shadow-2xl p-3 rounded-[12px]"
      >
        <div>
          <Image
            className="object-fill w-20 h-20  rounded-[12px]"
            src="/contacts-ios.svg"
            alt={name}
            width={80}
            height={80}
            priority
          />
        </div>
        <div>
          <div className="text-md font-semibold">{name}</div>
          <div className="text-xs">{mobileNo}</div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Contact;
