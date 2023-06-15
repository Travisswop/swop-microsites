'use client';
import { FC, useState } from 'react';
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
  parentId: string;
  micrositeId: string;
}

const Header: FC<Props> = ({
  avatar,
  cover,
  name,
  parentId,
  micrositeId,
}) => {
  const [open, setOpen] = useState(false);
  const [openDC, setOpenDC] = useState(false);
  return (
    <div className="relative w-full h-60 mt-2">
      <div>
        <div className="overflow-hidden h-48 rounded-md border-[6px] border-white shadow-lg">
          <Image
            className="object-fill w-full h-full rounded-md"
            src={
              cover.includes('https')
                ? cover
                : `/images/coverphoto/${cover}.jpg`
            }
            alt={name}
            width={436}
            height={192}
            priority
          />
        </div>
        <div className="absolute top-4 left-4 cursor-pointer">
          <Dialog open={openDC} onOpenChange={setOpenDC}>
            <DialogTrigger>
              <Image
                className="object-fill w-8 h-8"
                src="/connect.png"
                alt="Connect"
                width={30}
                height={30}
              />
            </DialogTrigger>
            <DialogContent>
              <Connect
                data={{
                  name,
                  parentId,
                  micrositeId,
                  avatar,
                }}
                handler={() => setOpenDC(false)}
              />
            </DialogContent>
          </Dialog>
        </div>
        <div className="absolute top-4 right-4 cursor-pointer">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>
              <Image
                className="object-fill w-8 h-8"
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
                  parentId,
                  micrositeId,
                }}
                handler={() => setOpen(false)}
              />
            </DialogContent>
          </Dialog>
        </div>
        <div className="absolute flex items-center justify-center transition-all w-28 h-28 bottom-0 left-0 right-0 mx-auto">
          <div className="border-4 rounded-full border-white shadow-lg">
            <Image
              className="object-fill w-full h-full rounded-full"
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
        </div>
      </div>
    </div>
  );
};

export default Header;
