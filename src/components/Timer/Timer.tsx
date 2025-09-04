import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Settings } from 'lucide-react';

export function Timer() {
  const [duration, setDuration] = useState(25 * 60); // 25 minutes in seconds
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isRunning, setIsRunning] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, timeLeft]);

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(duration);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((duration - timeLeft) / duration) * 100;
  const sandHeight = Math.max(10, progress);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent mb-2">
            Focus Timer
          </h1>
          <p className="text-gray-600 text-lg">Stay focused and watch your progress flow like sand</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Sand Timer Animation */}
          <div className="flex justify-center">
            <div className="relative">
              {/* Hourglass Container */}
              <div className="w-64 h-96 relative">
                {/* Top Glass */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-48 h-44 border-4 border-amber-800 rounded-t-full bg-gradient-to-b from-transparent to-amber-100/30 overflow-hidden">
                  {/* Top Sand */}
                  <div 
                    className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-amber-400 to-yellow-300 transition-all duration-1000 ease-linear"
                    style={{ height: `${100 - sandHeight}%` }}
                  >
                    {/* Sand particles animation */}
                    <div className="absolute inset-0 overflow-hidden">
                      {[...Array(20)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute w-1 h-1 bg-yellow-500 rounded-full animate-bounce"
                          style={{
                            left: `${20 + (i * 3)}%`,
                            animationDelay: `${i * 0.1}s`,
                            animationDuration: '2s'
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Middle Neck */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 border-4 border-amber-800 bg-amber-100">
                  {/* Falling sand stream */}
                  {isRunning && (
                    <div className="absolute left-1/2 top-0 w-1 h-full bg-yellow-400 transform -translate-x-1/2 animate-pulse"></div>
                  )}
                </div>

                {/* Bottom Glass */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-48 h-44 border-4 border-amber-800 rounded-b-full bg-gradient-to-t from-transparent to-amber-100/30 overflow-hidden">
                  {/* Bottom Sand */}
                  <div 
                    className="absolute bottom-0 left-0 right-0 bg-gradient-to-b from-amber-400 to-yellow-300 transition-all duration-1000 ease-linear"
                    style={{ height: `${sandHeight}%` }}
                  />
                </div>

                {/* Hourglass Frame */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="w-full h-full border-8 border-amber-900 rounded-full opacity-20"></div>
                </div>
              </div>

              {/* Timer Display */}
              <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 text-center">
                <div className="text-6xl font-mono font-bold text-amber-800 mb-2">
                  {formatTime(timeLeft)}
                </div>
                <div className="text-amber-600 font-medium">
                  {timeLeft === 0 ? 'Time\'s up! 🎉' : isRunning ? 'Focus time...' : 'Ready to focus?'}
                </div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="space-y-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Timer Controls</h2>
              
              <div className="space-y-6">
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={toggleTimer}
                    className={`w-16 h-16 rounded-full flex items-center justify-center text-white shadow-lg transition-all duration-200 transform hover:scale-110 ${
                      isRunning 
                        ? 'bg-gradient-to-r from-red-500 to-pink-500' 
                        : 'bg-gradient-to-r from-green-500 to-emerald-500'
                    }`}
                  >
                    {isRunning ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8 ml-1" />}
                  </button>
                  
                  <button
                    onClick={resetTimer}
                    className="w-16 h-16 rounded-full bg-gradient-to-r from-gray-500 to-gray-600 flex items-center justify-center text-white shadow-lg transition-all duration-200 transform hover:scale-110"
                  >
                    <RotateCcw className="h-8 w-8" />
                  </button>
                  
                  <button
                    onClick={() => setShowSettings(!showSettings)}
                    className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-white shadow-lg transition-all duration-200 transform hover:scale-110"
                  >
                    <Settings className="h-8 w-8" />
                  </button>
                </div>

                {showSettings && (
                  <div className="bg-gray-50 rounded-2xl p-6 space-y-4">
                    <h3 className="font-semibold text-gray-900">Timer Presets</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { label: '15 min', value: 15 * 60 },
                        { label: '25 min', value: 25 * 60 },
                        { label: '45 min', value: 45 * 60 },
                        { label: '60 min', value: 60 * 60 },
                      ].map((preset) => (
                        <button
                          key={preset.value}
                          onClick={() => {
                            setDuration(preset.value);
                            setTimeLeft(preset.value);
                            setIsRunning(false);
                          }}
                          className="px-4 py-2 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors text-sm font-medium"
                        >
                          {preset.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Progress</span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-amber-400 to-orange-500 h-3 rounded-full transition-all duration-1000"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                {/* Study Tips */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-4 border border-blue-200">
                  <h4 className="font-semibold text-blue-900 mb-2">💡 Focus Tips</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Remove distractions from your workspace</li>
                    <li>• Take deep breaths before starting</li>
                    <li>• Focus on one problem at a time</li>
                    <li>• Reward yourself after each session</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}