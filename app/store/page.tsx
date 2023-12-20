'use client';
import { useEffect } from 'react';
import { isAndroid, isIOS } from 'react-device-detect';

export default function Store() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (isAndroid) {
        window.open(
          'https://play.google.com/store/apps/details?id=com.travisheron.swop&fbclid=IwAR2nRw3Ey1N0RQhFhNUfBUNA-77I_3Z7iNgJjIchiY4-5WhA7jjGLMetSTo',
          '_self'
        );
      } else if (isIOS) {
        window.open(
          'https://apps.apple.com/us/app/swopnew/id1593201322?fbclid=IwAR3yh6c7ri7DK56JEeXyOsIZHzJ4ZGNCJidFuZj-j4UCRXN8BxaK49HD3-I#?platform=iphone',
          '_self'
        );
      } else {
        window.open('https://www.swopme.co/', '_self');
      }
    }
  }, []);

  return <div>Loading...</div>;
}
