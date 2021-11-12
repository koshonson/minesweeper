import React from 'react';

export const ProgressBar = ({ explorable, explored, gameStatus }) => {
  const barColor = gameStatus => {
    switch (gameStatus) {
      case 'ready':
        return 'grey-bar';
      case 'game-over':
        return 'red-bar';
      case 'game-won':
        return 'green-bar';
      default:
        return 'blue-bar';
    }
  };

  return (
    <div className='progress-bar'>
      <progress className={barColor(gameStatus)} max={explorable} value={explored}>
        {explored}/{explorable}
      </progress>
    </div>
  );
};
