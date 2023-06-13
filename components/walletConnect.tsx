import { useAccount, useConnect, useEnsName } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { Button } from '@/components/ui/button';
export function WalletConnect() {
  const { address, isConnected } = useAccount();
  const { data: ensName } = useEnsName({ address });
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });

  if (isConnected)
    return (
      <div className="mt-5 text-center py-2 px-1 text-sm border-[2px] rounded-md border-orange-300">
        Wallet address:{' '}
        <span className="text-xs font-bold">
          {ensName ?? address}
        </span>{' '}
      </div>
    );
  return (
    <Button onClick={() => connect()} className="w-36 bg-rose-600">
      Connect Wallet
    </Button>
  );
}
