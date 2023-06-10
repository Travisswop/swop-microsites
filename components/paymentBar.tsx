import { FC } from 'react';
import Image from 'next/image';
interface Props {
  data: {
    _id: string;
    micrositeId: string;
    title: string;
    paymentUrl: string;
    imageUrl: string;
    description: string;
    price: number;
  };
  socialType: string;
  parentId: string;
}

const PaymentBar: FC<Props> = ({ data, socialType, parentId }) => {
  const {
    _id,
    micrositeId,
    title,
    paymentUrl,
    imageUrl,
    description,
    price,
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
    return window.open(paymentUrl, '_self');
  };
  return (
    <div className="flex justify-between items-center">
      <div className="flex flex-row gap-2 items-center ">
        <div>
          <Image
            className="object-fill w-full h-20 rounded-[24px] shadow-lg"
            src={imageUrl}
            alt={title}
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
      <div>
        <span className="font-bold">${price}</span>
      </div>
    </div>
  );
};

export default PaymentBar;
