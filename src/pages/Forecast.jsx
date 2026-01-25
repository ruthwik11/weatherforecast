import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getLocation, setLocation as saveLocation } from '@/lib/storage';
import { getCurrentWeather, getForecast } from '@/lib/weather';
import TextType from '@/components/ui/text-type';
import ClickSpark from '@/components/ui/click-spark';
import CardSwap, { Card } from '@/components/ui/card-swap';
import LayoutWithDither from '@/components/layout/layout-with-dither';

function DayCard({ label, loc, data, currentTemp, loading }) {
  if (loading || !data) {
    return (
      <>
        <TextType className="block text-center font-bold mb-2 text-lg">{label}</TextType>
        <div className="h-px bg-black/30 mb-4" />
        <TextType className="block text-center font-bold text-xl mb-2">{loc} →...</TextType>
        <div className="my-2" />
        <TextType className="block text-[#3d3634] text-base">MAX/MIN:</TextType>
        <TextType className="block text-[#3d3634] text-2xl font-bold">...</TextType>
        <div className="my-3" />
        <TextType className="block text-[#3d3634] text-base">• Loading...</TextType>
        <div className="border-t border-dashed border-black/30 my-3" />
        <TextType className="block text-[#3d3634] text-base">• RAIN ...</TextType>
        <TextType className="block text-[#3d3634] text-base">• WIND ...</TextType>
      </>
    );
  }

  const { max, min, description, rain, wind } = data;
  const displayTemp = (label === 'TODAY' && currentTemp !== null) ? currentTemp : max;
  const displayLoc = displayTemp !== null ? `${loc} →${displayTemp}°` : loc;

  return (
    <>
      <TextType className="block text-center font-bold mb-2 text-lg">{label}</TextType>
      <div className="h-px bg-black/30 mb-4" />
      <TextType className="block text-center font-bold text-xl mb-2">{displayLoc}</TextType>
      <div className="my-2" />
      <TextType className="block text-[#3d3634] text-base">MAX/MIN:</TextType>
      <TextType className="block text-[#3d3634] text-2xl font-bold">
        {max !== null && min !== null ? `${max}°/${min}°` : '...'}
      </TextType>
      <div className="my-3" />
      <TextType className="block text-[#3d3634] text-base capitalize">• {description || 'Clear'}</TextType>
      <div className="border-t border-dashed border-black/30 my-3" />
      <TextType className="block text-[#3d3634] text-base">• RAIN {rain !== null ? `${rain}%` : '0%'}</TextType>
      <TextType className="block text-[#3d3634] text-base">• WIND {wind !== null ? `${wind} KMPH` : '0 KMPH'}</TextType>
    </>
  );
}

export default function Forecast() {
  const navigate = useNavigate();
  const loc = getLocation() || 'Location';
  const [loading, setLoading] = useState(true);
  const [currentTemp, setCurrentTemp] = useState(null);
  const [forecast, setForecast] = useState([null, null, null]);

  useEffect(() => {
    if (!getLocation()) {
      navigate('/location');
      return;
    }
    
    const fetchWeather = async () => {
      setLoading(true);
      const [currentRes, forecastRes] = await Promise.all([
        getCurrentWeather(loc),
        getForecast(loc),
      ]);
      if (currentRes.ok) setCurrentTemp(currentRes.temp);
      if (forecastRes.ok) {
        setForecast(forecastRes.forecast);
      }
      setLoading(false);
    };
    if (loc && loc !== 'Location') fetchWeather();
    else setLoading(false);
  }, [loc, navigate]);

  const handleChangeLocation = () => {
    saveLocation(null);
    navigate('/location');
  };

  const labels = ['TODAY', 'TOMORROW', 'THE NEXT DAY'];

  return (
    <LayoutWithDither>
      <div className="relative min-h-screen flex flex-col">
        <div className="flex justify-end items-center gap-4 p-4 md:p-6">
          <ClickSpark
            sparkColor="#fff"
            sparkSize={10}
            sparkRadius={15}
            sparkCount={8}
            duration={400}
            className="inline-block"
          >
            <button onClick={handleChangeLocation} className="text-white font-playfair underline block">
              <TextType>Change location</TextType>
            </button>
          </ClickSpark>
          <ClickSpark
            sparkColor="#fff"
            sparkSize={10}
            sparkRadius={15}
            sparkCount={8}
            duration={400}
            className="inline-block"
          >
            <Link to="/" className="rounded-lg bg-[#6b5d57] px-5 py-2.5 text-white font-playfair block">
              <TextType animate={false}>Home</TextType>
            </Link>
          </ClickSpark>
        </div>
        <div className="flex-1 flex items-center justify-center px-4 pb-8" style={{ minHeight: '65vh' }}>
          <div className="w-full max-w-2xl flex-1 flex items-center justify-center" style={{ minHeight: '65vh', position: 'relative' }}>
            <CardSwap cardDistance={60} verticalDistance={70} delay={5000} pauseOnHover className="min-h-[65vh] w-full max-w-2xl">
              {labels.map((label, i) => (
                <Card key={i}>
                  <DayCard
                    label={label}
                    loc={loc}
                    data={forecast[i] || null}
                    currentTemp={i === 0 ? currentTemp : null}
                    loading={loading}
                  />
                </Card>
              ))}
            </CardSwap>
          </div>
        </div>
      </div>
    </LayoutWithDither>
  );
}
