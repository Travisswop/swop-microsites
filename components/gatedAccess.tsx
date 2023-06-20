'use client';
import { FC, useState, CSSProperties } from 'react';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/components/ui/alert';
import Image from 'next/image';
import Link from 'next/link';
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  WagmiConfig,
  createConfig,
  configureChains,
  mainnet,
  useAccount,
} from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { WalletConnect } from './walletConnect';
import { Terminal, BellRing } from 'lucide-react';
import ClipLoader from 'react-spinners/ClipLoader';

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

const { publicClient, webSocketPublicClient } = configureChains(
  [mainnet],
  [publicProvider()]
);

const config = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
});

const override: CSSProperties = {
  display: 'block',
  margin: '0 auto',
  borderColor: 'red',
};

const GatedAccess: FC<Props> = ({ data }) => {
  const {
    contractAddress,
    network,
    title,
    description,
    image,
    openseaLink,
    eventLink,
  } = data;

  const { address, isConnected } = useAccount();
  const [loading, setLoading] = useState(false);
  const [isTokenHolder, setTokenHolder] = useState(false);
  const [alertText, setAlertText] = useState('');

  const checkValidation = async () => {
    setLoading(true);
    setAlertText('');

    if (!isConnected) {
      alert('Please connect wallet first');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(
        `https://app.apiswop.co/api/v2/web/isTokenHolder/${address}/${contractAddress}/${network}`
      );
      const data = await res.json();
      console.log(
        '🚀 ~ file: gatedAccess.tsx:89 ~ checkValidation ~ data:',
        data
      );

      setTokenHolder(data.result.isHolderOfCollection);

      if (
        data.status === 'success' &&
        data.result.isHolderOfCollection
      ) {
        alert('You are a token holder');
      } else {
        setAlertText(data.result.errorText);
      }
    } catch (error) {
      console.error('Error:', error);
      setAlertText(
        'An error occurred while validating token access.'
      );
    }

    setLoading(false);
  };

  return (
    <WagmiConfig config={config}>
      <WalletConnect />
      <DialogHeader>
        <DialogTitle className="text-center">
          This website is token powered
        </DialogTitle>
      </DialogHeader>
      <DialogDescription className="container flex flex-col items-center">
        <div>
          <span>{title}</span>
        </div>
        <Link
          href={openseaLink}
          target="_blank"
          className="bg-primary text-sm font-medium text-primary-foreground px-5 py-2 rounded-full my-4"
        >
          Purchase Access
        </Link>
        <div className="border-4 w-2/3 rounded-lg border-white shadow-lg mx-auto">
          <Image
            className="object-fill w-full h-full rounded-lg"
            src={image}
            alt={title}
            width={220}
            height={220}
            priority
          />
        </div>

        <div className="mt-10">
          <Button onClick={checkValidation}>
            Verify token access{' '}
            <ClipLoader
              color="#ffffff"
              loading={loading}
              cssOverride={override}
              size={20}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </Button>
        </div>

        {!isTokenHolder && alertText && isConnected && (
          <Alert
            variant="destructive"
            className="mt-5 transform translate-y-0.5 transition-all "
          >
            <Terminal className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{alertText}</AlertDescription>
          </Alert>
        )}

        {isTokenHolder && isConnected && (
          <Alert className="mt-5  border-lime-500">
            <BellRing className="h-4 w-4" />
            <AlertTitle className="text-lime-700">
              Congratulations! Your are a NFT holder.
            </AlertTitle>
            <AlertDescription>
              <Link href={eventLink} className="underline">
                {eventLink}{' '}
              </Link>
            </AlertDescription>
          </Alert>
        )}
      </DialogDescription>
    </WagmiConfig>
  );
};

export default GatedAccess;
