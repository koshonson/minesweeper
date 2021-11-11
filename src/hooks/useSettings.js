import { useReducer } from 'react';

const initialSettings = {
  bombRate: 15,
  cellSize: 30,
  width: 10,
  maxWidth: 10,
  height: 10,
  maxHeight: 10,
  numMines: 15
};

export const SETTINGS_ACTIONS = {
  SET_WIDTH: 'set-width',
  SET_HEIGHT: 'set-height',
  SET_MINES: 'set-mines',
  SET_LIMITS: 'set-limits'
};

const settingsReducer = (state, action) => {
  switch (action.type) {
    case SETTINGS_ACTIONS.SET_WIDTH:
      if (+action.payload > state.maxWidth - 10 || +action.payload < 3) return state;
      return {
        ...state,
        width: +action.payload,
        numMines: Math.ceil(((state.width * state.height) / 100) * state.bombRate)
      };
    case SETTINGS_ACTIONS.SET_HEIGHT:
      if (+action.payload > state.maxHeight - 3 || +action.payload < 3) return state;
      return {
        ...state,
        height: +action.payload,
        numMines: Math.ceil(((state.width * state.height) / 100) * state.bombRate)
      };
    case SETTINGS_ACTIONS.SET_MINES:
      return { ...state, numMines: +action.payload };
    case SETTINGS_ACTIONS.SET_LIMITS:
      return {
        ...state,
        maxHeight: Math.floor((action.payload.height - 100) / (state.cellSize + 2)),
        maxWidth: Math.floor(action.payload.width / (state.cellSize + 2))
      };
    default:
      return state;
  }
};

export const useSettings = () => useReducer(settingsReducer, initialSettings);
