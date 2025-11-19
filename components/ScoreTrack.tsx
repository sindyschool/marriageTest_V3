import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

interface ScoreTrackProps {
  score: number; // 0 to 100
}

const ScoreTrack: React.FC<ScoreTrackProps> = ({ score }) => {
  // Clamp score between 0 and 100
  const clampedScore = Math.max(0, Math.min(100, score));

  return (
    <div className="relative w-full pt-12 pb-8 px-4">
      {/* The Track */}
      <div className="w-full h-4 bg-gray-200 rounded-full relative">
        {/* Milestones */}
        {[0, 20, 40, 60, 80, 100].map((mark) => (
          <div 
            key={mark} 
            className="absolute top-1/2 -translate-y-1/2 w-1 h-4 bg-white rounded-full z-10"
            style={{ left: `${mark}%` }}
          />
        ))}
        
        {/* Filled part */}
        <motion.div 
          className="h-full bg-gradient-to-r from-violet-300 to-violet-600 rounded-full"
          initial={{ width: '0%' }}
          animate={{ width: `${clampedScore}%` }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      </div>

      {/* The Runner/Indicator */}
      <motion.div
        className="absolute top-0 -ml-6 flex flex-col items-center"
        initial={{ left: '0%' }}
        animate={{ left: `${clampedScore}%` }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <div className="bg-white p-2 rounded-full shadow-md border border-violet-100">
           <Heart className="w-6 h-6 text-red-500 fill-current animate-pulse" />
        </div>
        <div className="mt-2 bg-violet-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow-sm">
          {score}점
        </div>
      </motion.div>
      
      {/* Labels below track */}
      <div className="flex justify-between mt-2 text-xs text-gray-400 font-medium">
        <span>불만족</span>
        <span>보통</span>
        <span>만족</span>
        <span>최고</span>
      </div>
    </div>
  );
};

export default ScoreTrack;