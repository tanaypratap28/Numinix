import React, { useState, useEffect } from 'react';
import { Calculator, Gamepad2, Map, Trophy, Target, TrendingUp, Timer, Sparkles, Coins } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { FeatureCard } from './FeatureCard';
import motivationalQuotes from '../../data/motivationalQuotes.json';

export function Dashboard() {
  const { userProfile } = useAuth();
  const [currentQuote, setCurrentQuote] = useState('');

  useEffect(() => {
    const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
    setCurrentQuote(randomQuote);
  }, []);

  const features = [
    {
      title: 'AI Tutor',
      description: 'Get instant solutions to any math problem',
      icon: Calculator,
      gradient: 'from-green-500 to-emerald-600',
      path: '/ai-tutor',
    },
    {
      title: 'Quiz Arena',
      description: 'Test your knowledge and earn coins',
      icon: Trophy,
      gradient: 'from-yellow-500 to-orange-500',
      path: '/quiz',
    },
    {
      title: 'Math Games',
      description: 'Play Sudoku, puzzles, and logic games',
      icon: Gamepad2,
      gradient: 'from-purple-500 to-pink-500',
      path: '/games',
    },
    {
      title: 'Math Map',
      description: 'Explore your learning journey',
      icon: Map,
      gradient: 'from-indigo-500 to-purple-600',
      path: '/math-map',
    },
    {
      title: 'Focus Timer',
      description: 'Stay focused with beautiful timers',
      icon: Timer,
      gradient: 'from-red-500 to-pink-500',
      path: '/timer',
    },
    {
      title: 'Tools',
      description: 'Unit converters and calculators',
      icon: Target,
      gradient: 'from-teal-500 to-cyan-500',
      path: '/tools',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  Welcome back, {userProfile?.name}! 👋
                </h1>
                <p className="text-gray-600 text-lg mb-4">
                  Ready to continue your mathematical adventure?
                </p>
                <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl p-4 border border-blue-200">
                  <div className="flex items-center space-x-2 mb-2">
                    <Sparkles className="h-5 w-5 text-purple-600" />
                    <span className="font-semibold text-purple-800">Daily Motivation</span>
                  </div>
                  <p className="text-purple-700 italic">{currentQuote}</p>
                </div>
              </div>
              <div className="hidden lg:block">
                <div className="w-32 h-32 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-6xl">
                  {userProfile?.avatar_id ? String.fromCodePoint(0x1F9EE + userProfile.avatar_id) : '🧮'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        {userProfile && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center">
                  <Coins className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">{userProfile.money}</div>
                  <div className="text-sm text-gray-600">Coins Earned</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-xl flex items-center justify-center">
                  <Trophy className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">{userProfile.total_correct}</div>
                  <div className="text-sm text-gray-600">Correct Answers</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-xl flex items-center justify-center">
                  <Map className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">{userProfile.unlocked_levels?.length || 1}</div>
                  <div className="text-sm text-gray-600">Levels Unlocked</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-xl flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {userProfile.total_correct + userProfile.total_wrong > 0 
                      ? Math.round((userProfile.total_correct / (userProfile.total_correct + userProfile.total_wrong)) * 100)
                      : 0}%
                  </div>
                  <div className="text-sm text-gray-600">Accuracy</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <FeatureCard key={feature.path} {...feature} />
          ))}
        </div>
      </div>
    </div>
  );
}