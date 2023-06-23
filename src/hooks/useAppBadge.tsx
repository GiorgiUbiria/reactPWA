import { useState, useEffect } from 'react';

type NavigatorWithBadge = Navigator & {
  setAppBadge?: (count: number) => void;
  setClientBadge?: ({ count }: { count: number }) => void;
};

const useAppBadge = (): [() => void, () => void] => {
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

  const updateBadge = (count: number) => {
    const navigatorWithBadge = navigator as NavigatorWithBadge;

    if (navigatorWithBadge.setAppBadge) {
      navigatorWithBadge.setAppBadge(count);
    } else if (navigatorWithBadge.setClientBadge) {
      navigatorWithBadge.setClientBadge({ count });
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