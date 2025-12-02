import React from 'react';

interface StartScreenProps {
  onStart: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => (
  <div className="start-screen">
    <h1>Gold Miner</h1>
    <button onClick={onStart}>Start Game</button>
  </div>
);

export default StartScreen;
