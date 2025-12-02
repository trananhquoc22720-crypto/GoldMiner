export const pointInCircle = (px: number, py: number, cx: number, cy: number, r: number) => {
  const dx = px - cx;
  const dy = py - cy;
  return dx * dx + dy * dy <= r * r;
};
