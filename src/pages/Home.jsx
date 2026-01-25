import { Link } from 'react-router-dom';
import TextType from '@/components/ui/text-type';
import ClickSpark from '@/components/ui/click-spark';

export default function Home() {
  return (
    <div
      className="min-h-screen border-[4px] border-[#5c4a42] bg-[#3d3634] flex flex-col"
      style={{ backgroundColor: '#3d3634' }}
    >
      <header className="flex justify-between items-center px-6 py-4">
        <TextType as="h1" className="text-white font-playfair text-4xl md:text-5xl font-bold">
          WEATHER FORECAST
        </TextType>
        <ClickSpark
          sparkColor="#fff"
          sparkSize={10}
          sparkRadius={15}
          sparkCount={8}
          duration={400}
          className="rounded-full bg-[#6b5d57] px-6 py-2.5 text-white font-playfair"
        >
          <Link to="/about" className="block text-white font-playfair">
            <TextType>ABOUT US</TextType>
          </Link>
        </ClickSpark>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <TextType className="text-white text-6xl md:text-8xl mb-4">~</TextType>
        <TextType className="text-white text-base md:text-lg max-w-2xl font-playfair">
          A clean, precise three-day weather forecast focused on what matters. Key conditions and
          temperatures, with smart alerts for rain and extreme conditions. Reliable data, minimal
          design, clear decisions.
        </TextType>
      </main>

      <footer className="flex justify-center pb-12">
        <ClickSpark
          sparkColor="#fff"
          sparkSize={10}
          sparkRadius={15}
          sparkCount={8}
          duration={400}
          className="rounded-lg bg-[#6b5d57] px-8 py-3 text-white font-playfair"
        >
          <Link to="/location" className="block text-white font-playfair">
            <TextType>GET STARTED</TextType>
          </Link>
        </ClickSpark>
      </footer>
    </div>
  );
}
