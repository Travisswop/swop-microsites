import { FC } from 'react';
import Image from 'next/image';
interface Props {
  name: string;
  url: string;
  icon: string;
  desc: string;
  price: string;
}

const PaymentBar: FC<Props> = ({ name, url, icon, desc, price }) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex flex-row gap-2 items-center ">
        <div>
          <Image
            className="object-fill w-full h-20 rounded-[24px] shadow-lg"
            src={icon}
            alt={name}
            width={80}
            height={80}
            priority
          />
        </div>
        <div>
          <p className="text-md font-semibold">{name}</p>
          <p className="text-xs">{desc}</p>
        </div>
      </div>
      <div>
        <span className="font-bold">${price}</span>
      </div>
    </div>
  );
};

export default PaymentBar;
