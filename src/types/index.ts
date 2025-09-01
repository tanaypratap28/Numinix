export interface User {
  id: string;
  email: string;
  phone?: string;
  name: string;
  class_level: number;
  stars: number;
  total_correct: number;
  total_wrong: number;
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
  stars_earned: number;
  completed_at: string;
}

export interface UnitConversion {
  from: string;
  to: string;
  factor: number;
  category: string;
}

export interface SyllabusItem {
  id: string;
  class_level: number;
  subject: string;
  chapter: string;
  topics: string[];
}