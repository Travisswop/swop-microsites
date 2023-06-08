import { FC } from 'react';
import Image from 'next/image';
interface Props {
  name: string;
  url: string;
  phone: string;
}

const Contact: FC<Props> = ({ name, url, phone }) => {
  return (
    <div className="flex flex-row gap-2 items-center ">
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
        <p className="text-xs">{phone}</p>
      </div>
    </div>
  );
};

export default Contact;
