import './styles/app.css';
import React, { useReducer } from 'react';

import {GameBoard} from './components/GameBoard.jsx';

const reducer = (state, action) => {
  switch(action.type) {
    case 'set-width':
      return {...state, width: action.payload};
    case 'set-height':
      return {...state, height: action.payload};
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, {width: 10, height: 10});

  return (
    <div className="app">
      <div className="control-panel">
        <label htmlFor="board-width">Board width:</label>
        <input type="number" name="board-width" value={state.width} onChange={e => dispatch({type: 'set-width', payload: e.target.value})} />
        <label htmlFor="board-height">Board height:</label>
        <input type="number" name="board-height" value={state.height} onChange={e => dispatch({type: 'set-height', payload: e.target.value})} />
      </div>
      <GameBoard width={state.width} height={state.height} />
    </div>
  )
}

export default App
