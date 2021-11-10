import React from 'react';

export const Cell = ({ id, explored, flagged, dispatch, neighborBombs, isBomb }) => {
  const flagCell = e => {
    e.preventDefault();
    if (explored) return;
    dispatch({ type: 'flag', payload: { id } });
  };

  const exploreCell = e => {
    e.preventDefault();
    if (flagged) return;
    dispatch({ type: 'explore', payload: { id } });
  };

  return (
    <div
      className='cell'
      onContextMenu={flagCell}
      onClick={exploreCell}
      style={{
        backgroundColor: flagged ? 'blue' : explored ? 'rgba(150, 150, 150, 0.5)' : 'dodgerblue'
      }}
    >
      {explored ? (isBomb ? 'X' : neighborBombs ? neighborBombs : '') : ''}
    </div>
  );
};
