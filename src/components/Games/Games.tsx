import React from 'react';
import { Grid3X3, Puzzle, Brain, Target } from 'lucide-react';
import { GameCard } from './GameCard';

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

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Math Games</h1>
        <p className="text-gray-600">Build your logic and problem-solving skills through fun games</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {games.map((game) => (
          <GameCard key={game.component} {...game} />
        ))}
      </div>
    </div>
  );
}