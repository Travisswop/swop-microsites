'use client';

import { FC } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface Props {
  data: {
    _id: string;
    micrositeId: string;
    domain: string;
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

const Message: FC<Props> = ({
  data,
  socialType,
  parentId,
  number,
}) => {
  const { _id, domain } = data;

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
    return;
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
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 10,
        }}
        onClick={openlink}
        className="my-3 flex flex-row gap-2 items-center cursor-pointer bg-white shadow-xl p-2 rounded-[12px]"
      >
        <div>
          <Image
            className="object-fill w-16 h-16 rounded-[12px]"
            src="/images/outline-icons/message.svg"
            alt={domain}
            width={80}
            height={80}
            priority
          />
        </div>
        <div className="max-w-xs overflow-hidden">
          <div className="text-md font-semibold">Message Me</div>
          <div className="text-xs">
            Message me using the swop wallet
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Message;
