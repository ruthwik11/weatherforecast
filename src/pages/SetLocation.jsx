import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateLocation } from '@/lib/weather';
import { setLocation } from '@/lib/storage';
import TextType from '@/components/ui/text-type';
import ClickSpark from '@/components/ui/click-spark';
import LayoutWithDither from '@/components/layout/layout-with-dither';

const inputClass = 'w-full rounded px-3 py-3 bg-[#f5f1ed] font-playfair text-base';
const btnClass = 'rounded-full bg-[#3d3634] py-4 px-16 text-white font-playfair text-base';

export default function SetLocation() {
  const navigate = useNavigate();
  const [location, setLocationInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmed = location.trim();
    if (!trimmed) {
      alert('Please enter a location.');
      return;
    }
    setLoading(true);
    const result = await validateLocation(trimmed);
    if (!result.ok) {
      setLoading(false);
      alert(result.error || 'Invalid location. Please try again.');
      return;
    }
    setLocation(trimmed);
    setLoading(false);
    navigate('/forecast');
  };

  return (
    <LayoutWithDither>
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md rounded-[32px] bg-[#6b5d57] p-12">
          <TextType as="h1" className="text-white font-playfair text-3xl font-bold text-center block mb-2">
            SET YOUR LOCATION
          </TextType>
          <div className="h-px bg-white mb-8" />
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-white font-playfair mb-2">
                <TextType animate={false}>LOCATION :</TextType>
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocationInput(e.target.value)}
                placeholder="e.g. New York"
                className={inputClass}
                disabled={loading}
              />
            </div>
            <div className="flex justify-center">
              <ClickSpark
                sparkColor="#fff"
                sparkSize={10}
                sparkRadius={15}
                sparkCount={8}
                duration={400}
                className="inline-block"
              >
                <button type="submit" className={btnClass} disabled={loading}>
                  <TextType animate={false}>{loading ? 'Checking...' : 'CONTINUE'}</TextType>
                </button>
              </ClickSpark>
            </div>
          </form>
        </div>
      </div>
    </LayoutWithDither>
  );
}
