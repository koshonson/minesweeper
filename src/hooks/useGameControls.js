import { useState } from 'react';

export const useGameControls = (setGameStatus, setTimer, resetTime) => {
  const [resetWatcher, setResetWatcher] = useState(0);

  const startGame = () => {
    setGameStatus.on();
    setTimer(true);
  };

  const gameOver = () => {
    setGameStatus.over();
    setTimer(false);
  };

  const gameWon = () => {
    setGameStatus.won();
    setTimer(false);
  };

  const resetGame = () => {
    setGameStatus.ready();
    setTimer(false);
    resetTime();
    setResetWatcher(resetWatcher + 1);
  };

  return { startGame, gameOver, gameWon, resetGame, resetWatcher };
};
