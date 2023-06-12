'use client';
import { FC, useState } from 'react';
import Image from 'next/image';
import { WagmiConfig, createConfig, mainnet } from 'wagmi';
import { createPublicClient, http } from 'viem';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';

const APP_URL = process.env.NEXT_PUBLIC_APP_URL;

interface Props {
  data: {
    contractAddress: string;
    eventLink: string;
    network: string;
    tokenId: string;
    title: string;
    description: string;
    image: string;
    openseaLink: string;
  };
}

const GatedAccess: FC<Props> = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const checkValidation = async () => {
    const res = await fetch(`${APP_URL}/api/user?username=rakib`);
    const data = await res.json();

    console.log('data', data);
  };
  return (
    <>
      <DialogHeader>
        <DialogTitle className="text-center">
          This website is token powered
        </DialogTitle>
      </DialogHeader>
      <DialogDescription className="container flex flex-col items-center">
        <div>
          <span>{data.title}</span>
        </div>
        <Link
          href={data.openseaLink}
          target="_blank"
          className="bg-primary text-sm font-medium text-primary-foreground px-5 py-2 rounded-full my-4"
        >
          Purchase Access
        </Link>
        <div className="border-4 w-2/3 rounded-lg border-white shadow-lg mx-auto">
          <Image
            className="object-fill w-full h-full rounded-lg"
            src={data.image}
            alt={data.title}
            width={220}
            height={220}
            priority
          />
        </div>

        <div className="mt-10">
          <Button onClick={checkValidation}>
            Verify token access{' '}
          </Button>
        </div>
      </DialogDescription>
    </>
  );
};

export default GatedAccess;
