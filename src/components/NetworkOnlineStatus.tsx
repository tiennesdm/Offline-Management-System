import React, { useEffect, useState } from 'react';
import { OFFLINE_MESSAGE, OFFLINE_MESSAGE_FEATURE, ONLINE_MESSAGE } from '../locale/locale';

const NetworkOnlineStatus: React.FC = () => {
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);

  const handleOnline = () => {
    setIsOnline(true);
  };

  const handleOffline = () => {
    setIsOnline(false);
  };

  useEffect(() => {
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <div>
      <h1>{isOnline ? ONLINE_MESSAGE : OFFLINE_MESSAGE }</h1>
      {!isOnline && <p>{OFFLINE_MESSAGE_FEATURE}</p>}
    </div>
  );
};

export default NetworkOnlineStatus;
