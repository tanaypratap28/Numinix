import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface GameCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  component: string;
}

const colorClasses = {
  blue: 'from-blue-500 to-blue-600',
  purple: 'from-purple-500 to-purple-600',
  green: 'from-green-500 to-green-600',
  orange: 'from-orange-500 to-orange-600',
};

export function GameCard({ title, description, icon: Icon, color, component }: GameCardProps) {
  const handleClick = () => {
    // For now, show coming soon message
    alert(`${title} is coming soon! We're working hard to bring you the best gaming experience.`);
  };

  return (
    <div
      onClick={handleClick}
      className="group cursor-pointer transform transition-all duration-200 hover:scale-105"
    >
      <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${colorClasses[color as keyof typeof colorClasses]} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
          <Icon className="h-8 w-8 text-white" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="text-sm text-blue-600 font-medium">Play Now →</div>
      </div>
    </div>
  );
}