'use client';

import { FC } from 'react';
import Image from 'next/image';
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
}

const InfoBar: FC<Props> = ({ data, socialType, parentId }) => {
  const {
    _id,
    micrositeId,
    title,
    link,
    description,
    iconName,
    iconPath,
    group,
  } = data;

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
    return window.open(link, '_self');
  };

  return (
    <div
      onClick={openlink}
      className="flex flex-row gap-2 items-center bg-slate-300 p-3 rounded-[28px]"
    >
      <div>
        <Image
          className="object-fill w-full h-20 rounded-[24px] shadow-lg"
          src={
            iconPath
              ? iconPath
              : `/images/social_icon/${iconName}.svg`
          }
          alt="Twitter Logo"
          width={80}
          height={80}
          priority
        />
      </div>
      <div>
        <p className="text-md font-semibold">{title}</p>
        <p className="text-xs">{description}</p>
      </div>
    </div>
  );
};

export default InfoBar;
