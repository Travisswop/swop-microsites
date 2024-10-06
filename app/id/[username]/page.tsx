import { redirect } from 'next/navigation';
import Custom404 from './404';
const API_URL = process.env.NEXT_PUBLIC_API_URL;

const wait = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));
interface PageProps {
  params: {
    username: string;
  };
}

async function getUserData(username: string) {
  const res = await fetch(
    `${API_URL}/api/v2/web/microsite/${username}.swop.id`,
    {
      next: { revalidate: 0 },
    }
  );
  const data = await res.json();
  return data;
}

export default async function PublicProfile({ params }: PageProps) {
  const { data, error } = await getUserData(params.username);
  console.log('data', data);
  if (!data || !data.web3enabled) {
    return <Custom404 />;
  }

  const {
    profileUrl,
  }: {
    profileUrl: string;
  } = data;

  redirect(profileUrl);
}
