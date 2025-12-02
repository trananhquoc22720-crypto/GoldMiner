export type ItemType = 'gold-small' | 'gold-medium' | 'gold-large' | 'rock' | 'gem';

export interface GoldObject {
  id: string;
  type: ItemType;
  x: number;
  y: number;
  radius: number;
  value: number;
  weight: number;
  collected: boolean;
  captured?: boolean;
}

export interface MinerObject {
  x: number;
  y: number;
  animationFrame: number;
}

export type HookState = 'idle' | 'shooting' | 'retracting' | 'pulling';

export interface HookObject {
  angle: number; // radians
  length: number;
  state: HookState;
}

export interface GameState {
  score: number;
  timeLeft: number; // seconds
  golds: GoldObject[];
  miner: MinerObject;
  hook: HookObject;
  isRunning: boolean;
  level: number;
}

export interface LevelItemSeed {
  type: ItemType;
  x: number;
  y: number;
  radius: number;
  value: number;
  weight: number;
}

export interface LevelConfig {
  timeLimit: number; // seconds
  targetScore: number;
  items: LevelItemSeed[];
}
