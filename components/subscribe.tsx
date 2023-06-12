import { FC } from 'react';
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
    group: string;
  };
  socialType: string;
  parentId: string;
  number: number;
}

const Subscribe: FC<Props> = ({
  data,
  socialType,
  parentId,
  number,
}) => {
  return (
    <>
      <DialogHeader>
        <DialogTitle>
          Subscribe to Unlock Exclusive Content
        </DialogTitle>
        <DialogDescription>
          To get in touch with{' '}
          <span className="font-bold">Rakibul Islam</span>, please
          fill out the following form with accurate information. Your
          privacy is important to us, and all the data provided will
          be handled in accordance with our privacy policy.
        </DialogDescription>
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
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">
                Phone Number*
              </Label>
              <Input
                id="phone"
                value=""
                placeholder="+880XXXXXXXXXXX"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="job" className="text-right">
                Job Title
              </Label>
              <Input
                id="job"
                value=""
                placeholder="Software Engineer"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="wallet" className="text-right">
                Wallet Address
              </Label>
              <Input
                id="wallet"
                value=""
                placeholder="0x..."
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="website" className="text-right">
                Website
              </Label>
              <Input
                id="website"
                value=""
                placeholder="www.website.com"
                className="col-span-3"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <DialogFooter>
        <Button type="submit">Subscribe</Button>
      </DialogFooter>
    </>
  );
};

export default Subscribe;
