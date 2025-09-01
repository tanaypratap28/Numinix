import React, { useState } from 'react';

export function ScientificCalculator({ onBack }: { onBack: () => void }) {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState<string | null>(null);

  // Button layout for a real scientific calculator
  const buttonRows = [
    [
      { label: 'C', type: 'action' },
      { label: 'DEL', type: 'action' },
      { label: '(', type: 'operator' },
      { label: ')', type: 'operator' },
      { label: '/', type: 'operator' }
    ],
    [
      { label: '7', type: 'number' },
      { label: '8', type: 'number' },
      { label: '9', type: 'number' },
      { label: '*', type: 'operator' },
      { label: 'sqrt', type: 'func' }
    ],
    [
      { label: '4', type: 'number' },
      { label: '5', type: 'number' },
      { label: '6', type: 'number' },
      { label: '-', type: 'operator' },
      { label: '^', type: 'operator' }
    ],
    [
      { label: '1', type: 'number' },
      { label: '2', type: 'number' },
      { label: '3', type: 'number' },
      { label: '+', type: 'operator' },
      { label: 'log', type: 'func' }
    ],
    [
      { label: '0', type: 'number' },
      { label: '.', type: 'number' },
      { label: 'sin', type: 'func' },
      { label: 'cos', type: 'func' },
      { label: 'tan', type: 'func' }
    ],
    [
      { label: '=', type: 'equal', wide: true }
    ]
  ];

  function handleButtonClick(val: string) {
    if (val === 'C') {
      setExpression('');
      setResult(null);
    } else if (val === 'DEL') {
      setExpression(expression.slice(0, -1));
    } else if (val === '=') {
      handleCalculate();
    } else if (val === 'sqrt') {
      setExpression(expression + 'Math.sqrt(');
    } else if (val === 'sin') {
      setExpression(expression + 'Math.sin(');
    } else if (val === 'cos') {
      setExpression(expression + 'Math.cos(');
    } else if (val === 'tan') {
      setExpression(expression + 'Math.tan(');
    } else if (val === 'log') {
      setExpression(expression + 'Math.log(');
    } else if (val === '^') {
      setExpression(expression + '**');
    } else {
      setExpression(expression + val);
    }
  }

  function handleCalculate() {
    try {
      
      const res = eval(expression.replace(/\^/g, '**'));
      setResult(res.toString());
    } catch {
      setResult('Invalid expression');
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 mb-6 transition-colors"
        >
          <span className="text-blue-600">&larr;</span>
          <span>Back to Tools</span>
        </button>
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Scientific Calculator</h1>
        <div className="space-y-6">
          <input
            className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg mb-2"
            type="text"
            value={expression}
            onChange={e => setExpression(e.target.value)}
            placeholder="Enter expression"
            readOnly
          />
          <div className="space-y-2 mb-4">
            {buttonRows.map((row, rowIdx) => (
              <div key={rowIdx} className="grid grid-cols-5 gap-2">
                {row.map((btn, colIdx) => (
                  <button
                    key={colIdx}
                    className={`px-3 py-3 text-lg rounded-lg transition-colors font-semibold ${
                      btn.type === 'number'
                        ? 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                        : btn.type === 'operator'
                        ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                        : btn.type === 'func'
                        ? 'bg-green-100 text-green-700 hover:bg-green-200'
                        : btn.type === 'action'
                        ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        : btn.type === 'equal'
                        ? 'bg-green-600 text-white hover:bg-green-700 col-span-5'
                        : 'invisible'
                    } ${btn.wide ? 'col-span-5' : ''}`}
                    onClick={() => btn.label && handleButtonClick(btn.label)}
                    disabled={!btn.label}
                  >
                    {btn.label}
                  </button>
                ))}
              </div>
            ))}
          </div>
          {result !== null && (
            <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl p-6">
              <div className="text-center">
                <div className="text-sm text-green-600 mb-2">Result:</div>
                <div className="text-3xl font-bold text-green-800">{result}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
