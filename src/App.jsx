import './styles/app.css';
import React, { useReducer } from 'react';

import { GameBoard } from './components/GameBoard.jsx';
import { ControlPanel } from './components/ControlPanel.jsx';

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

function App() {
  const [settings, dispatch] = useReducer(settingsReducer, { width: 10, height: 10, numMines: 10 });

  return (
    <div className='container'>
      <ControlPanel settings={settings} dispatch={dispatch} />
      <GameBoard settings={settings} />
    </div>
  );
}

export default App;
