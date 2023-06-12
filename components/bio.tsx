'use client';
import { FC } from 'react';
import Image from 'next/image';
import { ToastAction } from '@/components/ui/toast';
import { useToast } from '@/components/ui/use-toast';
import { motion, Variants } from 'framer-motion';
interface Props {
  name: string;
  bio: number;
}

const variants = {
  hidden: { opacity: 0, x: 0, y: 25 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: -0, y: 25 },
};
const Bio: FC<Props> = ({ name, bio }) => {
  return (
    <motion.div
      initial="hidden"
      animate="enter"
      exit="exit"
      variants={variants}
      transition={{
        duration: 0.4,
        type: 'easeInOut',
      }}
    >
      <h1 className="text-2xl sm:text-3xl font-bold text-center">
        {name}
      </h1>
      <p className="text-sm sm:text-md text-center">{bio}</p>
    </motion.div>
  );
};

export default Bio;
