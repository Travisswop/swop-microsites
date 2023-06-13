'use client';
import { FC } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Subscribe from '@/components/subscribe';
import Connect from '@/components/connect';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
interface Props {
  avatar: string;
  cover: string;
  name: string;
}

const Header: FC<Props> = ({ avatar, cover, name }) => {
  return (
    <div className="relative w-full h-56 sm:h-64 mt-2">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.4,
          ease: [0, 0.71, 0.2, 1.01],
        }}
      >
        <div className="overflow-hidden rounded-md border-[6px] border-white shadow-lg">
          <Image
            className="object-fill w-full h-40 sm:h-48 rounded-md"
            src={
              cover.includes('https')
                ? cover
                : `/images/coverphoto/${cover}.jpg`
            }
            alt={name}
            width={420}
            height={200}
            priority
          />
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.4,
            delay: 0.4,
            ease: [0, 0.71, 0.2, 1.01],
          }}
          className="absolute top-4 left-4 cursor-pointer"
        >
          <Dialog>
            <DialogTrigger>
              <Image
                className="object-fill w-6 h-6 sm:w-8 sm:h-8"
                src="/connect.png"
                alt="Connect"
                width={30}
                height={30}
              />
            </DialogTrigger>
            <DialogContent>
              <Connect
                data={{
                  _id: '',
                  micrositeId: '',
                  title: '',
                  link: '',
                  description: '',
                  iconName: '',
                  iconPath: '',
                  name,
                  avatar,
                }}
                socialType={''}
                parentId={''}
                number={0}
              />
            </DialogContent>
          </Dialog>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.4,
            delay: 0.4,
            ease: [0, 0.71, 0.2, 1.01],
          }}
          className="absolute top-4 right-4 cursor-pointer"
        >
          <Dialog>
            <DialogTrigger>
              <Image
                className="object-fill w-6 h-6 sm:w-8 sm:h-8"
                src="/notification.png"
                alt="Notification"
                width={30}
                height={30}
              />
            </DialogTrigger>
            <DialogContent>
              <Subscribe
                data={{
                  name,
                }}
              />
            </DialogContent>
          </Dialog>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.4,
            delay: 0.8,
            ease: [0, 0.71, 0.2, 1.01],
          }}
          className="absolute flex items-center justify-center transition-all w-28 h-28 bottom-0 left-0 right-0 mx-auto"
        >
          <div className="border-4 rounded-full border-white shadow-lg">
            <Image
              className="object-fill w-full h-24 sm:h-full rounded-full"
              src={
                avatar.includes('https')
                  ? avatar
                  : `/images/avatar/${avatar}.png`
              }
              alt={name}
              width={120}
              height={120}
              priority
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Header;
