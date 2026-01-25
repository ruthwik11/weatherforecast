import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '@/pages/Home';
import AboutUs from '@/pages/AboutUs';
import SetLocation from '@/pages/SetLocation';
import Forecast from '@/pages/Forecast';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/location" element={<SetLocation />} />
      <Route path="/forecast" element={<Forecast />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
