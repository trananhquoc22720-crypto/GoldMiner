import { LevelConfig } from './types/game';

export const LEVELS: LevelConfig[] = [
  {
    timeLimit: 60,
    targetScore: 500,
    items: [
      { type: 'gold-small', x: 150, y: 350, radius: 12, value: 50, weight: 1 },
      { type: 'gold-medium', x: 300, y: 380, radius: 18, value: 100, weight: 2 },
      { type: 'gold-large', x: 500, y: 420, radius: 26, value: 200, weight: 3 },
      { type: 'gem', x: 650, y: 360, radius: 10, value: 150, weight: 0.8 },
      { type: 'rock', x: 400, y: 440, radius: 20, value: 20, weight: 3.5 },
    ],
  },
];
