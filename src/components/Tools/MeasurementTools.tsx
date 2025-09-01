import React, { useState } from 'react';

const measurementTypes = [
  { id: 'area', label: 'Area (Rectangle)', color: 'purple' },
  { id: 'volume', label: 'Volume (Box)', color: 'purple' },
  { id: 'perimeter', label: 'Perimeter (Rectangle)', color: 'purple' },
];

export function MeasurementTools({ onBack }: { onBack: () => void }) {
  const [type, setType] = useState('area');
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [result, setResult] = useState<string | null>(null);

  function handleCalculate() {
    const l = parseFloat(length);
    const w = parseFloat(width);
    const h = parseFloat(height);
    let res = '';
    if (type === 'area') {
      res = isNaN(l) || isNaN(w) ? 'Invalid input' : (l * w).toString();
    } else if (type === 'volume') {
      res = isNaN(l) || isNaN(w) || isNaN(h) ? 'Invalid input' : (l * w * h).toString();
    } else if (type === 'perimeter') {
      res = isNaN(l) || isNaN(w) ? 'Invalid input' : (2 * (l + w)).toString();
    }
    setResult(res);
  }

  return (
    <div className="max-w-md mx-auto px-4 py-8 bg-white rounded-lg shadow">
      <button className="mb-4 text-purple-600" onClick={onBack}>&larr; Back</button>
      <h2 className="text-2xl font-bold mb-2 text-purple-700">Measurement Tools</h2>
      <p className="mb-4 text-gray-600">Select a measurement type and enter values.</p>
      <select
        className="w-full border rounded px-3 py-2 mb-2"
        value={type}
        onChange={e => setType(e.target.value)}
      >
        {measurementTypes.map(mt => (
          <option key={mt.id} value={mt.id}>{mt.label}</option>
        ))}
      </select>
      <input
        className="w-full border rounded px-3 py-2 mb-2"
        type="number"
        value={length}
        onChange={e => setLength(e.target.value)}
        placeholder="Length"
      />
      <input
        className="w-full border rounded px-3 py-2 mb-2"
        type="number"
        value={width}
        onChange={e => setWidth(e.target.value)}
        placeholder="Width"
      />
      {type === 'volume' && (
        <input
          className="w-full border rounded px-3 py-2 mb-2"
          type="number"
          value={height}
          onChange={e => setHeight(e.target.value)}
          placeholder="Height"
        />
      )}
      <button
        className="w-full bg-purple-600 text-white py-2 rounded mb-2"
        onClick={handleCalculate}
      >
        Calculate
      </button>
      {result !== null && (
        <div className="mt-2 text-lg text-gray-800">Result: <span className="font-bold">{result}</span></div>
      )}
    </div>
  );
}
