import { useState, useEffect } from 'react';

export const useTimer = () => {
  const [time, setTime] = useState(0);
  const [timer, setTimer] = useState(false);

  useEffect(() => {
    console.log('re-counting time');
    if (!timer) return;

    const timeout = setTimeout(() => {
      setTime(time + 1);
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [time, timer]);

  const resetTime = () => {
    setTime(0);
  };

  return { time, setTimer, resetTime };
};
