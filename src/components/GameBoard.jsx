import React from 'react';

export const GameBoard = ({ width, height }) => {
  const renderCells = ({ width, height }) => {
    const cells = [];
    for (let cell = 0; cell < width * height; cell++) {
      cells.push(<div className='cell' key={cell}></div>);
    }
    return cells;
  };

  return (
    <div className='game-board' style={{ gridTemplateColumns: `repeat(${width}, auto)` }}>
      {renderCells({ width, height })}
    </div>
  );
};
