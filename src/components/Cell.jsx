import React from 'react';

export const Cell = props => {
  const { id, explored, flagged, dispatch, neighborBombs, isBomb, exploreArea } = props;

  const flagCell = e => {
    e.preventDefault();
    if (explored) return;
    dispatch({ type: 'flag', payload: { id } });
  };

  const exploreCell = e => {
    e.preventDefault();
    if (explored || flagged) return;
    const toBeExplored = exploreArea(props);
    dispatch({ type: 'explore-area', payload: { ids: toBeExplored } });
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
