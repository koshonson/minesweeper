import React from 'react';

export const Timer = ({ time }) => {
  const parseTime = time => {
    const minutes = '0' + Math.floor(time / 60);
    const seconds = '0' + (time - minutes * 60);
    return { minutes: minutes.slice(-2), seconds: seconds.slice(-2) };
  };

  return (
    <div className='timer'>
      <span>{parseTime(time).minutes}</span>:<span>{parseTime(time).seconds}</span>
    </div>
  );
};
