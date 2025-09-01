import React from 'react';
import { Home, Calculator, Gamepad2, BookOpen, Trophy, Target, TrendingUp } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

export function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { icon: Home, label: 'Dashboard', path: '/' },
    { icon: Calculator, label: 'AI Tutor', path: '/ai-tutor' },
    { icon: Trophy, label: 'Quiz Arena', path: '/quiz' },
    { icon: Gamepad2, label: 'Games', path: '/games' },
    { icon: BookOpen, label: 'Syllabus', path: '/syllabus' },
    { icon: Target, label: 'Tools', path: '/tools' },
    { icon: TrendingUp, label: 'Progress', path: '/progress' },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-screen overflow-y-auto">
      <div className="p-6">
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                location.pathname === item.path
                  ? 'bg-blue-50 text-blue-700 border border-blue-200'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </aside>
  );
}