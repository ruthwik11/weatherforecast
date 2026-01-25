import DitherBackground from '@/components/ui/dither-background';

export default function LayoutWithDither({ children }) {
  return (
    <DitherBackground className="min-h-screen">
      <div className="relative min-h-screen">{children}</div>
    </DitherBackground>
  );
}
