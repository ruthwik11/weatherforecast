import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

/**
 * Card wrapper for CardSwap. Rounded, cream bg. All cards get black border.
 */
export function Card({ children, className = '', ...props }) {
  return (
    <div
      className={cn('rounded-[24px] bg-[#d1ccc8] p-8 shadow-xl w-full max-w-lg border-2 border-black', className)}
      {...props}
    >
      {children}
    </div>
  );
}

/**
 * Stacked card carousel: cardDistance, verticalDistance, delay (ms), pauseOnHover.
 * Use with Card children. Container min 600px.
 */
export default function CardSwap({
  children,
  cardDistance = 60,
  verticalDistance = 70,
  delay = 5000,
  pauseOnHover = true,
  className = '',
}) {
  const cards = Array.isArray(children) ? children.filter(Boolean) : [children];
  const [index, setIndex] = useState(0);
  const [hover, setHover] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (pauseOnHover && hover) return;
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % cards.length);
    }, delay);
    return () => clearInterval(timerRef.current);
  }, [delay, cards.length, pauseOnHover, hover]);

  return (
    <div
      className={cn('relative w-full flex items-center justify-center', className)}
      onMouseEnter={() => pauseOnHover && setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ minHeight: 'inherit' }}
    >
      <div className="relative w-full max-w-2xl mx-auto" style={{ height: 'min(72vh, 560px)', minHeight: 420 }}>
        {cards.map((card, i) => {
          const offset = (i - index + cards.length) % cards.length;
          const isTop = offset === 0;
          const isPrev = offset === cards.length - 1;
          const isNext = offset === 1;
          const baseRot = 4;
          let y = 0;
          let rot = 0;
          let z = 0;
          let scale = 1;
          let opacity = 1;

          if (isTop) {
            y = 0;
            rot = 0;
            z = 30;
            scale = 1;
          } else if (isNext) {
            y = verticalDistance;
            rot = baseRot;
            z = 20;
            scale = 0.96;
            opacity = 0.95;
          } else if (isPrev) {
            y = -verticalDistance;
            rot = -baseRot;
            z = 10;
            scale = 0.96;
            opacity = 0.95;
          } else {
            y = (offset > 1 ? 1 : -1) * verticalDistance * Math.min(offset, 2);
            rot = (offset > 1 ? 1 : -1) * baseRot * Math.min(offset, 2);
            z = 0;
            scale = 0.9;
            opacity = 0.6;
          }

          return (
            <div
              key={i}
              className="absolute inset-0 flex items-center justify-center cursor-pointer transition-all duration-500 ease-out"
              style={{
                transform: `translateY(${y}px) rotate(${rot}deg) scale(${scale})`,
                zIndex: z,
                opacity,
                pointerEvents: isTop ? 'auto' : 'none',
              }}
              onClick={() => isTop && setIndex((idx) => (idx + 1) % cards.length)}
            >
              {card}
            </div>
          );
        })}
      </div>
    </div>
  );
}
