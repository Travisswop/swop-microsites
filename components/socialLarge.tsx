import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
interface Props {
  name: string;
  url: string;
  icon: string;
}

const SocialLarge: FC<Props> = ({ name, url, icon }) => {
  return (
    <Link
      href={url}
      className="flex flex-col gap-2 items-center justify-between"
    >
      <div>
        <Image
          className="object-fill w-full h-24 sm:h-28 rounded-[28px]"
          src={icon}
          alt={name}
          width={120}
          height={120}
          priority
        />
      </div>
      <p className="text-xs">{name}</p>
    </Link>
  );
};

export default SocialLarge;
