import { Answer, TestResult, Domain, TestResult as SessionType } from '../types';
import { QUESTIONS, getDomainLabel, getTotalLabel } from '../constants';

// In-memory store for the session (simulating a database)
const sessions: Record<string, SessionType> = {};

export const saveTestResult = async (answers: Answer[]): Promise<string> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  const totalScore = answers.reduce((acc, curr) => acc + curr.rawChoice, 0);
  
  const domainScores: Record<Domain, number> = {
    [Domain.Emotional]: 0,
    [Domain.Economic]: 0,
    [Domain.Daily]: 0,
    [Domain.FamilyOrigin]: 0,
    [Domain.Sexual]: 0,
  };

  answers.forEach((ans) => {
    domainScores[ans.domain] += ans.rawChoice;
  });

  const domainLabels: Record<Domain, string> = {
    [Domain.Emotional]: getDomainLabel(domainScores[Domain.Emotional]),
    [Domain.Economic]: getDomainLabel(domainScores[Domain.Economic]),
    [Domain.Daily]: getDomainLabel(domainScores[Domain.Daily]),
    [Domain.FamilyOrigin]: getDomainLabel(domainScores[Domain.FamilyOrigin]),
    [Domain.Sexual]: getDomainLabel(domainScores[Domain.Sexual]),
  };

  const sessionId = crypto.randomUUID();
  
  const session: SessionType = {
    id: sessionId,
    createdAt: new Date().toISOString(),
    totalScore,
    totalLabel: getTotalLabel(totalScore),
    domainScores,
    domainLabels,
  };

  sessions[sessionId] = session;
  
  // In a real app, we would insert into Supabase here
  // supabase.from('test_sessions').insert(...)
  // supabase.from('test_answers').insert(...)

  return sessionId;
};

export const getTestResult = async (sessionId: string): Promise<TestResult | null> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return sessions[sessionId] || null;
};