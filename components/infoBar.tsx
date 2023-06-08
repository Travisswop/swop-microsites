import { FC } from 'react';
import Image from 'next/image';
interface Props {
  name: string;
  url: string;
  icon: string;
}

const InfoBar: FC<Props> = ({ name, url, icon }) => {
  return (
    <div className="flex flex-row gap-2 items-center bg-slate-300 p-3 rounded-[28px]">
      <div>
        <Image
          className="object-fill w-full h-20 rounded-[24px] shadow-lg"
          src="/images/icon_small/Twitter.svg"
          alt="Twitter Logo"
          width={80}
          height={80}
          priority
        />
      </div>
      <div>
        <p className="text-md font-semibold">Twitter</p>
        <p className="text-xs">Twitter</p>
      </div>
    </div>
  );
};

export default InfoBar;
