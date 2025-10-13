import React, { useState } from 'react';


export const CounterProject: React.FC = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="flex flex-col items-center justify-center h-full p-8 bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-xl border border-teal-500/30 w-full max-w-sm">
        <h2 className="text-3xl font-bold text-teal-400 mb-6">Simple Counter</h2>
        <div className="text-7xl font-mono mb-8 p-4 bg-gray-700 text-white rounded-xl shadow-inner">
          {count}
        </div>
        <div className="flex space-x-4">
          <button
            onClick={() => setCount(c => c - 1)}
            className="flex-1 px-6 py-3 bg-red-600 hover:bg-red-500 text-white font-semibold rounded-xl transition duration-150 shadow-lg active:scale-95"
          >
            Decrement
          </button>
          <button
            onClick={() => setCount(c => c + 1)}
            className="flex-1 px-6 py-3 bg-teal-600 hover:bg-teal-500 text-white font-semibold rounded-xl transition duration-150 shadow-lg active:scale-95"
          >
            Increment
          </button>
        </div>
      </div>
    </div>
  );
};