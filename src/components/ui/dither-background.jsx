import { useRef, useEffect } from 'react';

const WAVE_COLOR = [61 / 255, 54 / 255, 52 / 255]; // #3d3634

// 8x8 Bayer matrix for dithering
const BAYER = [
  [0, 32, 8, 40, 2, 34, 10, 42],
  [48, 16, 56, 24, 50, 18, 58, 26],
  [12, 44, 4, 36, 14, 46, 6, 38],
  [60, 28, 52, 20, 62, 30, 54, 22],
  [3, 35, 11, 43, 1, 33, 9, 41],
  [51, 19, 59, 27, 49, 17, 57, 25],
  [15, 47, 7, 39, 13, 45, 5, 37],
  [63, 31, 55, 23, 61, 29, 53, 21],
].flat();

const COLOR_STEPS = 4;
const PIXEL_SIZE = 2;

function renderFrame(ctx, width, height, t) {
  if (!width || !height) return;
  ctx.clearRect(0, 0, width, height);
  const scale = 2;
  const w = Math.ceil(width / (PIXEL_SIZE * scale));
  const h = Math.ceil(height / (PIXEL_SIZE * scale));
  const waveSpeed = 0.02;
  const waveFreq = 0.015;
  const waveAmp = 0.4;

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const nx = x * waveFreq - t * waveSpeed;
      const ny = y * waveFreq;
      const n = Math.sin(nx) * Math.cos(ny) + Math.sin(nx * 1.3 + 1) * Math.cos(ny * 0.7);
      const raw = (n * 0.5 + 0.5) * waveAmp + 0.3;
      const bx = x % 8;
      const by = y % 8;
      const thresh = (BAYER[by * 8 + bx] / 64 - 0.5) * 0.15;
      let v = raw + thresh;
      v = Math.max(0, Math.min(1, v));
      const step = 1 / (COLOR_STEPS - 1);
      const q = Math.round(v / step) * step;
      const r = WAVE_COLOR[0] * q * 255;
      const g = WAVE_COLOR[1] * q * 255;
      const b = WAVE_COLOR[2] * q * 255;
      ctx.fillStyle = `rgb(${r},${g},${b})`;
      ctx.fillRect(x * PIXEL_SIZE * scale, y * PIXEL_SIZE * scale, PIXEL_SIZE * scale + 1, PIXEL_SIZE * scale + 1);
    }
  }
}

export default function DitherBackground({ className = '', children }) {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const tRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let w = 0;
    let h = 0;

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const loop = () => {
      tRef.current += 0.5;
      renderFrame(ctx, w, h, tRef.current);
      rafRef.current = requestAnimationFrame(loop);
    };

    resize();
    window.addEventListener('resize', resize);
    loop();
    return () => {
      window.removeEventListener('resize', resize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className={`relative min-h-screen w-full ${className}`}>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full object-cover -z-10"
        style={{ left: 0, top: 0, width: '100%', height: '100%' }}
        aria-hidden="true"
      />
      {children}
    </div>
  );
}

export { WAVE_COLOR };
