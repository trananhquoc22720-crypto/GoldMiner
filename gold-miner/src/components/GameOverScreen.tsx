import React from 'react';

interface GameOverScreenProps {
  score: number;
  onRestart: () => void;
}

const GameOverScreen: React.FC<GameOverScreenProps> = ({ score, onRestart }) => (
  <div className="gameover-screen">
    <h2>Game Over</h2>
    <div>Your Score: {score}</div>
    <button onClick={onRestart}>Restart</button>
  </div>
);

export default GameOverScreen;
