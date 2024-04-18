'use client';
import { FC } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface Props {
  data: {
    _id: string;
    micrositeId: string;
    title: string;
    paymentUrl: string;
    imageUrl: string;
    description: string;
    price: number;
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
const PaymentBar: FC<Props> = ({
  data,
  socialType,
  parentId,
  number,
}) => {
  const {
    _id,
    micrositeId,
    title,
    paymentUrl,
    imageUrl,
    description,
    price,
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
    return window.open(paymentUrl, '_self');
  };

  const delay = number + 1 * 0.2;

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
        onClick={() => openlink()}
        className="my-3 flex justify-between items-center cursor-pointer bg-white shadow-2xl p-3 rounded-[12px]"
      >
        <div className="flex flex-row gap-2 items-center ">
          <div>
            <Image
              className="object-fill w-20 h-20  rounded-[12px]"
              src={imageUrl}
              alt={title}
              width={80}
              height={80}
              priority
            />
          </div>
          <div>
            <div className="text-md font-semibold">{title}</div>
            <div className="text-xs">{description}</div>
          </div>
        </div>
        <div>
          <span className="font-bold">${price}</span>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PaymentBar;
