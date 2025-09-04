import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AITutorProvider } from './context/AITutorContext';
import { Header } from './components/Layout/Header';
import { Sidebar } from './components/Navigation/Sidebar';
import { Dashboard } from './components/Dashboard/Dashboard';
import { AITutor } from './components/AITutor/AITutor';
import { Games } from './components/Games/Games';
import { Quiz } from './components/Quiz/Quiz';
import { Tools } from './components/Tools/Tools';
import { Progress } from './components/Progress/Progress';
import { Profile } from './components/Profile/Profile';
import { MathMap } from './components/MathMap/MathMap';
import { Timer } from './components/Timer/Timer';
import { AuthModal } from './components/Auth/AuthModal';
import { BookOpen, Star, Play, Brain, Sparkles } from 'lucide-react';

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
  const { user } = useAuth();
  const navigate = useNavigate();
  
  React.useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-4 h-4 bg-blue-400/20 rounded-full animate-bounce"></div>
        <div className="absolute top-40 right-32 w-6 h-6 bg-purple-400/20 rounded-full animate-pulse"></div>
        <div className="absolute bottom-32 left-1/4 w-8 h-8 bg-yellow-400/20 rounded-full animate-ping"></div>
        <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-green-400/20 rounded-full animate-bounce"></div>
      </div>

      <nav className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center">
              <BookOpen className="h-7 w-7 text-white" />
            </div>
            <div>
              <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Numinix
              </span>
              <div className="text-sm text-gray-500">Learn • Play • Grow</div>
            </div>
          </div>
          <button
            onClick={() => setShowAuth(true)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 font-semibold shadow-lg"
          >
            Get Started
          </button>
        </div>
      </nav>

      <main className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center animate-pulse">
                <Sparkles className="h-10 w-10 text-white" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-ping opacity-20"></div>
            </div>
          </div>
          
          <h1 className="text-6xl font-bold text-gray-900 mb-6">
            Your AI-Powered
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Math Universe
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Embark on an epic mathematical journey with AI tutoring, earn coins, unlock levels, and master mathematics from Class 1-12.
          </p>
          <button
            onClick={() => setShowAuth(true)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-12 py-5 rounded-full text-xl font-bold hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-110 shadow-2xl"
          >
            Begin Your Journey
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="text-center p-8 bg-white/70 backdrop-blur-sm rounded-3xl shadow-lg border border-white/20">
            <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-500 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <Brain className="h-10 w-10 text-white" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">AI-Powered Learning</h3>
            <p className="text-gray-600 leading-relaxed">Get instant step-by-step solutions with our advanced AI tutor that adapts to your learning style.</p>
          </div>
          
          <div className="text-center p-8 bg-white/70 backdrop-blur-sm rounded-3xl shadow-lg border border-white/20">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-400 to-pink-500 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <Play className="h-10 w-10 text-white" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">Gamified Experience</h3>
            <p className="text-gray-600 leading-relaxed">Earn coins, unlock levels, and progress through your mathematical universe with engaging games.</p>
          </div>
          
          <div className="text-center p-8 bg-white/70 backdrop-blur-sm rounded-3xl shadow-lg border border-white/20">
            <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <Star className="h-10 w-10 text-white" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">Progress Tracking</h3>
            <p className="text-gray-600 leading-relaxed">Monitor your journey with detailed analytics, achievements, and personalized learning paths.</p>
          </div>
        </div>

        <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-white/20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                NCERT Curriculum
                <span className="block text-blue-600">Perfectly Aligned</span>
              </h2>
              <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                Complete coverage of mathematics syllabus from Class 1 to 12, organized in an engaging level-based progression system.
              </p>
              <ul className="space-y-4 text-gray-700">
                <li className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                  <span className="text-lg">Level-based progression system</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                  <span className="text-lg">Coin-based unlock mechanism</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                  <span className="text-lg">Comprehensive progress tracking</span>
                </li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl p-12 text-center">
              <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <BookOpen className="h-12 w-12 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">6 Learning Levels</h3>
              <p className="text-gray-600 text-lg">From Foundation Explorer to Calculus Champion</p>
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-spin">
            <BookOpen className="h-8 w-8 text-white" />
          </div>
          <p className="text-gray-600 text-lg">Loading Numinix...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <AITutorProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <Header />
        <div className="flex">
          <Sidebar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/ai-tutor" element={<AITutor />} />
              <Route path="/games" element={<Games />} />
              <Route path="/quiz" element={<Quiz />} />
              <Route path="/tools" element={<Tools />} />
              <Route path="/progress" element={<Progress />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/math-map" element={<MathMap />} />
              <Route path="/timer" element={<Timer />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </div>
    </AITutorProvider>
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