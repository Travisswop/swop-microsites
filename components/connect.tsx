import { FC } from 'react';
import Image from 'next/image';
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

interface Props {
  data: {
    _id: string;
    micrositeId: string;
    title: string;
    link: string;
    description: string;
    iconName: string;
    iconPath: string;
    name: string;
    avatar: string;
  };
  socialType: string;
  parentId: string;
  number: number;
}

const Connect: FC<Props> = ({
  data,
  socialType,
  parentId,
  number,
}) => {
  return (
    <>
      <div className="border-4 w-24 rounded-full border-white shadow-lg mx-auto">
        <Image
          className="object-fill w-full h-full rounded-full"
          src={
            data.avatar.includes('https')
              ? data.avatar
              : `/images/avatar/${data.avatar}.png`
          }
          alt={data.name}
          width={120}
          height={120}
          priority
        />
      </div>
      <DialogHeader>
        <DialogTitle className="text-center">
          Share your info to Connect with {data.name}
        </DialogTitle>
      </DialogHeader>
      <Card>
        <CardContent>
          <div className="grid gap-4 ">
            <div className="grid grid-cols-4 items-center gap-4 pt-6">
              <Label htmlFor="name" className="text-right">
                Name*
              </Label>
              <Input
                id="name"
                value=""
                placeholder="John Doe"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email*
              </Label>
              <Input
                id="email"
                value=""
                type="email"
                placeholder="john@gmail.com"
                className="col-span-3"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <DialogFooter>
        <Button type="submit">Connect</Button>
      </DialogFooter>
    </>
  );
};

export default Connect;
