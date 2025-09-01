import React, { useState } from 'react';
import { Calculator, Ruler, Scale, Clock } from 'lucide-react';
import { UnitConverter } from './UnitConverter';
import { ScientificCalculator } from './ScientificCalculator';
import { MeasurementTools } from './MeasurementTools';
import { TimeCalculator } from './TimeCalculator';
import { ToolCard } from './ToolCard';

export function Tools() {
  const [selectedTool, setSelectedTool] = useState<string | null>(null);

  const tools = [
    {
      title: 'Unit Converter',
      description: 'Convert between different units of measurement',
      icon: Ruler,
      color: 'blue',
      id: 'converter',
    },
    {
      title: 'Scientific Calculator',
      description: 'Advanced calculations with scientific functions',
      icon: Calculator,
      color: 'green',
      id: 'calculator',
    },
    {
      title: 'Measurement Tools',
      description: 'Area, volume, and perimeter calculators',
      icon: Scale,
      color: 'purple',
      id: 'measurement',
    },
    {
      title: 'Time Calculator',
      description: 'Calculate time differences and conversions',
      icon: Clock,
      color: 'orange',
      id: 'time',
    },
  ];

  if (selectedTool === 'converter') {
    return <UnitConverter onBack={() => setSelectedTool(null)} />;
  }
  if (selectedTool === 'calculator') {
    return <ScientificCalculator onBack={() => setSelectedTool(null)} />;
  }
  if (selectedTool === 'measurement') {
    return <MeasurementTools onBack={() => setSelectedTool(null)} />;
  }
  if (selectedTool === 'time') {
    return <TimeCalculator onBack={() => setSelectedTool(null)} />;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Math Tools</h1>
        <p className="text-gray-600">Practical tools for real-world math applications</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tools.map((tool) => (
          <ToolCard
            key={tool.id}
            {...tool}
            onClick={() => setSelectedTool(tool.id)}
          />
        ))}
      </div>
    </div>
  );
}