import React from 'react';

export const StatusDisplay = ({ gameStatus }) => {
  const renderStatus = gameStatus => {
    switch (gameStatus) {
      case 'game-over':
        return 'GAME OVER!';
      case 'game-won':
        return 'You Won!';
      default:
        return '';
    }
  };

  return <div className='status'>{renderStatus(gameStatus)}</div>;
};
