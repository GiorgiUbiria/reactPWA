import { useState, useEffect } from 'react';

const useAppBadge = () => {
  const [counter, setCounter] = useState(0);

  const setBadge = () => {
    const newCounter = counter + 1;
    setCounter(newCounter);
    updateBadge(newCounter);
  };

  const clearBadge = () => {
    setCounter(0);
    updateBadge(0);
  };

  const updateBadge = (count) => {
    if (navigator.setAppBadge) {
      navigator.setAppBadge(count);
    } else if (navigator.setClientBadge) {
      navigator.setClientBadge({ count });
    }
  };

  useEffect(() => {
    if (counter > 0) {
      updateBadge(counter);
    }
  }, [counter]);

  return [setBadge, clearBadge];
};

export default useAppBadge;
