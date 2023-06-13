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

const download = async (data: any) => {
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
        onClick={() => download(data)}
        className="mx-2  flex flex-row gap-2 items-center cursor-pointer bg-slate-300 p-3 rounded-[28px]"
      >
        <div>
          <Image
            className="object-fill w-full h-20 rounded-[24px] shadow-lg"
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
