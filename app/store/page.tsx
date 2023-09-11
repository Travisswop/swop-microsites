'use client';
import MobileDetect from 'mobile-detect';

const md = new MobileDetect(
  'Mozilla/5.0 (Linux; U; Android 4.0.3; en-in; SonyEricssonMT11i' +
    ' Build/4.1.A.0.562) AppleWebKit/534.30 (KHTML, like Gecko)' +
    ' Version/4.0 Mobile Safari/534.30'
);
export default function Store() {
  if (typeof window !== 'undefined') {
    if (md?.os() === 'AndroidOS') {
      return window.open(
        'https://play.google.com/store/apps/details?id=com.travisheron.swop&fbclid=IwAR2nRw3Ey1N0RQhFhNUfBUNA-77I_3Z7iNgJjIchiY4-5WhA7jjGLMetSTo',
        '_self'
      );
    } else if (md?.os() === 'iOS') {
      return window.open(
        'https://apps.apple.com/us/app/swopnew/id1593201322?fbclid=IwAR3yh6c7ri7DK56JEeXyOsIZHzJ4ZGNCJidFuZj-j4UCRXN8BxaK49HD3-I#?platform=iphone',
        '_self'
      );
    } else {
      return window.open('https://www.swopme.co/', '_self');
    }
  }
}
