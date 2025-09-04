export interface User {
  id: string;
  email: string;
  phone?: string;
  name: string;
  class_level: number;
  money: number;
  total_correct: number;
  total_wrong: number;
  avatar_id: number;
  unlocked_levels: number[];
  created_at: string;
}

export interface Question {
  id: string;
  question: string;
  options?: string[];
  correct_answer: string;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  class_level: number;
  topic: string;
}

export interface Quiz {
  id: string;
  user_id: string;
  questions: Question[];
  score: number;
  money_earned: number;
  completed_at: string;
}

export interface UnitConversion {
  from: string;
  to: string;
  factor: number;
  category: string;
}

export interface Level {
  id: number;
  title: string;
  description: string;
  unlock_cost: number;
  chapters: string[];
  color: string;
}

export interface Avatar {
  id: number;
  name: string;
  image: string;
  cost: number;
  unlocked: boolean;
}

export interface TimerSession {
  id: string;
  user_id: string;
  duration: number;
  completed: boolean;
  created_at: string;
}