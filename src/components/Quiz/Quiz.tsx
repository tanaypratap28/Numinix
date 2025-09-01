import React, { useState, useEffect } from 'react';
import { Star, Clock, CheckCircle, XCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Question } from '../../types';
import questionsData from '../../data/questions.json';

export function Quiz() {
  const { userProfile, updateUserStats } = useAuth();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    // Filter questions based on user's class level
    const classQuestions = questionsData.filter(
      q => q.class_level <= (userProfile?.class_level || 12)
    );
    
    // Shuffle and take 5 questions
    const shuffled = classQuestions.sort(() => Math.random() - 0.5).slice(0, 5);
    setQuestions(shuffled);
  }, [userProfile]);

  useEffect(() => {
    if (timeLeft > 0 && !showResult && !quizComplete) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showResult) {
      handleAnswer();
    }
  }, [timeLeft, showResult, quizComplete]);

  const handleAnswer = () => {
    setShowResult(true);
    const isCorrect = selectedAnswer === questions[currentQuestion]?.correct_answer;
    if (isCorrect) {
      setScore(score + 1);
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
    const starsEarned = Math.max(1, Math.floor(score * 2));
    const correctAnswers = score;
    const wrongAnswers = questions.length - score;
    
    updateUserStats(correctAnswers, wrongAnswers, starsEarned);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer('');
    setShowResult(false);
    setQuizComplete(false);
    setScore(0);
    setTimeLeft(30);
    
    // Shuffle questions again
    const classQuestions = questionsData.filter(
      q => q.class_level <= (userProfile?.class_level || 12)
    );
    const shuffled = classQuestions.sort(() => Math.random() - 0.5).slice(0, 5);
    setQuestions(shuffled);
  };

  if (questions.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 text-center">
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Loading Quiz...</h2>
        </div>
      </div>
    );
  }

  if (quizComplete) {
    const percentage = Math.round((score / questions.length) * 100);
    const starsEarned = Math.max(1, Math.floor(score * 2));

    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
          <div className="mb-6">
            <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="h-10 w-10 text-white fill-current" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Quiz Complete!</h2>
            <p className="text-gray-600">Great job on completing the quiz</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-blue-50 rounded-xl p-4">
              <div className="text-2xl font-bold text-blue-600">{score}/{questions.length}</div>
              <div className="text-sm text-gray-600">Correct Answers</div>
            </div>
            <div className="bg-green-50 rounded-xl p-4">
              <div className="text-2xl font-bold text-green-600">{percentage}%</div>
              <div className="text-sm text-gray-600">Accuracy</div>
            </div>
            <div className="bg-yellow-50 rounded-xl p-4">
              <div className="text-2xl font-bold text-yellow-600">+{starsEarned}</div>
              <div className="text-sm text-gray-600">Stars Earned</div>
            </div>
          </div>

          <button
            onClick={resetQuiz}
            className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition-colors"
          >
            Take Another Quiz
          </button>
        </div>
      </div>
    );
  }

  const current = questions[currentQuestion];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-gray-900">Quiz Arena</h1>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-gray-500" />
                <span className={`font-mono text-lg ${timeLeft <= 10 ? 'text-red-600' : 'text-gray-700'}`}>
                  {timeLeft}s
                </span>
              </div>
              <div className="text-sm text-gray-600">
                {currentQuestion + 1} of {questions.length}
              </div>
            </div>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="p-8">
          <div className="mb-6">
            <div className="text-sm text-gray-500 mb-2">
              {current.topic} • Class {current.class_level} • {current.difficulty}
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              {current.question}
            </h2>
          </div>

          <div className="space-y-3">
            {current.options?.map((option) => (
              <button
                key={option}
                onClick={() => setSelectedAnswer(option)}
                disabled={showResult}
                className={`w-full p-4 text-left rounded-xl border-2 transition-all ${
                  showResult
                    ? option === current.correct_answer
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : option === selectedAnswer && option !== current.correct_answer
                      ? 'border-red-500 bg-red-50 text-red-700'
                      : 'border-gray-200 bg-gray-50'
                    : selectedAnswer === option
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{option}</span>
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
            <div className="mt-6 p-4 bg-blue-50 rounded-xl">
              <h3 className="font-semibold text-blue-900 mb-2">Explanation:</h3>
              <p className="text-blue-800">{current.explanation}</p>
            </div>
          )}

          {!showResult && (
            <button
              onClick={handleAnswer}
              disabled={!selectedAnswer}
              className="mt-6 w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Submit Answer
            </button>
          )}
        </div>
      </div>
    </div>
  );
}