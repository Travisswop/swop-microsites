'use client';

import { FC } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Tweet } from 'react-tweet';
import {
  TikTokEmbed,
  XEmbed,
  YouTubeEmbed,
} from 'react-social-media-embed';

interface Props {
  data: {
    _id: string;
    micrositeId: string;
    type: string;
    videoUrl: string;
  };
  socialType: string;
  parentId: string;
  number: number;
}

const variants = {
  hidden: { opacity: 0, x: 0, y: 25 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: -0, y: 25 },
};

const EmbedVideo: FC<Props> = async ({ data, number }) => {
  const { type, videoUrl } = data;
  console.log('data', data);
  let spotifyUrl;

  if (type === 'spotify') {
    const url = new URL(videoUrl);
    // https://open.spotify.com/playlist/37i9dQZF1DWUACcBjzMiIY?si=DP--7-zwR3CfUURp-xEnuA
    // Remove any additional path segments
    url.pathname = url.pathname.replace(/\/intl-\w+\//, '/');
    // Replace with embed URL
    spotifyUrl = url
      .toString()
      .replace('open.spotify.com', 'open.spotify.com/embed');
  }

  return (
    <motion.div
      initial="hidden"
      animate="enter"
      exit="exit"
      variants={variants}
      transition={{
        duration: 0.4,
        type: 'easeInOut',
      }}
      className="mt-3"
    >
      <motion.div
        whileHover={{ scale: 1.01 }}
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 10,
        }}
      >
        {type === 'twitter' ? (
          // <div data-theme="light">
          //   <Tweet id={videoId} />
          // </div>
          <div style={{}}>
            <XEmbed url={videoUrl} />
          </div>
        ) : type === 'tiktok' ? (
          <div style={{}}>
            <TikTokEmbed url={videoUrl} />
          </div>
        ) : type === 'youtube' ? (
          <div className="w-full overflow-hidden flex flex-col bg-white justify-center rounded-lg shadow-2xl">
            <YouTubeEmbed url={videoUrl} width="415" height="315" />
          </div>
        ) : type === 'spotify' ? (
          <div className="w-full overflow-hidden flex flex-col  justify-center shadow-2xl">
            <iframe
              src={spotifyUrl}
              height={400}
              allow="encrypted-media"
            ></iframe>
          </div>
        ) : (
          <div className="w-full overflow-hidden flex flex-col bg-white justify-center rounded-md">
            <div
              dangerouslySetInnerHTML={{
                __html: videoUrl,
              }}
            ></div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default EmbedVideo;
