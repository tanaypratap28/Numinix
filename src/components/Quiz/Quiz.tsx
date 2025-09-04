import React, { useState, useEffect } from 'react';
import { Coins, Clock, CheckCircle, XCircle, Trophy } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Question } from '../../types';
import levelsData from '../../data/levels.json';

export function Quiz() {
  const { userProfile, updateUserStats } = useAuth();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);
  const [score, setScore] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(30);
  const [quizMode, setQuizMode] = useState<'current' | 'all'>('current');
  const [showModeSelector, setShowModeSelector] = useState(false);

  const unlockedLevels = userProfile?.unlocked_levels || [1];
  const hasMultipleLevels = unlockedLevels.length > 1;

  useEffect(() => {
    if (hasMultipleLevels && !showModeSelector) {
      setShowModeSelector(true);
      return;
    }
    generateQuiz();
  }, [userProfile, quizMode]);

  useEffect(() => {
    if (timeLeft > 0 && !showResult && !quizComplete && questions.length > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showResult && questions.length > 0) {
      handleAnswer();
    }
  }, [timeLeft, showResult, quizComplete, questions.length]);

  const generateQuiz = async () => {
    if (!userProfile?.class_level) return;
    setError(null);
    
    const targetLevels = quizMode === 'current' 
      ? [Math.max(...unlockedLevels)]
      : unlockedLevels;
    
    const { generateQuestions } = await import('../../services/aiService');
    const generatedQuestions = await generateQuestions(userProfile.class_level);
    
    if (Array.isArray(generatedQuestions) && generatedQuestions.length > 0 && generatedQuestions[0].error) {
      setQuestions([]);
      setError(generatedQuestions[0].error);
    } else if (Array.isArray(generatedQuestions)) {
      setQuestions(generatedQuestions.slice(0, 10)); // Limit to 10 questions
    } else {
      setQuestions([]);
      setError('Unknown error occurred while generating questions.');
    }
  };

  const handleAnswer = () => {
    setShowResult(true);
    const isCorrect = selectedAnswer === questions[currentQuestion]?.correct_answer;
    if (isCorrect) {
      setScore((prev) => prev + 1);
    } else {
      setWrongCount((prev) => prev + 1);
    }

    setTimeout(() => {
      if (currentQuestion + 1 < questions.length) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer('');
        setShowResult(false);
        setTimeLeft(30);
      } else {
        completeQuiz();
      }
    }, 2000);
  };

  const completeQuiz = () => {
    setQuizComplete(true);
    const coinsEarned = score * 10 + (score === questions.length ? 50 : 0); // Bonus for perfect score
    updateUserStats(score, wrongCount, coinsEarned);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer('');
    setShowResult(false);
    setQuizComplete(false);
    setScore(0);
    setWrongCount(0);
    setTimeLeft(30);
    if (hasMultipleLevels) {
      setShowModeSelector(true);
    } else {
      generateQuiz();
    }
  };

  // Mode Selector
  if (showModeSelector) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20 max-w-md w-full">
          <div className="text-center mb-6">
            <Trophy className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Choose Quiz Mode</h2>
            <p className="text-gray-600">Select which levels to include in your quiz</p>
          </div>

          <div className="space-y-4">
            <button
              onClick={() => {
                setQuizMode('current');
                setShowModeSelector(false);
              }}
              className="w-full p-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-105"
            >
              <div className="font-semibold mb-1">Current Level Only</div>
              <div className="text-sm opacity-90">Level {Math.max(...unlockedLevels)} questions</div>
            </button>
            
            <button
              onClick={() => {
                setQuizMode('all');
                setShowModeSelector(false);
              }}
              className="w-full p-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-2xl hover:from-purple-600 hover:to-purple-700 transition-all transform hover:scale-105"
            >
              <div className="font-semibold mb-1">All Unlocked Levels</div>
              <div className="text-sm opacity-90">Mixed questions from levels 1-{Math.max(...unlockedLevels)}</div>
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20 text-center">
          {error ? (
            <>
              <h2 className="text-2xl font-bold text-red-700 mb-4">Error generating quiz questions</h2>
              <p className="text-gray-600 whitespace-pre-line">{error}</p>
            </>
          ) : (
            <>
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-spin">
                <Trophy className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Generating Quiz...</h2>
              <p className="text-gray-600">AI is creating personalized questions for you...</p>
            </>
          )}
        </div>
      </div>
    );
  }

  if (quizComplete) {
    const percentage = Math.round((score / questions.length) * 100);
    const coinsEarned = score * 10 + (score === questions.length ? 50 : 0);

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20 text-center max-w-md w-full">
          <div className="mb-6">
            <div className="w-24 h-24 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
              <Trophy className="h-12 w-12 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Quiz Complete!</h2>
            <p className="text-gray-600">Excellent work on your quiz performance</p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-blue-50 rounded-2xl p-4">
              <div className="text-2xl font-bold text-blue-600">{score}/{questions.length}</div>
              <div className="text-sm text-gray-600">Correct</div>
            </div>
            <div className="bg-green-50 rounded-2xl p-4">
              <div className="text-2xl font-bold text-green-600">{percentage}%</div>
              <div className="text-sm text-gray-600">Accuracy</div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-6 mb-6 border border-yellow-200">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Coins className="h-6 w-6 text-yellow-600" />
              <span className="text-2xl font-bold text-yellow-700">+{coinsEarned}</span>
              <span className="text-yellow-600">coins earned!</span>
            </div>
            {score === questions.length && (
              <div className="text-sm text-orange-600 font-medium">🎉 Perfect score bonus: +50 coins!</div>
            )}
          </div>

          <button
            onClick={resetQuiz}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 font-semibold"
          >
            Take Another Quiz
          </button>
        </div>
      </div>
    );
  }

  const current = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden border border-white/20">
          {/* Header */}
          <div className="p-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold">Quiz Arena</h1>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 bg-white/20 rounded-full px-3 py-1">
                  <Clock className="h-4 w-4" />
                  <span className={`font-mono text-lg ${timeLeft <= 10 ? 'text-red-200' : ''}`}>
                    {timeLeft}s
                  </span>
                </div>
                <div className="text-sm bg-white/20 rounded-full px-3 py-1">
                  {currentQuestion + 1} of {questions.length}
                </div>
              </div>
            </div>
            
            <div className="w-full bg-white/20 rounded-full h-2">
              <div
                className="bg-white h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question */}
          <div className="p-8">
            <div className="mb-6">
              <div className="flex items-center space-x-2 mb-4">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                  {current.topic}
                </span>
                <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                  {current.difficulty}
                </span>
              </div>
              <h2 className="text-2xl font-semibold text-gray-900">
                {current.question}
              </h2>
            </div>

            <div className="space-y-3">
              {current.options?.map((option) => (
                <button
                  key={option}
                  onClick={() => setSelectedAnswer(option)}
                  disabled={showResult}
                  className={`w-full p-4 text-left rounded-2xl border-2 transition-all transform hover:scale-102 ${
                    showResult
                      ? option === current.correct_answer
                        ? 'border-green-500 bg-green-50 text-green-700 shadow-lg'
                        : option === selectedAnswer && option !== current.correct_answer
                        ? 'border-red-500 bg-red-50 text-red-700'
                        : 'border-gray-200 bg-gray-50'
                      : selectedAnswer === option
                      ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-lg transform scale-102'
                      : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{option}</span>
                    {showResult && option === current.correct_answer && (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    )}
                    {showResult && option === selectedAnswer && option !== current.correct_answer && (
                      <XCircle className="h-5 w-5 text-red-500" />
                    )}
                  </div>
                </button>
              ))}
            </div>

            {showResult && (
              <div className="mt-6 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200">
                <h3 className="font-semibold text-blue-900 mb-2 flex items-center space-x-2">
                  <span>💡 Explanation:</span>
                </h3>
                <p className="text-blue-800">{current.explanation}</p>
              </div>
            )}

            {!showResult && (
              <button
                onClick={handleAnswer}
                disabled={!selectedAnswer}
                className="mt-6 w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none font-semibold"
              >
                Submit Answer
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}