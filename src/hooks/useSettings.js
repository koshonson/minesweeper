import { useReducer } from 'react';

const initialSettings = {
  width: 10,
  height: 10,
  numMines: 15
};

export const SETTINGS_ACTIONS = {
  SET_WIDTH: 'set-width',
  SET_HEIGHT: 'set-height',
  SET_MINES: 'set-mines'
};

const settingsReducer = (state, action) => {
  switch (action.type) {
    case SETTINGS_ACTIONS.SET_WIDTH:
      return { ...state, width: +action.payload };
    case SETTINGS_ACTIONS.SET_HEIGHT:
      return { ...state, height: +action.payload };
    case SETTINGS_ACTIONS.SET_MINES:
      return { ...state, numMines: +action.payload };
    default:
      return state;
  }
};

export const useSettings = () => useReducer(settingsReducer, initialSettings);
