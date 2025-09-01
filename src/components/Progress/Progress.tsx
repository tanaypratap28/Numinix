import React from 'react';
import { TrendingUp, Target, Award, BarChart3 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export function Progress() {
  const { userProfile } = useAuth();

  if (!userProfile) return null;

  const totalQuestions = userProfile.total_correct + userProfile.total_wrong;
  const accuracy = totalQuestions > 0 ? Math.round((userProfile.total_correct / totalQuestions) * 100) : 0;

  const stats = [
    {
      title: 'Total Questions',
      value: totalQuestions,
      icon: Target,
      color: 'blue',
    },
    {
      title: 'Accuracy Rate',
      value: `${accuracy}%`,
      icon: TrendingUp,
      color: 'green',
    },
    {
      title: 'Stars Collected',
      value: userProfile.stars,
      icon: Award,
      color: 'yellow',
    },
    {
      title: 'Correct Answers',
      value: userProfile.total_correct,
      icon: BarChart3,
      color: 'purple',
    },
  ];

  const colorClasses = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    yellow: 'from-yellow-500 to-yellow-600',
    purple: 'from-purple-500 to-purple-600',
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Progress</h1>
        <p className="text-gray-600">Track your learning journey and achievements</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.title} className="bg-white rounded-2xl p-6 shadow-lg">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${colorClasses[stat.color as keyof typeof colorClasses]} flex items-center justify-center mb-4`}>
              <stat.icon className="h-6 w-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
            <div className="text-sm text-gray-600">{stat.title}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Performance Overview</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Correct Answers</span>
                <span className="font-medium text-green-600">{userProfile.total_correct}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{
                    width: totalQuestions > 0 ? `${(userProfile.total_correct / totalQuestions) * 100}%` : '0%'
                  }}
                />
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Wrong Answers</span>
                <span className="font-medium text-red-600">{userProfile.total_wrong}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-red-500 h-2 rounded-full"
                  style={{
                    width: totalQuestions > 0 ? `${(userProfile.total_wrong / totalQuestions) * 100}%` : '0%'
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Achievements</h2>
          <div className="space-y-3">
            <div className={`p-3 rounded-lg ${userProfile.stars >= 10 ? 'bg-yellow-50 border border-yellow-200' : 'bg-gray-50'}`}>
              <div className="flex items-center justify-between">
                <span className="font-medium">Star Collector</span>
                <span className="text-sm text-gray-600">Earn 10 stars</span>
              </div>
              {userProfile.stars >= 10 && (
                <div className="text-xs text-yellow-600 mt-1">✓ Achieved!</div>
              )}
            </div>
            
            <div className={`p-3 rounded-lg ${accuracy >= 80 ? 'bg-green-50 border border-green-200' : 'bg-gray-50'}`}>
              <div className="flex items-center justify-between">
                <span className="font-medium">Accuracy Master</span>
                <span className="text-sm text-gray-600">80% accuracy</span>
              </div>
              {accuracy >= 80 && (
                <div className="text-xs text-green-600 mt-1">✓ Achieved!</div>
              )}
            </div>
            
            <div className={`p-3 rounded-lg ${userProfile.total_correct >= 50 ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50'}`}>
              <div className="flex items-center justify-between">
                <span className="font-medium">Problem Solver</span>
                <span className="text-sm text-gray-600">50 correct answers</span>
              </div>
              {userProfile.total_correct >= 50 && (
                <div className="text-xs text-blue-600 mt-1">✓ Achieved!</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}