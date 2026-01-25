import { Link } from 'react-router-dom';
import TextType from '@/components/ui/text-type';
import ClickSpark from '@/components/ui/click-spark';
import PixelCard from '@/components/ui/pixel-card';
import InstagramIcon from '@/components/ui/instagram-icon';
import LayoutWithDither from '@/components/layout/layout-with-dither';

const PANELS = [
  { name: 'Ruthwik', status: 'Student, first year', major: 'CSE', insta: '@root.wik' },
  { name: 'Aashish', status: 'Student, first year', major: 'CSIT', insta: '@nothingjust.8' },
  { name: 'Surya', status: 'Student, first year', major: 'EEE', insta: '@ft.suryaaa._' },
  { name: 'Revalya', status: 'Student, first year', major: 'CSE', insta: '@_.revzzz_' },
];

function PanelContent({ name, status, major, insta }) {
  return (
    <div className="absolute inset-0 flex flex-col justify-center p-6 text-left text-black font-playfair text-base md:text-lg gap-1">
      <TextType as="span" className="font-bold">• {name}</TextType>
      <TextType as="span">-- {status}</TextType>
      <TextType as="span">-- {major}</TextType>
      <span className="flex items-center gap-2 mt-2 text-black">
        <InstagramIcon size={20} className="shrink-0 text-black" />
        <TextType as="span">{insta}</TextType>
      </span>
    </div>
  );
}

export default function AboutUs() {
  return (
    <LayoutWithDither>
      <div className="relative min-h-screen flex flex-col p-6 md:p-10">
        <TextType as="h1" className="text-white font-playfair text-3xl md:text-4xl font-bold mb-2">
          ABOUT US : -
        </TextType>
        <div className="h-px w-1/2 max-w-xs bg-[#5c4a42] mb-6 md:mb-10" />
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 max-w-6xl w-full min-h-0">
          {PANELS.map((p, i) => (
            <PixelCard key={i} variant="pink" className="min-h-[220px] md:min-h-[280px]">
              <PanelContent {...p} />
            </PixelCard>
          ))}
        </div>
        <div className="mt-6 md:mt-10">
          <ClickSpark
            sparkColor="#fff"
            sparkSize={10}
            sparkRadius={15}
            sparkCount={8}
            duration={400}
            className="inline-block"
          >
            <Link to="/" className="text-white font-playfair underline">
              <TextType>← Back to Home</TextType>
            </Link>
          </ClickSpark>
        </div>
      </div>
    </LayoutWithDither>
  );
}
