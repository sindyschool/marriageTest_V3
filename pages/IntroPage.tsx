import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, FileText, ShieldCheck, Clock } from 'lucide-react';
import Button from '../components/Button';
import AnimatedPage from '../components/AnimatedPage';
import { DOMAINS } from '../constants';

const IntroPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <AnimatedPage className="flex flex-col min-h-screen bg-gray-50 px-6 py-8">
      {/* Navigation Header */}
      <div className="flex items-center mb-8">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-gray-400 hover:text-gray-600">
          <ChevronRight className="w-6 h-6 rotate-180" />
        </button>
        <span className="text-sm font-medium text-gray-500 ml-2">검사 안내</span>
      </div>

      <h1 className="text-2xl font-bold text-gray-900 mb-8">
        결혼생활 만족도 검사는<br />
        <span className="text-violet-600">이렇게 진행돼요</span>
      </h1>

      {/* Info Cards */}
      <div className="space-y-4 mb-10">
        <div className="bg-white p-5 rounded-2xl shadow-sm flex gap-4 items-start">
          <div className="bg-violet-100 p-3 rounded-xl text-violet-600 shrink-0">
            <FileText size={24} />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-lg mb-1">총 25문항</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              정서, 경제, 일상, 원가족, 성적 만족 등 5가지 핵심 영역을 골고루 다룹니다.
            </p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm flex gap-4 items-start">
          <div className="bg-violet-100 p-3 rounded-xl text-violet-600 shrink-0">
            <Clock size={24} />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-lg mb-1">소요 시간 3분</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              오래 고민하지 말고, 질문을 읽고 바로 떠오르는 느낌대로 답변해주세요.
            </p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm flex gap-4 items-start">
          <div className="bg-violet-100 p-3 rounded-xl text-violet-600 shrink-0">
            <ShieldCheck size={24} />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-lg mb-1">신디 전문성 보장</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              부부 상담 전문가들의 임상 경험을 바탕으로 설계된 신뢰할 수 있는 검사입니다.
            </p>
          </div>
        </div>
      </div>

      {/* Domain List Preview */}
      <div className="mb-8">
        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">평가 영역</h3>
        <div className="flex flex-wrap gap-2">
          {DOMAINS.map((d) => (
            <span key={d.key} className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-600">
              {d.label}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-auto">
        <Button fullWidth onClick={() => navigate('/test')}>
          검사 시작하기
        </Button>
      </div>
    </AnimatedPage>
  );
};

export default IntroPage;