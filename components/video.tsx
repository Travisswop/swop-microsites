'use client';
import { FC } from 'react';
import { motion } from 'framer-motion';
import YouTube from 'react-youtube';
import { useEffect, useState } from 'react';

interface Props {
  link: string;
}

const variants = {
  hidden: { opacity: 0, x: 0, y: 25 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: -0, y: 25 },
};

const Video: FC<Props> = ({ link }) => {
  const [windowSize, setWindowSize] = useState<{
    width?: number;
    height?: number;
  }>({
    width: 420,
    height: 220,
  });

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 400) {
        setWindowSize({
          width: 360,
          height: 200,
        });
      } else {
        setWindowSize({
          width: 420,
          height: 220,
        });
      }
    }

    window.addEventListener('resize', handleResize);

    // Call the handler initially to set the initial window dimensions
    handleResize();

    // Clean up the event listener on unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const opts = {
    height: windowSize.height,
    width: windowSize.width,
    playerVars: {
      autoplay: 0,
    },
  };

  const videourl = link.split('=');
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
      className="rounded-lg overflow-hidden"
    >
      <YouTube videoId={videourl[1]} opts={opts} />
    </motion.div>
  );
};

export default Video;
