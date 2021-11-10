import React, { useState } from 'react';

export const Cell = () => {
  const [explored, setExplored] = useState(false);
  const [flagged, setFlagged] = useState(false);

  const flagCell = e => {
    e.preventDefault();
    setFlagged(!flagged);
  };

  const exploreCell = e => {
    e.preventDefault();
    if (flagged) return;
    setExplored(true);
  };

  return (
    <div
      className='cell'
      onContextMenu={flagCell}
      onClick={exploreCell}
      style={{ backgroundColor: flagged ? 'blue' : explored ? 'red' : 'dodgerblue' }}
    ></div>
  );
};
