import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

/**
 * Text with optional typewriter-style reveal. Use for every line.
 * Replace with: npx shadcn@latest add @react-bits/TextType-JS-TW
 */
export default function TextType({
  children,
  className = '',
  as: Comp = 'span',
  speed = 18,
  animate = true,
  ...props
}) {
  const isString = typeof children === 'string';
  const text = isString ? children : '';
  const [visible, setVisible] = useState(animate && isString ? '' : text);
  const [done, setDone] = useState(!animate || !isString);

  useEffect(() => {
    if (!animate || !text) {
      setVisible(text);
      setDone(true);
      return;
    }
    setVisible('');
    setDone(false);
  }, [text, animate]);

  useEffect(() => {
    if (!animate || !text || done) return;
    if (visible.length >= text.length) {
      setDone(true);
      return;
    }
    const t = setTimeout(() => setVisible(text.slice(0, visible.length + 1)), speed);
    return () => clearTimeout(t);
  }, [animate, text, visible, done, speed]);

  const C = Comp;
  const content = isString ? (
    <>
      {visible}
      {!done && <span className="animate-pulse opacity-70">|</span>}
    </>
  ) : (
    children
  );

  return (
    <C className={cn('font-playfair', className)} {...props}>
      {content}
    </C>
  );
}
