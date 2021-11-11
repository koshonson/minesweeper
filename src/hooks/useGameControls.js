import { useState } from 'react';

export const useGameControls = (setGameStatus, toggleTimer, resetTimer) => {
  const [resetWatcher, setResetWatcher] = useState(0);

  const startGame = () => {
    setGameStatus.on();
    toggleTimer();
  };

  const gameOver = () => {
    setGameStatus.over();
    toggleTimer();
  };

  const gameWon = () => {
    setGameStatus.won();
    toggleTimer();
  };

  const resetGame = () => {
    setGameStatus.ready();
    toggleTimer();
    resetTimer();
    setResetWatcher(resetWacther + 1);
  };

  return { startGame, gameOver, gameWon, resetGame, resetWatcher };
};
