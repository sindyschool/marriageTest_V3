import React from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import IntroPage from './pages/IntroPage';
import TestPage from './pages/TestPage';
import ResultPage from './pages/ResultPage';
import { AnimatePresence } from 'framer-motion';

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/intro" element={<IntroPage />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/result/:sessionId" element={<ResultPage />} />
      </Routes>
    </AnimatePresence>
  );
};

export default function App() {
  return (
    <div className="min-h-screen max-w-md mx-auto bg-white shadow-xl overflow-hidden relative">
      <HashRouter>
        <AnimatedRoutes />
      </HashRouter>
    </div>
  );
}