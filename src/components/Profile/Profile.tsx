import React, { useState } from 'react';
import { User, Edit3, Coins, Trophy, Target, ArrowLeft } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import avatarsData from '../../data/avatars.json';

export function Profile() {
  const { userProfile, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const [selectedAvatar, setSelectedAvatar] = useState(userProfile?.avatar_id || 1);
  const [showAvatarSelector, setShowAvatarSelector] = useState(false);

  const handleAvatarPurchase = async (avatarId: number, cost: number) => {
    if (!userProfile || userProfile.money < cost) return;
    
    // Update user money and unlock avatar
    await updateUserProfile({
      money: userProfile.money - cost,
      avatar_id: avatarId
    });
    setSelectedAvatar(avatarId);
    setShowAvatarSelector(false);
  };

  const currentAvatar = avatarsData.find(a => a.id === selectedAvatar);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <button
          onClick={() => navigate('/')}
          className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Home</span>
        </button>

        {/* Profile Header */}
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-white/20 mb-8">
          <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
            <div className="relative">
              <div className="w-32 h-32 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-6xl shadow-lg">
                {currentAvatar?.image || '🧮'}
              </div>
              <button
                onClick={() => setShowAvatarSelector(true)}
                className="absolute -bottom-2 -right-2 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors shadow-lg"
              >
                <Edit3 className="h-4 w-4" />
              </button>
            </div>
            
            <div className="text-center md:text-left flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{userProfile?.name}</h1>
              <p className="text-gray-600 mb-4">Class {userProfile?.class_level} Student</p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <div className="flex items-center space-x-2 bg-yellow-100 px-4 py-2 rounded-full">
                  <Coins className="h-5 w-5 text-yellow-600" />
                  <span className="font-bold text-yellow-700">{userProfile?.money} coins</span>
                </div>
                <div className="flex items-center space-x-2 bg-green-100 px-4 py-2 rounded-full">
                  <Trophy className="h-5 w-5 text-green-600" />
                  <span className="font-bold text-green-700">{userProfile?.total_correct} correct</span>
                </div>
                <div className="flex items-center space-x-2 bg-blue-100 px-4 py-2 rounded-full">
                  <Target className="h-5 w-5 text-blue-600" />
                  <span className="font-bold text-blue-700">{userProfile?.unlocked_levels?.length || 1} levels</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Learning Progress</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Correct Answers</span>
                  <span className="font-medium text-green-600">{userProfile?.total_correct}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-green-400 to-emerald-500 h-2 rounded-full transition-all duration-500"
                    style={{
                      width: userProfile && (userProfile.total_correct + userProfile.total_wrong) > 0 
                        ? `${(userProfile.total_correct / (userProfile.total_correct + userProfile.total_wrong)) * 100}%` 
                        : '0%'
                    }}
                  />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Total Questions</span>
                  <span className="font-medium text-blue-600">{(userProfile?.total_correct || 0) + (userProfile?.total_wrong || 0)}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-400 to-indigo-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: '100%' }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Achievements</h3>
            <div className="space-y-3">
              <div className={`p-3 rounded-lg transition-all ${userProfile && userProfile.money >= 100 ? 'bg-yellow-50 border border-yellow-200' : 'bg-gray-50'}`}>
                <div className="flex items-center justify-between">
                  <span className="font-medium">Coin Collector</span>
                  <span className="text-sm text-gray-600">Earn 100 coins</span>
                </div>
                {userProfile && userProfile.money >= 100 && (
                  <div className="text-xs text-yellow-600 mt-1">✓ Achieved!</div>
                )}
              </div>
              
              <div className={`p-3 rounded-lg transition-all ${userProfile && userProfile.total_correct >= 50 ? 'bg-green-50 border border-green-200' : 'bg-gray-50'}`}>
                <div className="flex items-center justify-between">
                  <span className="font-medium">Problem Solver</span>
                  <span className="text-sm text-gray-600">50 correct answers</span>
                </div>
                {userProfile && userProfile.total_correct >= 50 && (
                  <div className="text-xs text-green-600 mt-1">✓ Achieved!</div>
                )}
              </div>
              
              <div className={`p-3 rounded-lg transition-all ${userProfile && (userProfile.unlocked_levels?.length || 1) >= 3 ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50'}`}>
                <div className="flex items-center justify-between">
                  <span className="font-medium">Level Master</span>
                  <span className="text-sm text-gray-600">Unlock 3 levels</span>
                </div>
                {userProfile && (userProfile.unlocked_levels?.length || 1) >= 3 && (
                  <div className="text-xs text-blue-600 mt-1">✓ Achieved!</div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: 'AI Tutor',
              description: 'Get instant solutions',
              icon: Calculator,
              gradient: 'from-green-500 to-emerald-600',
              path: '/ai-tutor',
            },
            {
              title: 'Quiz Arena',
              description: 'Earn coins by solving',
              icon: Trophy,
              gradient: 'from-yellow-500 to-orange-500',
              path: '/quiz',
            },
            {
              title: 'Math Map',
              description: 'Track your journey',
              icon: Map,
              gradient: 'from-indigo-500 to-purple-600',
              path: '/math-map',
            },
          ].map((feature) => (
            <div
              key={feature.path}
              onClick={() => navigate(feature.path)}
              className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
            >
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/20 hover:border-white/40">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Avatar Selector Modal */}
        {showAvatarSelector && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl max-w-2xl w-full p-8 max-h-[80vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Choose Your Avatar</h2>
                <button
                  onClick={() => setShowAvatarSelector(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>
              
              <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
                {avatarsData.map((avatar) => {
                  const canAfford = userProfile && userProfile.money >= avatar.cost;
                  const isUnlocked = avatar.cost === 0 || canAfford;
                  
                  return (
                    <div
                      key={avatar.id}
                      onClick={() => {
                        if (avatar.cost === 0) {
                          setSelectedAvatar(avatar.id);
                          setShowAvatarSelector(false);
                        } else if (canAfford) {
                          handleAvatarPurchase(avatar.id, avatar.cost);
                        }
                      }}
                      className={`relative p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                        selectedAvatar === avatar.id
                          ? 'border-blue-500 bg-blue-50'
                          : isUnlocked
                          ? 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                          : 'border-gray-200 bg-gray-50 opacity-50'
                      }`}
                    >
                      <div className="text-4xl text-center mb-2">{avatar.image}</div>
                      <div className="text-xs text-center font-medium text-gray-700">{avatar.name}</div>
                      {avatar.cost > 0 && (
                        <div className="text-xs text-center text-yellow-600 mt-1">
                          {avatar.cost} coins
                        </div>
                      )}
                      {!isUnlocked && (
                        <div className="absolute inset-0 bg-gray-900/20 rounded-2xl flex items-center justify-center">
                          <div className="text-white text-xs font-bold bg-gray-900/80 px-2 py-1 rounded">
                            Locked
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}