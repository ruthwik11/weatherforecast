const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

/**
 * Validate location exists in OpenWeatherMap
 */
export async function validateLocation(city) {
  try {
    const res = await fetch(`${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`);
    if (!res.ok) {
      if (res.status === 404) return { ok: false, error: 'Location not found.' };
      return { ok: false, error: 'Failed to validate location.' };
    }
    const data = await res.json();
    return { ok: true, data };
  } catch (err) {
    return { ok: false, error: 'Network error. Please try again.' };
  }
}

/**
 * Get current weather for a location
 */
export async function getCurrentWeather(city) {
  try {
    const res = await fetch(`${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`);
    if (!res.ok) return { ok: false, error: 'Failed to fetch weather.' };
    const data = await res.json();
    return {
      ok: true,
      temp: Math.round(data.main.temp),
      description: data.weather[0]?.description || 'Clear',
      main: data.weather[0]?.main || 'Clear',
    };
  } catch (err) {
    return { ok: false, error: 'Network error.' };
  }
}

/**
 * Get 3-day forecast (today, tomorrow, day after)
 */
export async function getForecast(city) {
  try {
    const res = await fetch(`${BASE_URL}/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`);
    if (!res.ok) return { ok: false, error: 'Failed to fetch forecast.' };
    const data = await res.json();

    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const days = [[], [], []]; // today, tomorrow, day after

    data.list.forEach((item) => {
      const itemDate = new Date(item.dt * 1000);
      const dayStart = new Date(itemDate.getFullYear(), itemDate.getMonth(), itemDate.getDate());
      const dayIndex = Math.floor((dayStart - todayStart) / (1000 * 60 * 60 * 24));
      if (dayIndex >= 0 && dayIndex < 3) {
        days[dayIndex].push(item);
      }
    });

    const forecast = days.map((dayItems, idx) => {
      if (dayItems.length === 0) {
        return {
          date: new Date(todayStart.getTime() + idx * 24 * 60 * 60 * 1000),
          temp: null,
          max: null,
          min: null,
          description: 'N/A',
          rain: 0,
          wind: 0,
        };
      }

      const temps = dayItems.map((i) => i.main.temp);
      const max = Math.round(Math.max(...temps));
      const min = Math.round(Math.min(...temps));
      const temp = Math.round(dayItems[0].main.temp);
      
      const descriptions = dayItems.map((i) => i.weather[0]?.description || 'clear');
      const description = descriptions[Math.floor(descriptions.length / 2)] || 'clear';
      
      const rainPops = dayItems.map((i) => i.pop || 0);
      const maxRainPop = Math.max(...rainPops);
      const rain = Math.round(maxRainPop * 100);
      
      const windSpeeds = dayItems.map((i) => (i.wind?.speed || 0) * 3.6);
      const avgWind = windSpeeds.reduce((a, b) => a + b, 0) / windSpeeds.length;
      const wind = Math.round(avgWind);

      return {
        date: new Date(dayItems[0].dt * 1000),
        temp,
        max,
        min,
        description: description.split(' ').slice(0, 3).join(' '),
        rain,
        wind,
      };
    });

    return { ok: true, forecast };
  } catch (err) {
    return { ok: false, error: 'Network error.' };
  }
}
