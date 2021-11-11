import './styles/app.css';
import React from 'react';
import { useSettings } from './hooks/useSettings.js';

import { GameBoard } from './components/GameBoard.jsx';
import { SettingsPanel } from './components/SettingsPanel.jsx';

function App() {
  const [settings, dispatch] = useSettings();

  return (
    <div className='container'>
      <SettingsPanel settings={settings} dispatchSettings={dispatch} />
      <GameBoard settings={settings} />
    </div>
  );
}

export default App;
