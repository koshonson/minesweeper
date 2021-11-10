import './styles/app.css';
import React, { useReducer } from 'react';

import { GameBoard } from './components/GameBoard.jsx';
import { ControlPanel } from './components/ControlPanel.jsx';

const reducer = (state, action) => {
  switch (action.type) {
    case 'set-width':
      return { ...state, width: action.payload };
    case 'set-height':
      return { ...state, height: action.payload };
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, { width: 10, height: 10 });

  return (
    <div className='container'>
      <ControlPanel state={state} dispatch={dispatch} />
      <GameBoard width={state.width} height={state.height} />
    </div>
  );
}

export default App;
