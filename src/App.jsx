import './styles/app.css';
import React, { useEffect, useState } from 'react';

import { useWindowSize } from './hooks/useWindowSize';
import { useSettings } from './hooks/useSettings.js';
import { useGameStatus } from './hooks/useGameStatus';
import { useTimer } from './hooks/useTimer';
import { useGameControls } from './hooks/useGameControls';

import { GameBoard } from './components/GameBoard.jsx';
import { ControlPanel } from './components/ControlPanel.jsx';

function App() {
  const { width, height } = useWindowSize();
  const [settings, dispatchSettings] = useSettings(width, height);
  const [explored, setExplored] = useState(0);
  const [gameStatus, setGame] = useGameStatus();
  const { time, setTimer, resetTime } = useTimer();
  const controls = useGameControls(setGame, setTimer, resetTime);

  useEffect(() => {
    if (gameStatus !== 'ready') return;
    dispatchSettings({ type: 'set-limits', payload: { width, height } });
  }, [width, height]);

  return (
    <div className='container'>
      <ControlPanel
        settings={settings}
        dispatchSettings={dispatchSettings}
        explored={explored}
        gameStatus={gameStatus}
        time={time}
        controls={controls}
      />
      <GameBoard
        settings={settings}
        explored={explored}
        setExplored={setExplored}
        gameStatus={gameStatus}
        setGame={setGame}
        controls={controls}
      />
    </div>
  );
}

export default App;
