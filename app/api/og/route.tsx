import { ImageResponse } from '@vercel/og';

import { ogImageSchema } from '@/lib/validations/og';

export const runtime = 'edge';

const interRegular = fetch(
  new URL('../../../assets/fonts/Inter-Regular.ttf', import.meta.url)
).then((res) => res.arrayBuffer());

const interBold = fetch(
  new URL(
    '../../../assets/fonts/CalSans-SemiBold.woff',
    import.meta.url
  )
).then((res) => res.arrayBuffer());

export async function GET(req: Request) {
  try {
    const fontRegular = await interRegular;
    console.log('fontRegular', fontRegular);
    const fontBold = await interBold;

    const url = new URL(req.url);
    const values = ogImageSchema.parse(
      Object.fromEntries(url.searchParams)
    );
    const heading =
      values.bio.length > 140
        ? `${values.bio.substring(0, 140)}...`
        : values.bio;

    const { mode } = values;
    const paint = mode === 'dark' ? '#fff' : '#000';

    const fontSize = heading.length > 100 ? '70px' : '100px';

    return new ImageResponse(
      (
        <div
          tw="flex relative flex-col p-12 w-full h-full items-start"
          style={{
            color: paint,
            background:
              mode === 'dark'
                ? 'linear-gradient(90deg, #000 0%, #111 100%)'
                : 'white',
          }}
        >
          <div tw="flex flex-col flex-1 py-10 mx-auto">
            <div tw="flex w-full mx-auto">
              <img
                src={values.avatar}
                tw="w-[400px] h-[400px] rounded-md"
                style={{
                  objectFit: 'cover',
                  objectPosition: 'center',
                }}
              />
            </div>
            <div
              tw="flex leading-[1.1] text-[50px] font-bold"
              style={{
                fontFamily: 'Cal Sans',
                fontWeight: 'bold',
                fontSize,
              }}
            >
              {values.name}
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: 'Inter',
            data: fontRegular,
            weight: 400,
            style: 'normal',
          },
          {
            name: 'Cal Sans',
            data: fontBold,
            weight: 700,
            style: 'normal',
          },
        ],
      }
    );
  } catch (error) {
    return new Response(`Failed to generate image`, {
      status: 500,
    });
  }
}
