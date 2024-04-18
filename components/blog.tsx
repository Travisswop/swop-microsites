'use client';

import { FC } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface Props {
  data: {
    _id: string;
    micrositeId: string;
    title: string;
    headline: string;
    description: string;
    image: string;
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

const Blog: FC<Props> = ({ data, socialType, parentId, number }) => {
  const { _id, micrositeId, title, headline, description, image } =
    data;

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
      <div className="w-full p-2 bg-white border rounded-lg shadow">
        <div className="relative w-full h-40 mb-2 overflow-hidden rounded-lg ">
          <Image
            src={image}
            alt={title}
            fill
            sizes="100vw"
            style={{
              objectFit: 'contain',
            }}
          />
        </div>
        <h5 className="text-xl font-bold text-gray-900 dark:text-white">
          {title}
        </h5>
        <p className="mb-5 text-sm text-gray-500 dark:text-gray-400">
          {headline}
        </p>
        <div className="flex items-end justify-end">
          <Link
            href="#"
            className="text-sm bg-slate-900 text-white rounded-full px-2 py-1"
          >
            Read More
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default Blog;
