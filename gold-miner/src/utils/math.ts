export const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));
export const deg2rad = (deg: number) => (deg * Math.PI) / 180;
export const rad2deg = (rad: number) => (rad * 180) / Math.PI;
