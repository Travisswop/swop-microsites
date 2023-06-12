import { FC } from 'react';
import { CardSkeleton } from '@/components/card-skeleton';
interface LoadingProps {}

const Loading: FC<LoadingProps> = () => {
  return (
    <div className="flex max-w-md mx-auto min-h-screen flex-col">
      <CardSkeleton />
    </div>
  );
};

export default Loading;
