import { useReducer } from 'react';

const initialSettings = {
  width: 10,
  height: 10,
  numMines: 15
};

const settingsReducer = (state, action) => {
  switch (action.type) {
    case 'set-width':
      return { ...state, width: +action.payload };
    case 'set-height':
      return { ...state, height: +action.payload };
    case 'set-mines':
      return { ...state, numMines: +action.payload };
    default:
      return state;
  }
};

export const useSettings = () => useReducer(settingsReducer, initialSettings);
