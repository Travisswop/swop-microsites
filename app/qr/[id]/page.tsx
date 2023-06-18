import { redirect } from 'next/navigation';
export default async function QR({
  params,
}: {
  params: { id: string };
}) {
  const fetchData = await fetch(
    `https://app.apiswop.co/web/qr/${params.id}`,
    { next: { revalidate: 1 } }
  );
  const data = await fetchData.json();

  if (data?.data?.micrositeUrl) {
    return redirect(data.data.micrositeUrl);
  }

  return redirect('https://www.swopme.co');
}
