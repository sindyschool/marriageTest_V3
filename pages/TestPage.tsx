import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { QUESTIONS, TOTAL_QUESTIONS, LIKERT_OPTIONS } from '../constants';
import { Answer } from '../types';
import { saveTestResult } from '../services/mockSupabase';
import ProgressBar from '../components/ProgressBar';
import Button from '../components/Button';
import AnimatedPage from '../components/AnimatedPage';

const TestPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentQuestion = QUESTIONS[currentIndex];
  const progress = ((currentIndex + 1) / TOTAL_QUESTIONS) * 100;

  const handleAnswer = (value: number) => {
    const newAnswer: Answer = {
      questionId: currentQuestion.id,
      rawChoice: value,
      domain: currentQuestion.domain,
    };

    const newAnswers = [...answers];
    newAnswers[currentIndex] = newAnswer;
    setAnswers(newAnswers);

    if (currentIndex < TOTAL_QUESTIONS - 1) {
      // Small delay for better UX
      setTimeout(() => {
        setCurrentIndex(prev => prev + 1);
      }, 250);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    } else {
      navigate(-1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const sessionId = await saveTestResult(answers);
      navigate(`/result/${sessionId}`);
    } catch (error) {
      console.error("Failed to save result", error);
      alert("결과 저장에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isLastQuestion = currentIndex === TOTAL_QUESTIONS - 1;
  const canSubmit = answers.length === TOTAL_QUESTIONS;

  // Scroll to top on question change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentIndex]);

  return (
    <AnimatedPage className="flex flex-col h-screen bg-white">
      {/* Header */}
      <div className="px-6 pt-6 pb-4 bg-white z-10">
        <div className="flex items-center justify-between mb-6">
          <button onClick={handlePrevious} className="p-2 -ml-2 text-gray-400 hover:text-gray-800">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <span className="text-xs font-bold text-violet-600 bg-violet-50 px-3 py-1 rounded-full">
            {currentIndex + 1} / {TOTAL_QUESTIONS}
          </span>
        </div>
        <ProgressBar current={currentIndex + 1} total={TOTAL_QUESTIONS} />
      </div>

      {/* Question Area */}
      <div className="flex-1 flex flex-col px-6 pt-4 pb-8 overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="flex-1 flex flex-col justify-center min-h-[200px]"
          >
            <h2 className="text-2xl font-bold text-gray-900 leading-snug mb-2">
              Q{currentQuestion.id}.
            </h2>
            <p className="text-xl text-gray-800 font-medium leading-relaxed break-keep">
              {currentQuestion.text}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Options */}
        <div className="mt-auto space-y-3">
          {LIKERT_OPTIONS.map((option) => {
            const isSelected = answers[currentIndex]?.rawChoice === option.value;
            return (
              <button
                key={option.value}
                onClick={() => handleAnswer(option.value)}
                className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-200 flex items-center justify-between group
                  ${isSelected 
                    ? 'border-violet-500 bg-violet-50 text-violet-700' 
                    : 'border-gray-100 bg-white text-gray-600 hover:border-violet-200 hover:bg-gray-50'
                  }`}
              >
                <span className={`font-semibold ${isSelected ? 'text-violet-700' : 'text-gray-700'}`}>
                  {option.label}
                </span>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center
                   ${isSelected ? 'border-violet-500' : 'border-gray-300 group-hover:border-violet-300'}`}>
                  {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-violet-500" />}
                </div>
              </button>
            );
          })}
        </div>

        {/* Submit Button (only on last question) */}
        {isLastQuestion && (
          <div className="mt-6">
            <Button 
              fullWidth 
              onClick={handleSubmit} 
              disabled={!canSubmit || isSubmitting}
            >
              {isSubmitting ? '분석 중...' : '결과 보기'}
            </Button>
          </div>
        )}
      </div>
    </AnimatedPage>
  );
};

export default TestPage;