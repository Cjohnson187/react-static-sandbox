import React from 'react';
import { TrendingUp, Clock, Shuffle, Zap } from 'lucide-react';

// Import data and types
import { TIME_COMPLEXITY_DATA } from './bigOData';
import type { DSOperation, SortingAlgorithm } from './bigO';

// --- Utility Function for Coloring Cells ---
/**
 * Determines the Tailwind CSS color class based on the complexity string.
 * @param complexity The Big O notation string (e.g., 'O(n log n)')
 */
const getComplexityColor = (complexity: string): string => {
  if (complexity.includes('O(1)') || complexity.includes('O(n+k)')) {
    return 'bg-green-600/20 text-green-300'; // Excellent
  }
  if (complexity.includes('O(log n)') || complexity.includes('O(n log n)')) {
    return 'bg-lime-600/20 text-lime-300'; // Good
  }
  // Check for O(n) but exclude those with 'log'
  if (complexity.includes('O(n)') && !complexity.includes('log') && !complexity.includes('k')) {
    return 'bg-yellow-600/20 text-yellow-300'; // Fair
  }
  if (complexity.includes('O(n^2)') || complexity.includes('O(n!)') || complexity.includes('O(2^n)')) {
    return 'bg-red-600/20 text-red-300'; // Poor/Bad
  }
  return 'bg-gray-700 text-gray-400';
};

// --- Complexity Chart Component (SVG) ---
const ComplexityChart: React.FC = () => {
  // Chart dimensions
  const WIDTH = 600;
  const HEIGHT = 300;
  const MARGIN = 30;
  const INNER_WIDTH = WIDTH - 2 * MARGIN;
  const INNER_HEIGHT = HEIGHT - 2 * MARGIN;

  // Static data for the curves (normalized path definitions)
  const curves = [
    { label: 'O(1)', color: 'text-green-400', path: `M0 ${INNER_HEIGHT} L${INNER_WIDTH} ${INNER_HEIGHT}` },
    { label: 'O(log n)', color: 'text-lime-400', path: `M0 ${INNER_HEIGHT} c${INNER_WIDTH * 0.5},0 ${INNER_WIDTH * 0.9},-${INNER_HEIGHT * 0.1} ${INNER_WIDTH},-${INNER_HEIGHT * 0.2}` },
    { label: 'O(n)', color: 'text-yellow-400', path: `M0 ${INNER_HEIGHT} L${INNER_WIDTH} ${MARGIN}` },
    { label: 'O(n log n)', color: 'text-orange-400', path: `M0 ${INNER_HEIGHT} c${INNER_WIDTH * 0.3},0 ${INNER_WIDTH * 0.7},-${INNER_HEIGHT * 0.3} ${INNER_WIDTH},-${INNER_HEIGHT * 0.7}` },
    { label: 'O(n²)', color: 'text-red-400', path: `M0 ${INNER_HEIGHT} c${INNER_WIDTH * 0.2},-${INNER_HEIGHT * 0.1} ${INNER_WIDTH * 0.5},-${INNER_HEIGHT * 0.5} ${INNER_WIDTH},0` },
  ];

  return (
    <div className="p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700">
      <h3 className="text-xl font-semibold mb-4 text-purple-300 flex items-center">
        <TrendingUp className="mr-2 h-5 w-5" /> Complexity Growth
      </h3>
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        className="w-full h-auto"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g transform={`translate(${MARGIN}, ${MARGIN})`}>
          {/* Axes */}
          <line x1="0" y1="0" x2="0" y2={INNER_HEIGHT} stroke="#374151" strokeWidth="2" />
          <line x1="0" y1={INNER_HEIGHT} x2={INNER_WIDTH} y2={INNER_HEIGHT} stroke="#374151" strokeWidth="2" />

          {/* Labels */}
          <text x="-15" y="10" className="text-sm fill-gray-400">Time</text>
          <text x={INNER_WIDTH - 20} y={INNER_HEIGHT + 20} className="text-sm fill-gray-400">N (Input Size)</text>

          {/* Curves */}
          {curves.map((curve) => (
            <path
              key={curve.label}
              d={curve.path}
              className={`stroke-current ${curve.color} transition-all duration-500`}
              fill="none"
              strokeWidth="3"
            />
          ))}

          {/* Legend */}
          <g transform={`translate(${INNER_WIDTH - 120}, 10)`}>
            {curves.map((curve, index) => (
              <g key={curve.label} transform={`translate(0, ${index * 20})`}>
                <line x1="0" y1="6" x2="15" y2="6" className={`stroke-current ${curve.color}`} strokeWidth="3" />
                <text x="20" y="10" className={`text-sm fill-current ${curve.color}`}>{curve.label}</text>
              </g>
            ))}
          </g>
        </g>
      </svg>
    </div>
  );
};

// --- Generic Table Component Props ---
interface ComplexityTableProps<T> {
  title: string;
  icon: React.ElementType;
  headers: string[];
  data: T[];
  type: 'ds' | 'sort';
}

// --- Generic Table Component ---
const ComplexityTable = <T extends Record<string, string>>({ title, icon: Icon, headers, data }: ComplexityTableProps<T>) => {
  return (
    <div className="p-4 bg-gray-800 rounded-xl shadow-xl border border-gray-700 w-full overflow-x-auto">
      <h3 className="text-xl font-bold mb-4 text-sky-400 flex items-center">
        <Icon className="mr-2 h-5 w-5" /> {title}
      </h3>
      <table className="w-full text-sm text-left text-gray-300 rounded-lg overflow-hidden">
        <thead className="text-xs uppercase bg-gray-700/50 text-gray-400">
          <tr>
            {headers.map((header, index) => (
              <th scope="col" key={index} className="p-3 text-center min-w-[100px]">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="border-b border-gray-700 transition-colors hover:bg-gray-700/50">
              {/* Loop through the row object entries, which are guaranteed to be strings by the generic constraint */}
              {Object.entries(row).map(([key, value], colIndex) => {
                // Determine if this is a header cell (Data Structure or Algorithm Name)
                if (key === 'name' || key === 'type') {
                  return (
                    <th scope="row" key={colIndex} className="p-3 font-medium text-white whitespace-nowrap">
                      {value}
                    </th>
                  );
                }
                const colorClass = getComplexityColor(value);
                return (
                  <td key={colIndex} className={`p-3 text-center font-mono font-semibold ${colorClass}`}>
                    {value}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// --- Main App Component ---
const bigO: React.FC = () => {
  const dsHeaders = ['Data Structure', 'Access', 'Search', 'Insertion', 'Deletion', 'Worst Time', 'Worst Space'];
  const sortHeaders = ['Algorithm', 'Best Time', 'Average Time', 'Worst Time', 'Worst Space'];

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-8">
      <header className="text-center mb-10 p-6 bg-gray-800 rounded-xl shadow-2xl">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-fuchsia-400 flex justify-center items-center">
          <Zap className="h-8 w-8 mr-3" /> BIG O COMPLEXITY CHEATSHEET
        </h1>
        <p className="mt-3 text-lg text-gray-400">Time and Space Complexity for Data Structures and Algorithms</p>
      </header>

      <div className="max-w-7xl mx-auto space-y-10">
        {/* Complexity Chart Section */}
        <section>
          <ComplexityChart />
        </section>

        {/* Legend Section */}
        <section className="flex flex-wrap justify-center gap-4">
          {TIME_COMPLEXITY_DATA.legend.map(({ rating, color }, index) => (
            <div key={index} className="flex items-center p-3 rounded-lg bg-gray-800 border border-gray-700 shadow-md">
              <div className={`h-4 w-4 rounded-full mr-2 ${color === 'text-green-400' ? 'bg-green-400' : color === 'text-lime-400' ? 'bg-lime-400' : color === 'text-yellow-400' ? 'bg-yellow-400' : 'bg-red-400'}`}></div>
              <span className="text-sm font-medium text-gray-300">{rating}</span>
            </div>
          ))}
        </section>

        {/* Data Structure Table - Using DSOperation[] type */}
        <section>
          <ComplexityTable<DSOperation>
            title="Data Structure Operations"
            icon={Clock}
            headers={dsHeaders}
            data={TIME_COMPLEXITY_DATA.dsOperations}
            type="ds"
          />
        </section>

        {/* Sorting Algorithms Table - Using SortingAlgorithm[] type */}
        <section>
          <ComplexityTable<SortingAlgorithm>
            title="Array Sorting Algorithms"
            icon={Shuffle}
            headers={sortHeaders}
            data={TIME_COMPLEXITY_DATA.sortingAlgorithms}
            type="sort"
          />
        </section>

        {/* Footer Note */}
        <footer className="pt-8 pb-4 text-center text-xs text-gray-500">
            <p>Data provided is based on typical average and worst-case scenarios for common implementations.</p>
        </footer>
      </div>
    </div>
  );
};

export default bigO;