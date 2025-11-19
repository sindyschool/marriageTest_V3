import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HeartHandshake, CheckCircle2, Sparkles } from 'lucide-react';
import Button from '../components/Button';
import AnimatedPage from '../components/AnimatedPage';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <AnimatedPage className="flex flex-col h-screen bg-white px-6 py-10 relative">
      {/* Header Section */}
      <header className="mt-8 mb-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="w-16 h-16 bg-violet-100 rounded-3xl flex items-center justify-center mb-6"
        >
          <span className="text-3xl">💍</span>
        </motion.div>
        <h1 className="text-3xl font-bold text-gray-900 leading-tight mb-3">
          나의 결혼 생활,<br />
          <span className="text-violet-600">얼마나 괜찮은</span> 상태일까요?
        </h1>
        <p className="text-gray-500 text-lg">
          당신의 결혼 만족도 지수를<br />지금 바로 확인해보세요.
        </p>
      </header>

      {/* Visual Element */}
      <div className="flex-1 flex items-center justify-center">
        <div className="relative w-full max-w-[280px] aspect-square bg-violet-50 rounded-full flex items-center justify-center">
           <motion.div 
             animate={{ y: [0, -10, 0] }}
             transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
           >
             <HeartHandshake size={120} className="text-violet-300" />
           </motion.div>
           {/* Floating elements */}
           <motion.div 
              className="absolute top-10 right-4 bg-white p-3 rounded-2xl shadow-sm text-2xl"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 5 }}
           >
             😊
           </motion.div>
           <motion.div 
              className="absolute bottom-10 left-4 bg-white p-3 rounded-2xl shadow-sm text-2xl"
              animate={{ rotate: [0, -10, 10, 0] }}
              transition={{ repeat: Infinity, duration: 4, delay: 1 }}
           >
             🏡
           </motion.div>
        </div>
      </div>

      {/* Features */}
      <div className="space-y-3 mb-8">
        <div className="flex items-center gap-3 text-gray-600">
          <CheckCircle2 className="text-violet-500 w-5 h-5" />
          <span>5가지 핵심 영역 정밀 진단</span>
        </div>
        <div className="flex items-center gap-3 text-gray-600">
          <Sparkles className="text-violet-500 w-5 h-5" />
          <span>전문 상담 이론 기반의 분석</span>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-auto">
        <Button fullWidth onClick={() => navigate('/intro')}>
          결혼생활 만족도 검사하기
        </Button>
      </div>
    </AnimatedPage>
  );
};

export default LandingPage;