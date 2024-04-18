'use client';

import { FC } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
interface Props {
  data: {
    _id: string;
    micrositeId: string;
    network: string;
    imageUrl: string;
    tokenUrl: string;
    link: string;
    mintName: string;
    mintLimit: number;
    amount: number;
    symbol: string;
    description: string;
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

const Redeem: FC<Props> = ({
  data,
  socialType,
  parentId,
  number,
}) => {
  const {
    _id,
    micrositeId,
    network,
    link,
    description,
    imageUrl,
    tokenUrl,
    mintName,
    mintLimit,
    amount,
  } = data;

  const openlink = async () => {
    try {
      await fetch(`${API_URL}/v1/web/updateCount`, {
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
    return window.open(link, '_self');
  };

  const delay = number + 0.1;

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
      className="w-full"
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 10,
        }}
        onClick={openlink}
        className="my-3 flex flex-row gap-2 items-center cursor-pointer bg-white shadow-2xl p-3 rounded-[12px] relative"
      >
        <div>
          <Image
            className="object-fill w-20 h-20 rounded-[12px]"
            src={imageUrl}
            alt={mintName}
            width={80}
            height={80}
            priority
          />
        </div>
        <div className="max-w-xs overflow-hidden">
          <div className="text-md font-semibold">{mintName}</div>
          <div className="text-xs">{description}</div>
        </div>
        <div className="absolute right-2 bottom-2">
          <Image src={tokenUrl} alt="redeem" width={18} height={18} />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Redeem;
