import React from 'react';

interface GameOverScreenProps {
  score: number;
  targetScore?: number;
  success?: boolean;
  onRestart: () => void;
  onNext?: () => void;
}

const GameOverScreen: React.FC<GameOverScreenProps> = ({ score, targetScore, success, onRestart, onNext }) => (
  <div className="gameover-screen" style={{ textAlign: 'center', padding: 16 }}>
    <h2>{success ? 'Level Complete!' : 'Game Over'}</h2>
    <div style={{ marginBottom: 8 }}>Your Score: {score}</div>
    {typeof targetScore === 'number' && (
      <div style={{ marginBottom: 16 }}>Target Score: {targetScore}</div>
    )}
    <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
      {success && onNext && <button onClick={onNext}>Next Level</button>}
      <button onClick={onRestart}>{success ? 'Restart Level' : 'Try Again'}</button>
    </div>
  </div>
);

export default GameOverScreen;
