'use client';
import { FC } from 'react';
import Image from 'next/image';
import { downloadVCard } from '../lib/vCardUtils';
interface Props {
  data: {
    _id: string;
    micrositeId: string;
    name: string;
    mobileNo: string;
    email: string;
    address: string;
    websiteUrl: string;
  };
  socialType: string;
  parentId: string;
}

const download = async (data: any) => {
  const vCard = await downloadVCard(data);
  const blob = new Blob([vCard], { type: 'text/vcard' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.setAttribute('hidden', '');
  a.setAttribute('href', url);
  a.setAttribute('download', `${data.name}.vcf`);
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

const Contact: FC<Props> = ({ data, socialType, parentId }) => {
  const {
    _id,
    micrositeId,
    name,
    mobileNo,
    email,
    address,
    websiteUrl,
  } = data;

  return (
    <div
      onClick={() => download(data)}
      className="flex flex-row gap-2 items-center cursor-pointer"
    >
      <div>
        <Image
          className="object-fill w-full h-20 rounded-[24px] shadow-lg"
          src="/contacts-ios.svg"
          alt={name}
          width={80}
          height={80}
          priority
        />
      </div>
      <div>
        <p className="text-md font-semibold">{name}</p>
        <p className="text-xs">{mobileNo}</p>
      </div>
    </div>
  );
};

export default Contact;
