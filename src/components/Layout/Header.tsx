import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, User, LogOut, Coins, Settings } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export function Header() {
  const { user, userProfile, signOut } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Numinix
              </span>
              <div className="text-xs text-gray-500">Learn • Play • Grow</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {user && userProfile && (
              <>
                <div className="flex items-center space-x-3 bg-gradient-to-r from-yellow-50 to-orange-50 px-4 py-2 rounded-full border border-yellow-200">
                  <Coins className="h-5 w-5 text-yellow-600" />
                  <span className="text-lg font-bold text-yellow-700">{userProfile.money}</span>
                  <span className="text-sm text-yellow-600">coins</span>
                </div>
                
                <button
                  onClick={() => navigate('/profile')}
                  className="flex items-center space-x-2 bg-gray-50 hover:bg-gray-100 px-3 py-2 rounded-full transition-colors"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-lg">
                    {userProfile.avatar_id ? String.fromCodePoint(0x1F9EE + userProfile.avatar_id) : '🧮'}
                  </div>
                  <span className="text-sm font-medium text-gray-700">{userProfile.name}</span>
                </button>
              </>
            )}
            
            <button
              onClick={async () => {
                await signOut();
                navigate('/auth');
              }}
              className="flex items-center space-x-2 text-gray-500 hover:text-red-600 transition-colors px-3 py-2 rounded-full hover:bg-red-50"
              title="Logout"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}