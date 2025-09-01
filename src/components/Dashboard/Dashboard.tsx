import React from 'react';
import { Calculator, Gamepad2, BookOpen, Trophy, Target, TrendingUp } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { FeatureCard } from './FeatureCard';

export function Dashboard() {
  const { userProfile } = useAuth();

  const features = [
    {
      title: 'AI Tutor',
      description: 'Get instant solutions to any math problem',
      icon: Calculator,
      color: 'blue',
      path: '/ai-tutor',
    },
    {
      title: 'Math Games',
      description: 'Play Sudoku, puzzles, and logic games',
      icon: Gamepad2,
      color: 'purple',
      path: '/games',
    },
    {
      title: 'Syllabus',
      description: 'Explore your class curriculum',
      icon: BookOpen,
      color: 'green',
      path: '/syllabus',
    },
    {
      title: 'Quiz Arena',
      description: 'Test your knowledge and earn stars',
      icon: Trophy,
      color: 'yellow',
      path: '/quiz',
    },
    {
      title: 'Tools',
      description: 'Unit converters and calculators',
      icon: Target,
      color: 'indigo',
      path: '/tools',
    },
    {
      title: 'Progress',
      description: 'Track your learning analytics',
      icon: TrendingUp,
      color: 'pink',
      path: '/progress',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Hello, {userProfile?.name}! 👋
        </h1>
        <p className="text-gray-600">
          Ready to explore mathematics? Choose what you'd like to do today.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature) => (
          <FeatureCard key={feature.path} {...feature} />
        ))}
      </div>

      {userProfile && (
        <div className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Progress</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-4">
              <div className="text-2xl font-bold text-blue-600">{userProfile.stars}</div>
              <div className="text-sm text-gray-600">Stars Earned</div>
            </div>
            <div className="bg-white rounded-lg p-4">
              <div className="text-2xl font-bold text-green-600">{userProfile.total_correct}</div>
              <div className="text-sm text-gray-600">Correct Answers</div>
            </div>
            <div className="bg-white rounded-lg p-4">
              <div className="text-2xl font-bold text-red-600">{userProfile.total_wrong}</div>
              <div className="text-sm text-gray-600">Wrong Answers</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}