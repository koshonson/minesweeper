import React from 'react';
import { Cell } from './Cell.jsx';

export const GameBoard = ({ width, height }) => {
  const renderCells = ({ width, height }) => {
    const cells = [];
    for (let cell = 0; cell < width * height; cell++) {
      cells.push(<Cell key={cell} />);
    }
    return cells;
  };

  return (
    <main className='main-content'>
      <div className='game-board' style={{ gridTemplateColumns: `repeat(${width}, auto)` }}>
        {renderCells({ width, height })}
      </div>
      <div className='game-display' style={{ height: `calc(32px * ${height})` }}></div>
    </main>
  );
};
