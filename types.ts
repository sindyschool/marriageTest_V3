export enum Domain {
  Emotional = 'emotional',
  Economic = 'economic',
  Daily = 'daily',
  FamilyOrigin = 'family_origin',
  Sexual = 'sexual',
}

export interface Question {
  id: number;
  text: string;
  domain: Domain;
}

export interface Answer {
  questionId: number;
  rawChoice: number; // 0-4
  domain: Domain;
}

export interface TestResult {
  id: string;
  createdAt: string;
  totalScore: number;
  totalLabel: string;
  domainScores: Record<Domain, number>;
  domainLabels: Record<Domain, string>;
}

export interface DomainConfig {
  key: Domain;
  label: string;
  color: string;
  description: string;
}