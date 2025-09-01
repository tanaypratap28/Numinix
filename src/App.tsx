import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Header } from './components/Layout/Header';
import { Sidebar } from './components/Navigation/Sidebar';
import { Dashboard } from './components/Dashboard/Dashboard';
import { AITutor } from './components/AITutor/AITutor';
import { Games } from './components/Games/Games';
import { Quiz } from './components/Quiz/Quiz';
import { Syllabus } from './components/Syllabus/Syllabus';
import { Tools } from './components/Tools/Tools';
import { Progress } from './components/Progress/Progress';
import { AuthModal } from './components/Auth/AuthModal';
import { BookOpen, Star, Play, Brain } from 'lucide-react';

type LandingPageProps = {
  showAuthDefault?: boolean;
};

function LandingPage({ showAuthDefault = false }: LandingPageProps) {
  const [showAuth, setShowAuth] = useState(() => {
    if (showAuthDefault) return true;
    if (localStorage.getItem('showAuthModal') === 'true') {
      localStorage.removeItem('showAuthModal');
      return true;
    }
    return false;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <nav className="p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <BookOpen className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">Numinix</span>
          </div>
          <button
            onClick={() => setShowAuth(true)}
            className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors"
          >
            Get Started
          </button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Your AI-Powered
            <span className="block text-blue-600">Math Learning Companion</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Master mathematics with personalized AI tutoring, interactive games, and comprehensive curriculum coverage for classes 1-12.
          </p>
          <button
            onClick={() => setShowAuth(true)}
            className="bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-700 transition-colors transform hover:scale-105"
          >
            Start Learning Today
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Brain className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">AI Tutoring</h3>
            <p className="text-gray-600">Get instant step-by-step solutions to any math problem with our advanced AI.</p>
          </div>
          
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Play className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Interactive Games</h3>
            <p className="text-gray-600">Build logical thinking with Sudoku, puzzles, and brain teasers.</p>
          </div>
          
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-yellow-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Star className="h-8 w-8 text-yellow-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Reward System</h3>
            <p className="text-gray-600">Earn stars and track progress with detailed analytics and achievements.</p>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                NCERT Curriculum Aligned
              </h2>
              <p className="text-gray-600 mb-6">
                Complete coverage of mathematics syllabus from Class 1 to 12, following the NCERT curriculum with chapter-wise organization and topic tracking.
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span>Class-wise syllabus organization</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span>Topic-wise question banks</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span>Progress tracking per chapter</span>
                </li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl p-8">
              <div className="text-center">
                <BookOpen className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Comprehensive Coverage</h3>
                <p className="text-gray-600">From basic arithmetic to advanced calculus</p>
              </div>
            </div>
          </div>
        </div>
      </main>

  <AuthModal isOpen={showAuth} onClose={() => setShowAuth(false)} />
    </div>
  );
}

function AppContent() {
  const { user, loading } = useAuth();
  // Debug: log user and loading
  console.log('AppContent rendered. user:', user, 'loading:', loading);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="h-12 w-12 text-blue-600 mx-auto mb-4 animate-pulse" />
          <p className="text-gray-600">Loading Numinix...</p>
        </div>
      </div>
    );
  }

  // Always show LandingPage with AuthModal open if user is null
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/ai-tutor" element={<AITutor />} />
            <Route path="/games" element={<Games />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/syllabus" element={<Syllabus />} />
            <Route path="/tools" element={<Tools />} />
            <Route path="/progress" element={<Progress />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/auth" element={<LandingPage showAuthDefault={true} />} />
          <Route path="*" element={<AppContent />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;