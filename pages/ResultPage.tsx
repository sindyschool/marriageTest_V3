import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Share2, RefreshCw, PhoneCall, ArrowRight, Star, Info } from 'lucide-react';
import { getTestResult } from '../services/mockSupabase';
import { TestResult, Domain } from '../types';
import { DOMAINS, TOTAL_SCORE_FEEDBACK, DOMAIN_FEEDBACK } from '../constants';
import ScoreTrack from '../components/ScoreTrack';
import DomainBarChart from '../components/DomainBarChart';
import Button from '../components/Button';
import AnimatedPage from '../components/AnimatedPage';

const ResultPage: React.FC = () => {
  const { sessionId } = useParams<{ sessionId: string }>();
  const navigate = useNavigate();
  const [result, setResult] = useState<TestResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (sessionId) {
      getTestResult(sessionId).then((data) => {
        setResult(data);
        setLoading(false);
      });
    }
  }, [sessionId]);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: '결혼생활 만족도 검사 결과',
          text: `나의 결혼 만족도 점수는 ${result?.totalScore}점 입니다.`,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Sharing failed', err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        alert('링크가 클립보드에 복사되었습니다.');
      } catch (err) {
        alert('링크 복사에 실패했습니다.');
      }
    }
  };

  const handleSelfCareClick = () => {
    window.open('https://www.sindyschool.com/458', '_blank');
  };

  const handleCounselingClick = () => {
    window.open('https://www.sindyschool.com/450', '_blank');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-violet-200 border-t-violet-600 rounded-full animate-spin"></div>
          <p className="text-gray-500 font-medium">결과 분석 중입니다...</p>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="flex flex-col items-center justify-center h-screen p-6">
        <h2 className="text-xl font-bold mb-4">결과를 찾을 수 없습니다.</h2>
        <Button onClick={() => navigate('/')}>홈으로 돌아가기</Button>
      </div>
    );
  }

  // Get detailed feedback based on label
  const totalFeedback = TOTAL_SCORE_FEEDBACK[result.totalLabel];
  
  return (
    <AnimatedPage className="bg-gray-50 min-h-screen pb-10">
      {/* Top Summary Section */}
      <div className="bg-white rounded-b-3xl shadow-sm px-6 pt-10 pb-8 mb-6">
        <div className="text-center mb-2">
          <span className="inline-block px-3 py-1 bg-violet-100 text-violet-700 rounded-full text-sm font-bold mb-3">
            종합 결과
          </span>
          <h1 className="text-2xl font-bold text-gray-900 leading-snug">
            당신의 결혼 만족도는<br />
            <span className="text-violet-600 text-3xl">"{result.totalLabel}"</span> 상태입니다.
          </h1>
        </div>

        <ScoreTrack score={result.totalScore} />

        {/* Detailed Total Score Feedback */}
        <div className="mt-8 space-y-6">
          <div className="text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              "{totalFeedback?.title}"
            </h3>
            <div className="text-gray-600 leading-relaxed text-sm text-left whitespace-pre-line break-keep bg-gray-50 p-5 rounded-2xl">
              {totalFeedback?.description.replace('{score}', result.totalScore.toString())}
            </div>
          </div>

          {totalFeedback?.points && (
            <div className="bg-violet-50 p-5 rounded-2xl">
              <div className="flex items-center gap-2 mb-3">
                <Star className="w-5 h-5 text-violet-600 fill-current" />
                <span className="font-bold text-violet-900">꼭 기억하세요!</span>
              </div>
              <div className="space-y-3">
                {totalFeedback.points.map((point, idx) => (
                  <p key={idx} className="text-sm text-violet-800 leading-relaxed break-keep">
                    {point}
                  </p>
                ))}
              </div>
            </div>
          )}

          {totalFeedback?.extra && (
            <div className="flex gap-3 bg-white border border-violet-100 p-4 rounded-xl shadow-sm">
              <Info className="w-5 h-5 text-violet-500 shrink-0 mt-0.5" />
              <p className="text-sm text-gray-600 break-keep">{totalFeedback.extra}</p>
            </div>
          )}
        </div>
      </div>

      {/* Domain Analysis */}
      <div className="px-6 mb-8">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <span className="w-1 h-6 bg-violet-600 rounded-full"></span>
          영역별 상세 분석
        </h3>
        
        <div className="bg-white p-6 rounded-3xl shadow-sm mb-6">
          <DomainBarChart domainScores={result.domainScores} />
        </div>

        {/* Domain Details List */}
        <div className="space-y-4">
          {DOMAINS.map((domain) => {
            const score = result.domainScores[domain.key];
            const label = result.domainLabels[domain.key];
            
            // Get specific feedback for the domain and label from DOMAIN_FEEDBACK
            const detailedFeedback = DOMAIN_FEEDBACK[domain.key]?.[label];

            return (
              <div key={domain.key} className="bg-white p-5 rounded-2xl shadow-sm overflow-hidden">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: domain.color }}></div>
                    <h4 className="font-bold text-gray-800">{domain.label}</h4>
                  </div>
                  <span className={`text-sm font-bold ${
                    score >= 16 ? 'text-blue-600' : 
                    score >= 12 ? 'text-green-600' : 
                    score >= 8 ? 'text-yellow-600' : 'text-red-500'
                  }`}>
                    {score}점 ({label})
                  </span>
                </div>
                
                {/* Description */}
                <p className="text-xs text-gray-400 mb-4">{domain.description}</p>
                
                {/* Feedback Content */}
                <div className="text-sm text-gray-600 bg-gray-50 p-4 rounded-xl leading-relaxed whitespace-pre-line break-keep">
                  {detailedFeedback ? (
                    detailedFeedback
                  ) : (
                    <span className="text-gray-400 italic">해당 결과에 대한 상세 분석 데이터가 없습니다.</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CTA Section */}
      <div className="px-6 pb-8">
        <div className="bg-violet-900 rounded-3xl p-6 text-white text-center mb-4 shadow-xl shadow-violet-200">
          <h3 className="font-bold text-xl mb-2">더 행복해지고 싶다면?</h3>
          <p className="text-violet-200 text-sm mb-6">
            지금 바로 관계 개선을 위한<br/>맞춤 솔루션을 받아보세요.
          </p>
          
          <div className="space-y-3">
            <button 
              className="w-full bg-white text-violet-900 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-violet-50 transition-colors active:scale-95"
              onClick={handleSelfCareClick}
            >
              혼자 해볼래요 (셀프케어)
              <ArrowRight size={16} />
            </button>
            <button 
              className="w-full bg-violet-800 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-violet-700 transition-colors active:scale-95"
              onClick={handleCounselingClick}
            >
              <PhoneCall size={16} />
              전문가 도움 받을래요
            </button>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <Button variant="secondary" fullWidth onClick={handleShare} className="flex items-center justify-center gap-2">
            <Share2 size={18} />
            공유하기
          </Button>
          <Button variant="ghost" fullWidth onClick={() => navigate('/test')} className="flex items-center justify-center gap-2 border border-gray-200">
            <RefreshCw size={18} />
            다시하기
          </Button>
        </div>
      </div>
    </AnimatedPage>
  );
};

export default ResultPage;