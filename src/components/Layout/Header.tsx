import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, User, LogOut, Star } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export function Header() {
  const { user, userProfile, signOut } = useAuth();
  const navigate = useNavigate();
  // Debug: log user and userProfile
  console.log('Header rendered. user:', user, 'userProfile:', userProfile);

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <BookOpen className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">Numinix</span>
          </div>
          <div className="flex items-center space-x-4">
            {user && userProfile && (
              <>
                <div className="flex items-center space-x-2 bg-yellow-50 px-3 py-1 rounded-full">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-medium text-yellow-700">{userProfile.stars}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">{userProfile.name}</span>
                  <span className="text-xs text-gray-500">Class {userProfile.class_level}</span>
                </div>
              </>
            )}
            {/* Logout button always visible */}
            <button
              onClick={async () => {
                if (user) {
                  await signOut();
                  navigate('/auth');
                }
              }}
              className="flex items-center space-x-1 text-gray-500 hover:text-red-600 transition-colors px-3 py-2 rounded-lg bg-gray-100 hover:bg-red-50"
              title="Logout"
            >
              <LogOut className="h-6 w-6" />
              <span className="ml-2 text-sm font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}