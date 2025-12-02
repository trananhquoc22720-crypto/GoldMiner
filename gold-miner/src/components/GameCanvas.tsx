import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { GameState, HookState } from '../types/game';
import { useGameLoop } from '../hooks/useGameLoop';
import { clamp, deg2rad } from '../utils/math';
import { pointInCircle } from '../utils/collision';

interface GameCanvasProps {
  state: GameState;
  onAction: (action: string) => void;
  onStateChange?: (partial: Partial<GameState>) => void;
}

const WIDTH = 800;
const HEIGHT = 500;
const ORIGIN = { x: WIDTH / 2, y: 80 };
const ANGLE_MIN = deg2rad(20);
const ANGLE_MAX = deg2rad(160);
const ANGULAR_SPEED = deg2rad(80); // deg/s
const ROPE_MIN = 40;
const ROPE_MAX = HEIGHT - 40;
const SHOOT_SPEED = 350; // px/s
const RETRACT_SPEED = 400; // px/s (base)

const GameCanvas: React.FC<GameCanvasProps> = ({ state, onAction, onStateChange }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [angle, setAngle] = useState(Math.PI / 2);
  const [dir, setDir] = useState<1 | -1>(1);
  const [rope, setRope] = useState(ROPE_MIN);
  const [hookState, setHookState] = useState<HookState>('idle');
  const [capturedId, setCapturedId] = useState<string | null>(null);
  const [ended, setEnded] = useState(false);

  const items = state.golds;

  const shoot = useCallback(() => {
    if (hookState === 'idle') setHookState('shooting');
  }, [hookState]);

  useEffect(() => {
    const handleClick = () => shoot();
    const el = canvasRef.current;
    if (el) el.addEventListener('click', handleClick);
    return () => {
      if (el) el.removeEventListener('click', handleClick);
    };
  }, [shoot]);

  const tip = useMemo(() => {
    const x = ORIGIN.x + rope * Math.cos(angle);
    const y = ORIGIN.y + rope * Math.sin(angle);
    return { x, y };
  }, [angle, rope]);

  const draw = useCallback(() => {
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    // background
    ctx.fillStyle = '#0e0e0e';
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    // ground
    ctx.fillStyle = '#2b2b2b';
    ctx.fillRect(0, HEIGHT - 60, WIDTH, 60);

    // items
    for (const it of items) {
      if (it.collected) continue;
      ctx.beginPath();
      const color = it.type.startsWith('gold') ? '#E0B100' : it.type === 'gem' ? '#48C0E0' : '#777777';
      ctx.fillStyle = color;
      ctx.arc(it.x, it.y, it.radius, 0, Math.PI * 2);
      ctx.fill();
    }

    // rope
    ctx.strokeStyle = '#cfcfcf';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(ORIGIN.x, ORIGIN.y);
    ctx.lineTo(tip.x, tip.y);
    ctx.stroke();

    // hook tip
    ctx.beginPath();
    ctx.fillStyle = '#ffffff';
    ctx.arc(tip.x, tip.y, 5, 0, Math.PI * 2);
    ctx.fill();

    // origin cap
    ctx.beginPath();
    ctx.fillStyle = '#aaaaaa';
    ctx.arc(ORIGIN.x, ORIGIN.y, 6, 0, Math.PI * 2);
    ctx.fill();
  }, [items, tip.x, tip.y]);

  const update = useCallback(
    (dt: number) => {
      // Update timer
      if (!ended && state.isRunning && onStateChange) {
        const t = Math.max(0, state.timeLeft - dt);
        onStateChange({ timeLeft: t });
        if (t === 0 && !ended) {
          setEnded(true);
          onAction('gameover');
          return;
        }
      }

      // Hook state machine
      if (hookState === 'idle') {
        let a = angle + dir * ANGULAR_SPEED * dt;
        if (a <= ANGLE_MIN) {
          a = ANGLE_MIN;
          setDir(1);
        } else if (a >= ANGLE_MAX) {
          a = ANGLE_MAX;
          setDir(-1 as -1);
        }
        setAngle(a);
      } else if (hookState === 'shooting') {
        const newLen = Math.min(ROPE_MAX, rope + SHOOT_SPEED * dt);
        setRope(newLen);
        // collision
        for (const it of items) {
          if (it.collected || it.captured) continue;
          if (pointInCircle(tip.x, tip.y, it.x, it.y, it.radius)) {
            it.captured = true;
            setCapturedId(it.id);
            setHookState('pulling');
            break;
          }
        }
        if (newLen >= ROPE_MAX && hookState === 'shooting') {
          setHookState('retracting');
        }
      } else if (hookState === 'retracting') {
        const newLen = Math.max(ROPE_MIN, rope - RETRACT_SPEED * dt);
        setRope(newLen);
        if (newLen <= ROPE_MIN) {
          setHookState('idle');
        }
      } else if (hookState === 'pulling') {
        const it = items.find((i) => i.id === capturedId);
        const weight = it?.weight ?? 1;
        const speed = RETRACT_SPEED / clamp(weight, 0.5, 5);
        const newLen = Math.max(ROPE_MIN, rope - speed * dt);
        setRope(newLen);
        // make item follow hook tip
        if (it && !it.collected) {
          it.x = tip.x;
          it.y = tip.y;
        }
        if (newLen <= ROPE_MIN) {
          // collect
          if (it && !it.collected && onStateChange) {
            it.collected = true;
            it.captured = false;
            onStateChange({
              score: state.score + it.value,
              golds: [...items],
            });
          }
          setCapturedId(null);
          setHookState('idle');
        }
      }

      draw();
    },
    [angle, dir, draw, ended, hookState, items, onAction, onStateChange, rope, state.isRunning, state.score, state.timeLeft, tip.x, tip.y]
  );

  useGameLoop(update, state.isRunning);

  return (
    <div className="game-canvas" style={{ display: 'flex', justifyContent: 'center' }}>
      <canvas ref={canvasRef} width={WIDTH} height={HEIGHT} style={{ border: '1px solid #333' }} />
    </div>
  );
};

export default GameCanvas;
