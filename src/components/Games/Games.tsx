import React from 'react';
import { Grid3X3, Puzzle, Brain, Target } from 'lucide-react';
import { GameCard } from './GameCard';

import Sudoku from './Sudoku';
import NumberPuzzle from './NumberPuzzle';
import BrainTeaser from './BrainTeaser';
import TargetNumber from './TargetNumber';

export function Games() {
  const games = [
    {
      title: 'Sudoku',
      description: 'Classic number puzzle game',
      icon: Grid3X3,
      color: 'blue',
      component: 'sudoku',
    },
    {
      title: 'Number Puzzle',
      description: 'Arrange numbers in sequence',
      icon: Puzzle,
      color: 'purple',
      component: 'number-puzzle',
    },
    {
      title: 'Math Brain Teaser',
      description: 'Logic and reasoning challenges',
      icon: Brain,
      color: 'green',
      component: 'brain-teaser',
    },
    {
      title: 'Target Number',
      description: 'Reach the target using given numbers',
      icon: Target,
      color: 'orange',
      component: 'target-number',
    },
  ];

  const [showSudoku, setShowSudoku] = React.useState(false);
  const [showNumberPuzzle, setShowNumberPuzzle] = React.useState(false);
  const [showBrainTeaser, setShowBrainTeaser] = React.useState(false);
  const [showTargetNumber, setShowTargetNumber] = React.useState(false);
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Math Games</h1>
        <p className="text-gray-600">Build your logic and problem-solving skills through fun games</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {games.map((game) => (
          <GameCard
            key={game.component}
            {...game}
            onPlay={() => {
              if (game.component === 'sudoku') setShowSudoku(true);
              if (game.component === 'number-puzzle') setShowNumberPuzzle(true);
              if (game.component === 'brain-teaser') setShowBrainTeaser(true);
              if (game.component === 'target-number') setShowTargetNumber(true);
            }}
          />
        ))}
      </div>

      {showSudoku && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-2xl w-full relative">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl font-bold"
              onClick={() => setShowSudoku(false)}
              aria-label="Close"
            >
              ×
            </button>
            <div className="mb-4 text-center text-2xl font-bold text-blue-700">Sudoku</div>
            {/* Sudoku game component */}
            <Sudoku />
          </div>
        </div>
      )}
      {showNumberPuzzle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-2xl w-full relative">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl font-bold"
              onClick={() => setShowNumberPuzzle(false)}
              aria-label="Close"
            >
              ×
            </button>
            <div className="mb-4 text-center text-2xl font-bold text-purple-700">Number Puzzle</div>
            {/* Number Puzzle game component */}
            <NumberPuzzle />
          </div>
        </div>
      )}
      {showBrainTeaser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-2xl w-full relative">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl font-bold"
              onClick={() => setShowBrainTeaser(false)}
              aria-label="Close"
            >
              ×
            </button>
            <div className="mb-4 text-center text-2xl font-bold text-green-700">Brain Teaser</div>
            {/* Brain Teaser game component */}
            <BrainTeaser />
          </div>
        </div>
      )}
      {showTargetNumber && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-2xl w-full relative">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl font-bold"
              onClick={() => setShowTargetNumber(false)}
              aria-label="Close"
            >
              ×
            </button>
            <div className="mb-4 text-center text-2xl font-bold text-orange-700">Target Number</div>
            {/* Target Number game component */}
            <TargetNumber />
          </div>
        </div>
      )}
    </div>
  );
}